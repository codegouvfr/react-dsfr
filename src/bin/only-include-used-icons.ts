#!/usr/bin/env node

/**
 * This script is ran with `npx only-include-used-icons`
 * It scans your codebase to find which icons are used and only include those in the final build.
 * Do do that it patches the node_modules/@codegouvfr/react-dsfr/dist/utility/icons/icons.css file
 * and the public/dsfr/utility/icons/icons.css file (if applicable, not in Next.js for example).
 * The script can figure out where your node_modules and public directories are.
 *
 * There are two optional arguments that you can use:
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 * - `--publicDir <path>` to specify the public directory.
 *   In Vite projects we will read the vite.config.ts (or .js) file to find the public directory.
 *   In other projects we will assume it's <project root>/public.
 *   This path is expressed relative to the project directory.
 *   It is assumed that there is a dsfr directory in the public directory (copied over using the
 *   `npx copy-dsfr-to-public` script).
 * - `--silent` to disable console.log
 */

import { getProjectRoot } from "./tools/getProjectRoot";
import * as fs from "fs";
import { join as pathJoin, relative as pathRelative } from "path";
import { assert } from "tsafe/assert";
import { exclude } from "tsafe/exclude";
import { writeFile, readFile, rm } from "fs/promises";
import { crawl } from "./tools/crawl";
import { basename as pathBasename, sep as pathSep, dirname as pathDirname } from "path";
import type { Equals } from "tsafe";
import yargsParser from "yargs-parser";
import { getAbsoluteAndInOsFormatPath } from "./tools/getAbsoluteAndInOsFormatPath";
import { readPublicDirPath } from "./readPublicDirPath";
import { existsAsync } from "./tools/fs.existsAsync";

export const pathOfIconsJson = pathJoin("utility", "icons", "icons.json");

