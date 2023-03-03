#!/usr/bin/env node

import { getProjectRoot } from "./tools/getProjectRoot";
import * as fs from "fs";
import { join as pathJoin } from "path";
import { assert } from "tsafe/assert";
import { exclude } from "tsafe/exclude";
import { writeFile, readFile, rm, access } from "fs/promises";
import { crawl } from "./tools/crawl";
import { basename as pathBasename, sep as pathSep, dirname as pathDirname } from "path";
import type { Equals } from "tsafe";

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
    const packageName = JSON.parse(
        fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
    )["name"];

    const cwd = process.cwd();

    const dsfrDistDirPath =
        getProjectRoot() === cwd
            ? pathJoin(cwd, "dist", "dsfr")
            : await (async function callee(n: number): Promise<string> {
                  if (n >= cwd.split(pathSep).length) {
                      throw new Error("Need to install node modules?");
                  }

                  const dirPath = pathJoin(
                      ...[
                          cwd,
                          ...new Array(n).fill(".."),
                          "node_modules",
                          ...packageName.split("/"),
                          "dsfr"
                      ]
                  );

                  try {
                      await access(dirPath);
                  } catch {
                      return callee(n + 1);
                  }

                  return dirPath;
              })(0);

    const icons: Icon[] = JSON.parse(
        (await readFile(pathJoin(dsfrDistDirPath, pathOfIconsJson))).toString("utf8")
    );

    const { usedIconClassNames } = await (async function getUsedIconClassNames() {
        const candidateFilePaths = (
            await crawl({
                "dirPath": cwd,
                "getDoCrawlInDir": async ({ relativeDirPath }) => {
                    if (relativeDirPath === "node_modules") {
                        return true;
                    }

                    if (
                        relativeDirPath.startsWith(`node_modules${pathSep}@`) &&
                        relativeDirPath.split(pathSep).length === 2
                    ) {
                        return true;
                    }

                    if (
                        relativeDirPath.startsWith("node_modules") &&
                        (relativeDirPath.split(pathSep).length === 2 ||
                            (relativeDirPath.startsWith(`node_modules${pathSep}@`) &&
                                relativeDirPath.split(pathSep).length === 3))
                    ) {
                        const parsedPackageJson = await readFile(
                            pathJoin(relativeDirPath, "package.json")
                        ).then(
                            buff => JSON.parse(buff.toString("utf8")),
                            () => undefined
                        );

                        if (parsedPackageJson === undefined) {
                            return false;
                        }

                        if (
                            Object.keys({
                                ...parsedPackageJson["dependencies"],
                                ...parsedPackageJson["devDependencies"],
                                ...parsedPackageJson["peerDependencies"]
                            }).includes("@gouvfr/dsfr")
                        ) {
                            return true;
                        }

                        return false;
                    }

                    if (relativeDirPath === `public${pathSep}dsfr`) {
                        return false;
                    }

                    if (pathBasename(relativeDirPath) === "generatedFromCss") {
                        return false;
                    }

                    if (
                        pathDirname(relativeDirPath).endsWith(pathJoin(...packageName.split("/")))
                    ) {
                        return pathBasename(relativeDirPath) === "src";
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
        ).filter(
            filePath =>
                ["tsx", "jsx", "js", "ts", "html", "htm"].find(ext =>
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

                    setUsedIconClassNames.add(className);
                });
            })
        );

        return { "usedIconClassNames": Array.from(setUsedIconClassNames) };
    })();

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
                        dsfrDistDirPath,
                        pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist
                    )
                )
                .toString("utf8"),
            usedIcons
        }),
        "utf8"
    );

    const onConfirmedChange = async () => {
        const nextCacheDir = pathJoin(cwd, ".next", "cache");

        if (!fs.existsSync(nextCacheDir)) {
            return;
        }

        rm(nextCacheDir, { "recursive": true, "force": true });
    };

    [dsfrDistDirPath, pathJoin(cwd, "public", "dsfr")].forEach(async dsfrDistDirPath => {
        const cssFilePaths = ["icons.css", "icons.min.css"].map(cssFileBasename =>
            pathJoin(dsfrDistDirPath, "utility", "icons", cssFileBasename)
        );

        if (cssFilePaths.some(cssFilePath => !fs.existsSync(cssFilePath))) {
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

        cssFilePaths.forEach(async filePath => {
            const currentCode = await readFile(filePath);

            if (Buffer.compare(rawIconCssCodeBuffer, currentCode) === 0) {
                return;
            }

            onConfirmedChange();

            writeFile(filePath, rawIconCssCodeBuffer);
        });
    });
}

if (require.main === module) {
    main();
}
