#!/usr/bin/env node

/**
 * This script is ran with `npx react-dsfr include-used-icons`
 * It scans your codebase to find which icons are used and only include those in the final build.
 * Do do that it patches the node_modules/@codegouvfr/react-dsfr/dist/utility/icons/icons.css file
 * and the public/dsfr/utility/icons/icons.css file (if applicable, not in Next.js for example).
 * The script can figure out where your node_modules and public directories are.
 *
 * There are two optional arguments that you can use:
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 * - `--silent` to disable console.log
 */

import { getProjectRoot } from "./tools/getProjectRoot";
import * as fs from "fs";
import { join as pathJoin, relative as pathRelative } from "path";
import { assert } from "tsafe/assert";
import { exclude } from "tsafe/exclude";
import { writeFile, readFile, rm, cp } from "fs/promises";
import { crawl } from "./tools/crawl";
import { basename as pathBasename, sep as pathSep, dirname as pathDirname } from "path";
import type { Equals } from "tsafe";
import yargsParser from "yargs-parser";
import { getAbsoluteAndInOsFormatPath } from "./tools/getAbsoluteAndInOsFormatPath";
import { readPublicDirPath } from "./readPublicDirPath";
import { existsAsync } from "./tools/fs.existsAsync";
import { fnv1aHashToHex } from "./tools/fnv1aHashToHex";
import { modifyHtmlHrefs } from "./tools/modifyHtmlHrefs";

export const PATH_OF_ICONS_JSON = pathJoin("utility", "icons", "icons.json");

export const PATH_OF_PATCHED_RAW_CSS_CODE_FOR_COMPAT_WITH_REMIXICON_RELATIVE_TO_DSFR = pathJoin(
    "utility",
    "icons",
    "dsfr_remixicon.css"
);

export type Icon = Icon.Dsfr | Icon.Remixicon;

export namespace Icon {
    export type Common = {
        iconId: string;
    };

    export type Dsfr = Common & {
        prefix: "fr-icon-";
        svgRelativePath: string;
    };

    export type Remixicon = Common & {
        prefix: "ri-";
        rawSvgCode: string;
    };
}

type IconLike = Icon.Dsfr | Omit<Icon.Remixicon, "rawSvgCode">;

export function generateIconsRawCssCode(params: {
    usedIcons: IconLike[];
    patchedRawCssCodeForCompatWithRemixIcon: string;
}): string {
    const { usedIcons, patchedRawCssCodeForCompatWithRemixIcon } = params;

    const buildRule = (icon: IconLike, isHighContrast: boolean) => {
        const { iconId, prefix } = icon;

        const className = `${prefix}${iconId}`;

        const relativePath = (() => {
            switch (icon.prefix) {
                case "fr-icon-":
                    return icon.svgRelativePath;
                case "ri-":
                    return `../../icons/remixicon/${iconId}.svg`;
            }
        })();

        return [
            `.${className}::before,`,
            `.${className}::after {`,
            ...(isHighContrast
                ? [`    background-image: url("${relativePath}");`]
                : [
                      `    -webkit-mask-image: url("${relativePath}");`,
                      `    mask-image: url("${relativePath}");`
                  ]),
            `}`,
            ``
        ]
            .map(!isHighContrast ? line => line : line => `    ${line}`)
            .join("\n");
    };

    return [
        ...usedIcons.map(icon => buildRule(icon, false)),
        ...(usedIcons.length === 0
            ? []
            : [
                  `@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {`,
                  ...usedIcons.map(icon => buildRule(icon, true)),
                  `}`,
                  ``
              ]),
        ...(usedIcons.find(({ prefix }) => prefix === "ri-") === undefined
            ? []
            : [patchedRawCssCodeForCompatWithRemixIcon])
    ].join("\n");
}

type CommandContext = {
    projectDirPath: string;
    srcFilePaths: string[];
    dsfrDirPath: string;
    spaParams:
        | {
              dsfrDirPath_static: string;
              htmlFilePath: string;
          }
        | undefined;
    isSilent: boolean;
};

const CODEGOUV_REACT_DSFR: string = JSON.parse(
    fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
)["name"];

