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
    const codegouvfrReactDsfr: string = JSON.parse(
        fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
    )["name"];

    const cwd = process.cwd();

    const isCwdReactDsfr = pathJoin(getProjectRoot(), "..") === cwd;

    const dsfrDistDirPath = isCwdReactDsfr
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
                      ...codegouvfrReactDsfr.split("/"),
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
            await Promise.all(
                isCwdReactDsfr
                    ? [
                          crawl({
                              "dirPath": pathJoin(cwd, "stories"),
                              "returnedPathsType": "absolute"
                          }),
                          crawl({
                              "dirPath": pathJoin(cwd, "src"),
                              "returnedPathsType": "absolute",
                              "getDoCrawlInDir": async ({ relativeDirPath }) => {
                                  if (pathBasename(relativeDirPath) === "generatedFromCss") {
                                      return false;
                                  }

                                  return true;
                              }
                          })
                      ]
                    : [
                          crawl({
                              "dirPath": cwd,
                              "returnedPathsType": "absolute",
                              "getDoCrawlInDir": async ({ relativeDirPath }) => {
                                  if (pathBasename(relativeDirPath) === "node_modules") {
                                      return false;
                                  }

                                  if (relativeDirPath === `public${pathSep}dsfr`) {
                                      return false;
                                  }

                                  if (pathBasename(relativeDirPath).startsWith(".")) {
                                      return false;
                                  }

                                  return true;
                              }
                          }),
                          (async () => {
                              const nodeModuleDirPath = await (async function callee(
                                  n: number
                              ): Promise<string> {
                                  if (n >= cwd.split(pathSep).length) {
                                      throw new Error("Need to install node modules?");
                                  }

                                  const nodeModuleDirPath = pathJoin(
                                      ...[cwd, ...new Array(n).fill(".."), "node_modules"]
                                  );

                                  try {
                                      await access(
                                          pathJoin(
                                              ...[
                                                  nodeModuleDirPath,
                                                  ...codegouvfrReactDsfr.split("/")
                                              ]
                                          )
                                      );
                                  } catch {
                                      return callee(n + 1);
                                  }

                                  return nodeModuleDirPath;
                              })(0);

                              return await crawl({
                                  "dirPath": nodeModuleDirPath,
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
                                                  nodeModuleDirPath,
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
                              });
                          })()
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

        assert<Equals<(typeof prefixes)[keyof typeof prefixes], Icon["prefix"]>>();

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

    // Make sure icon css is imported before main css.
    // In the doc prior to first of june 2023, we instructed to import first the main css and then the icon css.
    // Since @gouvfr/dsfr@1.9.ish it has to be the opposite.
    // We auto correct the order here.
    reorder_css_imports: {
        const indexHtmlFilePath = (() => {
            let out = pathJoin(cwd, "public", "index.html");

            if (fs.existsSync(out)) {
                return out;
            }

            out = pathJoin(cwd, "index.html");

            if (fs.existsSync(out)) {
                return out;
            }

            return undefined;
        })();

        if (indexHtmlFilePath === undefined) {
            break reorder_css_imports;
        }

        const indexHtml = fs.readFileSync(indexHtmlFilePath).toString("utf8");

        const lines = indexHtml.split("\n");

        const importDsfrIndexLine = lines.findIndex(line =>
            /<link.+href=["'](.*?%PUBLIC_URL%)?\/dsfr\/dsfr.min.css["']/.test(line)
        );

        if (importDsfrIndexLine === -1) {
            break reorder_css_imports;
        }

        if (
            !/<link.+href=["'](%PUBLIC_URL%)?\/dsfr\/utility\/icons\/icons\.min\.css["']/.test(
                lines[importDsfrIndexLine + 1]
            )
        ) {
            break reorder_css_imports;
        }

        fs.writeFileSync(
            indexHtmlFilePath,
            Buffer.from(
                lines
                    .map((line, i) => {
                        switch (i) {
                            case importDsfrIndexLine:
                                return lines[importDsfrIndexLine + 1];
                            case importDsfrIndexLine + 1:
                                return lines[importDsfrIndexLine];
                            default:
                                return line;
                        }
                    })
                    .join("\n"),
                "utf8"
            )
        );
    }
}

// In bun module is undefined we only use node to actually run this script
// so it's okay do do that (look at the first line of this file)
// Todo: remove 'typeof module !== undefined &&' when bun will be able to run this script.
if (typeof module !== "undefined" && require.main === module) {
    main();
}
