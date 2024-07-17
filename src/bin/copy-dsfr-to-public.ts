#!/usr/bin/env node

/**
 * This script is ran with `npx copy-dsfr-to-public`
 * It takes two optional arguments:
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 * - `--publicDir <path>` to specify the public directory.
 *   In Vite projects we will read the vite.config.ts (or .js) file to find the public directory.
 *   In other projects we will assume it's <project root>/public.
 *   This path is expressed relative to the project directory.
 */

import { join as pathJoin, resolve as pathResolve } from "path";
import * as fs from "fs";
import { getProjectRoot } from "./tools/getProjectRoot";
import yargsParser from "yargs-parser";
import { getAbsoluteAndInOsFormatPath } from "./tools/getAbsoluteAndInOsFormatPath";
import { readPublicDirPath } from "./readPublicDirPath";
import { transformCodebase } from "./tools/transformCodebase";
import { assert } from "tsafe/assert";

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

        return await readPublicDirPath({ projectDirPath });
    })();

    if (!fs.existsSync(publicDirPath)) {
        console.error(`Can't locate your public directory, use the --public option to specify it.`);
        process.exit(-1);
    }

    const dsfrDirPath = pathJoin(publicDirPath, "dsfr");

    if (fs.existsSync(dsfrDirPath)) {
        fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
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