async function getCommandContext(args: string[]): Promise<CommandContext> {
    const argv = yargsParser(args);

    const projectDirPath: string = (() => {
        read_from_argv: {
            const arg = argv["projectDir"];

            if (arg === undefined) {
                break read_from_argv;
            }

            return getAbsoluteAndInOsFormatPath({ "pathIsh": arg, "cwd": process.cwd() });
        }

        return process.cwd();
    })();

    special_case_for_our_storybook: {
        const projectDirPath = process.cwd();

        const isProjectPathReactDsfr = await (async () => {
            const packageJsonFilePath = pathJoin(projectDirPath, "package.json");

            if (!(await existsAsync(packageJsonFilePath))) {
                return false;
            }

            const packageJson = JSON.parse((await readFile(packageJsonFilePath)).toString("utf8"));

            return packageJson["name"] === CODEGOUV_REACT_DSFR;
        })();

        if (!isProjectPathReactDsfr) {
            break special_case_for_our_storybook;
        }

        const srcFilePaths = (
            await Promise.all([
                crawl({
                    "dirPath": pathJoin(projectDirPath, "src"),
                    "returnedPathsType": "absolute",
                    "getDoCrawlInDir": async ({ relativeDirPath }) => {
                        if (pathBasename(relativeDirPath) === "generatedFromCss") {
                            return false;
                        }

                        if (pathBasename(relativeDirPath) === "bin") {
                            return false;
                        }

                        return true;
                    }
                }),
                crawl({
                    "dirPath": pathJoin(projectDirPath, "stories"),
                    "returnedPathsType": "absolute"
                })
            ])
        )
            .flat()
            .filter(
                filePath =>
                    ["tsx", "jsx", "js", "ts", "mdx", "html", "htm"].find(ext =>
                        filePath.endsWith(`.${ext}`)
                    ) !== undefined
            );

        return {
            projectDirPath,
            srcFilePaths,
            "dsfrDirPath": pathJoin(projectDirPath, "dist", "dsfr"),
            "spaParams": undefined,
            "isSilent": false
        };
    }

    const nodeModulesDirPath = await (async function callee(n: number): Promise<string> {
        if (n >= projectDirPath.split(pathSep).length) {
            throw new Error("Need to install node modules?");
        }

        const nodeModulesDirPath = pathJoin(
            ...[projectDirPath, ...new Array(n).fill(".."), "node_modules"]
        );

        const doesExist = await existsAsync(
            pathJoin(...[nodeModulesDirPath, ...CODEGOUV_REACT_DSFR.split("/")])
        );

        if (!doesExist) {
            return callee(n + 1);
        }

        return nodeModulesDirPath;
    })(0);

    const dsfrDirPath = pathJoin(
        ...[nodeModulesDirPath, ...CODEGOUV_REACT_DSFR.split("/"), "dsfr"]
    );

    const dsfrDirPath_static = await (async () => {
        const dsfrDirPath_static = pathJoin(await readPublicDirPath({ projectDirPath }), "dsfr");

        if (!(await existsAsync(dsfrDirPath_static))) {
            return undefined;
        }

        return dsfrDirPath_static;
    })();

    const htmlFilePath = await (async () => {
        if (dsfrDirPath_static === undefined) {
            return undefined;
        }

        vite: {
            const filePath = pathJoin(projectDirPath, "index.html");

            if (!fs.existsSync(filePath)) {
                break vite;
            }

            return filePath;
        }

        cra: {
            if (dsfrDirPath_static === undefined) {
                break cra;
            }

            const filePath = pathJoin(pathDirname(dsfrDirPath_static), "index.html");

            if (!fs.existsSync(filePath)) {
                break cra;
            }

            return filePath;
        }

        // Next.js
        return undefined;
    })();

    const isSilent = argv["silent"] === true;

    const srcFilePaths = (
        await Promise.all([
            crawl({
                "dirPath": projectDirPath,
                "returnedPathsType": "absolute",
                "getDoCrawlInDir": async ({ relativeDirPath }) => {
                    if (relativeDirPath === "dist") {
                        return false;
                    }

                    if (relativeDirPath === "build") {
                        return false;
                    }

                    if (pathBasename(relativeDirPath) === "node_modules") {
                        return false;
                    }

                    if (
                        await existsAsync(
                            pathJoin(projectDirPath, relativeDirPath, PATH_OF_ICONS_JSON)
                        )
                    ) {
                        // We don't want to search in public/dsfr
                        return false;
                    }

                    if (pathBasename(relativeDirPath).startsWith(".")) {
                        return false;
                    }

                    return true;
                }
            }),
            crawl({
                "dirPath": nodeModulesDirPath,
                "returnedPathsType": "absolute",
                "getDoCrawlInDir": async ({ relativeDirPath }) => {
                    if (
                        relativeDirPath.startsWith("@") &&
                        relativeDirPath.split(pathSep).length === 1
                    ) {
                        return true;
                    }

                    if (
                        relativeDirPath.split(pathSep).length === 1 ||
                        (relativeDirPath.startsWith("@") &&
                            relativeDirPath.split(pathSep).length === 2)
                    ) {
                        const parsedPackageJson = await readFile(
                            pathJoin(nodeModulesDirPath, relativeDirPath, "package.json")
                        ).then(
                            buff => JSON.parse(buff.toString("utf8")),
                            () => undefined
                        );

                        if (parsedPackageJson === undefined) {
                            return false;
                        }

                        if (parsedPackageJson["name"] === "tss-react") {
                            return false;
                        }

                        if (parsedPackageJson["name"] === "@gouvfr/dsfr-chart") {
                            return false;
                        }

                        for (const packageName of [
                            CODEGOUV_REACT_DSFR,
                            "@gouvfr/dsfr",
                            "@dataesr/react-dsfr"
                        ]) {
                            if (
                                Object.keys({
                                    ...parsedPackageJson["dependencies"],
                                    ...parsedPackageJson["devDependencies"],
                                    ...parsedPackageJson["peerDependencies"]
                                }).includes(packageName)
                            ) {
                                return true;
                            }
                        }

                        return false;
                    }

                    if (
                        pathDirname(relativeDirPath).endsWith(
                            pathJoin(...CODEGOUV_REACT_DSFR.split("/"))
                        )
                    ) {
                        return pathBasename(relativeDirPath) === "src";
                    }

                    if (pathBasename(relativeDirPath) === "generatedFromCss") {
                        return false;
                    }

                    if (pathBasename(relativeDirPath) === "node_modules") {
                        return false;
                    }

                    if (pathBasename(relativeDirPath).startsWith(".")) {
                        return false;
                    }

                    return true;
                }
            })
        ])
    )
        .flat()
        .filter(
            filePath =>
                ["tsx", "jsx", "js", "ts", "mdx", "html", "htm", "svelte", "vue"].find(ext =>
                    filePath.endsWith(`.${ext}`)
                ) !== undefined
        );

    return {
        projectDirPath,
        srcFilePaths,
        dsfrDirPath,
        "spaParams": (() => {
            if (dsfrDirPath_static === undefined) {
                return undefined;
            }

            assert(htmlFilePath !== undefined);

            return {
                dsfrDirPath_static,
                htmlFilePath
            };
        })(),
        isSilent
    };
}