export const pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist = pathJoin(
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

async function main() {
    const argv = yargsParser(process.argv.slice(2));

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

    const publicDirPath = await (async () => {
        read_from_argv: {
            const arg = argv["publicDir"];

            if (arg === undefined) {
                break read_from_argv;
            }

            const publicDirPath = getAbsoluteAndInOsFormatPath({
                "pathIsh": arg,
                "cwd": projectDirPath
            });

            if (!fs.existsSync(publicDirPath)) {
                fs.mkdirSync(publicDirPath, { "recursive": true });
            }

            return publicDirPath;
        }

        const publicDirPath = await readPublicDirPath({ projectDirPath });

        return publicDirPath;
    })();

    const log = argv["silent"] === true ? undefined : console.log;

    const dsfrDistInPublicDirPath = (() => {
        const dsfrDistInPublicDirPath = pathJoin(publicDirPath, "dsfr");

        if (!fs.existsSync(dsfrDistInPublicDirPath)) {
            return undefined;
        }

        return dsfrDistInPublicDirPath;
    })();

    if (dsfrDistInPublicDirPath !== undefined) {
        log?.(`Public directory is ${pathRelative(projectDirPath, publicDirPath)}`);
    }

    const codegouvfrReactDsfr: string = JSON.parse(
        fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
    )["name"];

    const isProjectPathReactDsfr = await (async () => {
        const packageJsonFilePath = pathJoin(projectDirPath, "package.json");

        if (!(await existsAsync(packageJsonFilePath))) {
            return false;
        }

        const packageJson = JSON.parse((await readFile(packageJsonFilePath)).toString("utf8"));

        return packageJson["name"] === codegouvfrReactDsfr;
    })();

    const nodeModulesDirPath = isProjectPathReactDsfr
        ? undefined
        : await (async function callee(n: number): Promise<string> {
              if (n >= projectDirPath.split(pathSep).length) {
                  throw new Error("Need to install node modules?");
              }

              const nodeModulesDirPath = pathJoin(
                  ...[projectDirPath, ...new Array(n).fill(".."), "node_modules"]
              );

              const doesExist = await existsAsync(
                  pathJoin(...[nodeModulesDirPath, ...codegouvfrReactDsfr.split("/")])
              );

              if (!doesExist) {
                  return callee(n + 1);
              }

              return nodeModulesDirPath;
          })(0);

    if (nodeModulesDirPath !== undefined) {
        log?.(
            `${codegouvfrReactDsfr} is installed in ${pathRelative(
                projectDirPath,
                nodeModulesDirPath
            )}`
        );
    }

    const dsfrDistInNodeModulesDirPath =
        nodeModulesDirPath === undefined
            ? undefined
            : pathJoin(...[nodeModulesDirPath, ...codegouvfrReactDsfr.split("/"), "dsfr"]);

    const nonUndefinedDsfrDirPath = dsfrDistInNodeModulesDirPath ?? dsfrDistInPublicDirPath;

    assert(nonUndefinedDsfrDirPath !== undefined, "Nothing to patch");

    const icons: Icon[] = JSON.parse(
        (await readFile(pathJoin(nonUndefinedDsfrDirPath, pathOfIconsJson))).toString("utf8")
    );

    const { usedIconClassNames } = await (async function getUsedIconClassNames() {
        const candidateFilePaths = (
            await Promise.all(
                isProjectPathReactDsfr
                    ? [
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
                      ]
                    : [
                          crawl({
                              "dirPath": projectDirPath,
                              "returnedPathsType": "absolute",
                              "getDoCrawlInDir": async ({ relativeDirPath }) => {
                                  if (pathBasename(relativeDirPath) === "node_modules") {
                                      return false;
                                  }

                                  if (
                                      await existsAsync(
                                          pathJoin(projectDirPath, relativeDirPath, pathOfIconsJson)
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
                          nodeModulesDirPath === undefined
                              ? []
                              : crawl({
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
                                                pathJoin(
                                                    nodeModulesDirPath,
                                                    relativeDirPath,
                                                    "package.json"
                                                )
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

                                            for (const packageName of [
                                                codegouvfrReactDsfr,
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
                                                pathJoin(...codegouvfrReactDsfr.split("/"))
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
                      ]
            )
        )
            .flat()
            .filter(
                filePath =>
                    ["tsx", "jsx", "js", "ts", "mdx", "html", "htm"].find(ext =>
                        filePath.endsWith(`.${ext}`)
                    ) !== undefined
            );

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
            candidateFilePaths.map(async candidateFilePath => {
                const rawFileContent = (await readFile(candidateFilePath)).toString("utf8");

                [
                    ...(!rawFileContent.includes(prefixDsfr) ? [] : availableDsfrIconClassNames),
                    ...(!rawFileContent.includes(prefixRemixIcon)
                        ? []
                        : availableRemixiconIconClassNames)
                ].forEach(className => {
                    if (!rawFileContent.includes(className)) {
                        return;
                    }

                    log?.(
                        `Found ${className} in ${pathRelative(projectDirPath, candidateFilePath)}`
                    );

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

    log?.(`Found ${usedIconClassNames.length} used icons.`);

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
                        nonUndefinedDsfrDirPath,
                        pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist
                    )
                )
                .toString("utf8"),
            usedIcons
        }),
        "utf8"
    );

    const onConfirmedChange = async () => {
        const nextCacheDir = pathJoin(projectDirPath, ".next", "cache");

        if (!fs.existsSync(nextCacheDir)) {
            return;
        }

        await rm(nextCacheDir, { "recursive": true, "force": true });
    };

    console.log({ dsfrDistInPublicDirPath });

    [dsfrDistInNodeModulesDirPath, dsfrDistInPublicDirPath]
        .filter(exclude(undefined))
        .forEach(async dsfrDistDirPath => {
            const cssFilePath = pathJoin(dsfrDistDirPath, "utility", "icons", "icons.min.css");

            if (!fs.existsSync(cssFilePath)) {
                return;
            }

            const remixiconDirPath = pathJoin(dsfrDistDirPath, "icons", "remixicon");

            if (!fs.existsSync(remixiconDirPath)) {
                fs.mkdirSync(remixiconDirPath);
            }

            usedIcons
                .map(icon => (icon.prefix !== "ri-" ? undefined : icon))
                .filter(exclude(undefined))
                .map(({ iconId, rawSvgCode }) =>
                    writeFile(
                        pathJoin(remixiconDirPath, `${iconId}.svg`),
                        Buffer.from(rawSvgCode, "utf8")
                    )
                );

            log?.(`Patching ${pathRelative(projectDirPath, cssFilePath)}`);

            const currentCode = await readFile(cssFilePath);

            if (Buffer.compare(rawIconCssCodeBuffer, currentCode) === 0) {
                return;
            }

            onConfirmedChange();

            writeFile(cssFilePath, rawIconCssCodeBuffer);
        });
}

if (require.main === module) {
    main();
}
