#!/usr/bin/env node

/**
 * This script is ran with `npx copy-dsfr-to-public`
 * It takes one optional arguments (for NX monorepos):
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 */

import { join as pathJoin, resolve as pathResolve, relative as pathRelative } from "path";
import * as fs from "fs";
import { getProjectRoot } from "./tools/getProjectRoot";
import yargsParser from "yargs-parser";
import { getAbsoluteAndInOsFormatPath } from "./tools/getAbsoluteAndInOsFormatPath";
import { readPublicDirPath } from "./readPublicDirPath";
import { transformCodebase } from "./tools/transformCodebase";
import { assert } from "tsafe/assert";
import { modifyHtmlHrefs } from "./tools/modifyHtmlHrefs";

(async () => {
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

    const publicDirPath = await readPublicDirPath({ projectDirPath });

    const htmlFilePath = await (async () => {
        vite: {
            const filePath = pathJoin(projectDirPath, "index.html");

            if (!fs.existsSync(filePath)) {
                break vite;
            }

            return filePath;
        }

        cra: {
            const filePath = pathJoin(publicDirPath, "index.html");

            if (!fs.existsSync(filePath)) {
                break cra;
            }

            return filePath;
        }

        assert(false, "Can't locate your index.html file.");
    })();

    if (!fs.existsSync(publicDirPath)) {
        console.error(`Can't locate your public directory.`);
        process.exit(-1);
    }

    const dsfrDirPath = pathJoin(publicDirPath, "dsfr");

    const gouvFrDsfrVersion: string = JSON.parse(
        fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
    )["dependencies"]["@gouvfr/dsfr"];

    const versionFilePath = pathJoin(dsfrDirPath, "version.txt");

    early_exit: {
        if (!fs.existsSync(dsfrDirPath)) {
            break early_exit;
        }

        if (!fs.existsSync(versionFilePath)) {
            break early_exit;
        }

        const currentVersion = fs.readFileSync(versionFilePath).toString("utf8");

        if (currentVersion !== gouvFrDsfrVersion) {
            fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
            break early_exit;
        }

        console.log(
            `DSFR distribution in ${pathRelative(process.cwd(), dsfrDirPath)} is up to date.`
        );

        return;
    }

    fs.mkdirSync(dsfrDirPath, { "recursive": true });

    fs.writeFileSync(pathJoin(dsfrDirPath, ".gitignore"), Buffer.from("*", "utf8"));

    const dsfrDistNodeModulesDirPath = (function dsfrDistNodeModulesDirPath(depth: number): string {
        const parentProjectDirPath = pathResolve(
            pathJoin(...[projectDirPath, ...new Array(depth).fill("..")])
        );

        const dsfrDirPathInNodeModules = pathJoin(
            ...[parentProjectDirPath, "node_modules", "@codegouvfr", "react-dsfr", "dsfr"]
        );

        if (!fs.existsSync(dsfrDirPathInNodeModules)) {
            if (parentProjectDirPath === "/") {
                console.error(
                    [
                        "Can't find dsfr directory",
                        `please submit an issue about it here ${getRepoIssueUrl()}`
                    ].join(" ")
                );
                process.exit(-1);
            }

            return dsfrDistNodeModulesDirPath(depth + 1);
        }

        return dsfrDirPathInNodeModules;
    })(0);

    {
        const dsfrMinCssFileRelativePath = "dsfr.min.css";

        const usedAssetsRelativeFilePaths = new Set(
            readAssetsImportFromDsfrCss({
                "dsfrSourceCode": fs
                    .readFileSync(pathJoin(dsfrDistNodeModulesDirPath, dsfrMinCssFileRelativePath))
                    .toString("utf8")
            })
        );

        const fileToKeepRelativePaths = new Set([
            pathJoin("favicon", "apple-touch-icon.png"),
            pathJoin("favicon", "favicon.svg"),
            pathJoin("favicon", "favicon.ico"),
            pathJoin("favicon", "manifest.webmanifest"),
            pathJoin("utility", "icons", "icons.min.css"),
            dsfrMinCssFileRelativePath
        ]);

        transformCodebase({
            "srcDirPath": dsfrDistNodeModulesDirPath,
            "destDirPath": dsfrDirPath,
            "transformSourceCode": ({ fileRelativePath, sourceCode }) => {
                if (
                    fileToKeepRelativePaths.has(fileRelativePath) ||
                    usedAssetsRelativeFilePaths.has(fileRelativePath)
                ) {
                    return { "modifiedSourceCode": sourceCode };
                }
            }
        });
    }

    fs.writeFileSync(versionFilePath, Buffer.from(gouvFrDsfrVersion, "utf8"));

    add_version_query_params_in_html_imports: {
        const { modifiedHtml } = modifyHtmlHrefs({
            "html": fs.readFileSync(htmlFilePath).toString("utf8"),
            "getModifiedHref": href => {
                if (!href.includes("/dsfr/")) {
                    return href;
                }

                if (href.endsWith("icons.min.css")) {
                    return href;
                }

                const [urlWithoutQuery] = href.split("?");

                return `${urlWithoutQuery}?v=${gouvFrDsfrVersion}`;
            }
        });

        if (htmlFilePath === modifiedHtml) {
            break add_version_query_params_in_html_imports;
        }

        fs.writeFileSync(htmlFilePath, Buffer.from(modifiedHtml, "utf8"));
    }
})();

function readAssetsImportFromDsfrCss(params: { dsfrSourceCode: string }): string[] {
    const { dsfrSourceCode } = params;

    const fileRelativePaths = [/url\("([^"]+)"\)/g, /url\('([^']+)'\)/g, /url\(([^)]+)\)/g]
        .map(regex => {
            const fileRelativePaths: string[] = [];

            dsfrSourceCode.replace(regex, (...[, relativeFilePath]) => {
                if (relativeFilePath.startsWith("data:")) {
                    return "";
                }

                fileRelativePaths.push(relativeFilePath);

                return "";
            });

            return fileRelativePaths;
        })
        .flat();

    assert(fileRelativePaths.length !== 0);

    return fileRelativePaths;
}

function getRepoIssueUrl() {
    const reactDsfrRepoUrl = JSON.parse(
        fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
    )
        ["repository"]["url"].replace(/^git/, "https:")
        .replace(/\.git$/, "");

    return `${reactDsfrRepoUrl}/issues`;
}