export async function main(args: string[]) {
    const commandContext = await getCommandContext(args);

    const log = commandContext.isSilent ? undefined : console.log;

    const icons: Icon[] = JSON.parse(
        (await readFile(pathJoin(commandContext.dsfrDirPath, PATH_OF_ICONS_JSON))).toString("utf8")
    );

    const { usedIconClassNames } = await (async function getUsedIconClassNames() {
        const prefixes = { "prefixDsfr": "fr-icon-", "prefixRemixIcon": "ri-" } as const;

        assert<Equals<typeof prefixes[keyof typeof prefixes], Icon["prefix"]>>();

        const { prefixDsfr, prefixRemixIcon, ...rest } = prefixes;

        assert<Equals<keyof typeof rest, never>>();

        const { availableDsfrIconClassNames, availableRemixiconIconClassNames } = (() => {
            const allAvailableIconClassNames = icons.map(
                ({ prefix, iconId }) => `${prefix}${iconId}`
            );

            const availableDsfrIconClassNames: string[] = [];
            const availableRemixiconIconClassNames: string[] = [];

            allAvailableIconClassNames.forEach(className => {
                if (className.startsWith(prefixDsfr)) {
                    availableDsfrIconClassNames.push(className);
                    return;
                }
                if (className.startsWith(prefixRemixIcon)) {
                    availableRemixiconIconClassNames.push(className);
                    return;
                }
            });

            return { availableDsfrIconClassNames, availableRemixiconIconClassNames };
        })();

        const setUsedIconClassNames = new Set<string>();

        await Promise.all(
            commandContext.srcFilePaths.map(async srcFilePath => {
                const rawFileContent = (await readFile(srcFilePath)).toString("utf8");

                [
                    ...(!rawFileContent.includes(prefixDsfr) ? [] : availableDsfrIconClassNames),
                    ...(!rawFileContent.includes(prefixRemixIcon)
                        ? []
                        : availableRemixiconIconClassNames)
                ].forEach(className => {
                    if (!rawFileContent.includes(className)) {
                        return;
                    }

                    log?.(`Found ${className} in ${pathRelative(process.cwd(), srcFilePath)}`);

                    setUsedIconClassNames.add(className);
                });
            })
        );

        return { "usedIconClassNames": Array.from(setUsedIconClassNames) };
    })();

    if (usedIconClassNames.length > 300) {
        console.warn(
            `There is probably an error in the only-include-used-icons script, including ${usedIconClassNames.length} icons!`
        );
    }

    log?.(`Found usage of ${usedIconClassNames.length} different icons.`);

    const usedIcons = usedIconClassNames.map(className => {
        const icon = icons.find(({ prefix, iconId }) => `${prefix}${iconId}` === className);

        assert(icon !== undefined);

        return icon;
    });

    const rawIconCssCodeBuffer = Buffer.from(
        generateIconsRawCssCode({
            "patchedRawCssCodeForCompatWithRemixIcon": fs
                .readFileSync(
                    pathJoin(
                        commandContext.dsfrDirPath,
                        PATH_OF_PATCHED_RAW_CSS_CODE_FOR_COMPAT_WITH_REMIXICON_RELATIVE_TO_DSFR
                    )
                )
                .toString("utf8"),
            usedIcons
        }),
        "utf8"
    );

    let hasChanged = false;

    const iconsMinCssRelativePath = pathJoin("utility", "icons", "icons.min.css");

    await Promise.all(
        [commandContext.dsfrDirPath, commandContext.spaParams?.dsfrDirPath_static]
            .filter(exclude(undefined))
            .map(async dsfrDirPath => {
                const cssFilePath = pathJoin(dsfrDirPath, iconsMinCssRelativePath);

                if (Buffer.compare(await readFile(cssFilePath), rawIconCssCodeBuffer) === 0) {
                    return;
                }

                hasChanged = true;

                await writeFile(cssFilePath, rawIconCssCodeBuffer);
            })
    );

    if (!hasChanged) {
        log?.("No change since last run");
        return;
    }

    await Promise.all([
        (async function generateUsedRemixiconFiles() {
            await Promise.all(
                [commandContext.dsfrDirPath, commandContext.spaParams?.dsfrDirPath_static]
                    .filter(exclude(undefined))
                    .map(async dsfrDistDirPath => {
                        const remixiconDirPath = pathJoin(dsfrDistDirPath, "icons", "remixicon");

                        if (!fs.existsSync(remixiconDirPath)) {
                            fs.mkdirSync(remixiconDirPath);
                        }

                        await Promise.all(
                            usedIcons
                                .map(icon => (icon.prefix !== "ri-" ? undefined : icon))
                                .filter(exclude(undefined))
                                .map(({ iconId, rawSvgCode }) =>
                                    writeFile(
                                        pathJoin(remixiconDirPath, `${iconId}.svg`),
                                        Buffer.from(rawSvgCode, "utf8")
                                    )
                                )
                        );
                    })
            );
        })(),
        (async function copyUsedDsfrIconsToStatic() {
            if (commandContext.spaParams === undefined) {
                return;
            }

            const { dsfrDirPath_static } = commandContext.spaParams;

            await Promise.all(
                usedIcons
                    .map(icon => (icon.prefix !== "fr-icon-" ? undefined : icon))
                    .filter(exclude(undefined))
                    .map(({ svgRelativePath }) =>
                        ([commandContext.dsfrDirPath, dsfrDirPath_static] as const).map(
                            baseDirPath =>
                                pathJoin(
                                    baseDirPath,
                                    pathDirname(iconsMinCssRelativePath),
                                    svgRelativePath
                                )
                        )
                    )
                    .map(([srcFilePath, destFilePath]) => cp(srcFilePath, destFilePath))
            );
        })(),
        (async function addHashQueryParameterInIndexHtml() {
            if (commandContext.spaParams === undefined) {
                return;
            }

            const html = (await readFile(commandContext.spaParams.htmlFilePath)).toString("utf8");

            const { modifiedHtml } = modifyHtmlHrefs({
                "html": html,
                "getModifiedHref": href => {
                    if (!href.includes(iconsMinCssRelativePath.replace(/\\/g, "/"))) {
                        return href;
                    }

                    const [urlWithoutQuery] = href.split("?");

                    return `${urlWithoutQuery}?hash=${fnv1aHashToHex(
                        rawIconCssCodeBuffer.toString("utf8")
                    )}`;
                }
            });

            await writeFile(
                commandContext.spaParams.htmlFilePath,
                Buffer.from(modifiedHtml, "utf8")
            );
        })(),
        (async function clearCache() {
            await Promise.all(
                [
                    pathJoin(".next", "cache"),
                    pathJoin(".vite"),
                    pathJoin(".cache", "storybook"),
                    pathJoin(".cache", "babel-loader"),
                    pathJoin(".cache", "default-development")
                ]
                    .map(relativeDirPath =>
                        pathJoin(commandContext.projectDirPath, "node_modules", relativeDirPath)
                    )
                    .map(async dirPath => {
                        if (!(await existsAsync(dirPath))) {
                            return;
                        }

                        await rm(dirPath, { "recursive": true, "force": true });
                    })
            );
        })()
    ]);
}

if (require.main === module) {
    main(process.argv.slice(2));
}
