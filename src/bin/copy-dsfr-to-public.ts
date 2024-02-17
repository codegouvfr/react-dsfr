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

import {
    join as pathJoin,
    relative as pathRelative,
    sep as pathSep,
    resolve as pathResolve
} from "path";
import * as fs from "fs";
import { getProjectRoot } from "./tools/getProjectRoot";
import yargsParser from "yargs-parser";
import { getAbsoluteAndInOsFormatPath } from "./tools/getAbsoluteAndInOsFormatPath";
import { readPublicDirPath } from "./readPublicDirPath";

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

    edit_gitignore: {
        const gitignoreFilePath = pathJoin(projectDirPath, ".gitignore");

        if (!fs.existsSync(gitignoreFilePath)) {
            fs.writeFileSync(gitignoreFilePath, Buffer.from("", "utf8"));
        }

        const gitignoreRaw = fs.readFileSync(gitignoreFilePath).toString("utf8");

        const pathToIgnore = `/${pathJoin(
            pathRelative(projectDirPath, publicDirPath),
            "dsfr"
        ).replace(new RegExp(`\\${pathSep}`, "g"), "/")}/`;

        if (gitignoreRaw.split("\n").find(line => line.startsWith(pathToIgnore)) !== undefined) {
            break edit_gitignore;
        }

        fs.writeFileSync(
            gitignoreFilePath,
            Buffer.from(`${gitignoreRaw}\n${pathToIgnore}\n`, "utf8")
        );
    }

    const dsfrDirPath = pathJoin(publicDirPath, "dsfr");

    if (fs.existsSync(dsfrDirPath)) {
        fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
    }

    (function callee(depth: number) {
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

            callee(depth + 1);

            return;
        }

        fs.cpSync(dsfrDirPathInNodeModules, dsfrDirPath, {
            "recursive": true
        });
    })(0);
})();

function getRepoIssueUrl() {
    const reactDsfrRepoUrl = JSON.parse(
        fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
    )
        ["repository"]["url"].replace(/^git/, "https:")
        .replace(/\.git$/, "");

    return `${reactDsfrRepoUrl}/issues`;
}
