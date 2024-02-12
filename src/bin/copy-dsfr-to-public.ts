#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    join as pathJoin,
    relative as pathRelative,
    sep as pathSep,
    resolve as pathResolve
} from "path";
import * as fs from "fs";
import { getProjectRoot } from "./tools/getProjectRoot";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

(async () => {
    const projectDirPath = process.cwd();

    const viteConfigFilePath = (() => {
        for (const ext of [".js", ".ts"]) {
            const candidateFilePath = pathJoin(projectDirPath, `vite.config${ext}`);

            if (!fs.existsSync(candidateFilePath)) {
                continue;
            }

            return candidateFilePath;
        }

        return undefined;
    })();

    const publicDirPath = await (async () => {
        command_line_argument: {
            const arg = process.argv[2];

            if (arg === undefined) {
                break command_line_argument;
            }

            return arg;
        }

        read_from_vite_config: {
            if (viteConfigFilePath === undefined) {
                break read_from_vite_config;
            }

            const viteConfig = fs.readFileSync(viteConfigFilePath).toString("utf8");

            if (!viteConfig.includes("publicDir")) {
                return pathJoin(projectDirPath, "public");
            }

            const [, afterPublicDir] = viteConfig.split(/\s["']?publicDir["']?\s*:/);

            for (let indexEnd = 0; indexEnd < afterPublicDir.length; indexEnd++) {
                const {
                    default: path,
                    basename,
                    dirname,
                    delimiter,
                    extname,
                    format,
                    isAbsolute,
                    join,
                    normalize,
                    parse,
                    posix,
                    relative,
                    resolve,
                    sep,
                    toNamespacedPath,
                    win32,
                    ...rest
                } = await import("path");
                assert<Equals<keyof typeof rest, never>>();

                const part = afterPublicDir
                    .substring(0, indexEnd)
                    .replace(/__dirname/g, `"${projectDirPath}"`);

                let candidate: string;

                try {
                    candidate = eval(part);
                } catch {
                    continue;
                }

                if (typeof candidate !== "string") {
                    continue;
                }

                return candidate;
            }

            console.error(
                `Can't parse the vite configuration please open an issue about it ${getRepoIssueUrl()}`
            );

            process.exit(-1);
        }

        return pathJoin(projectDirPath, "public");
    })();

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

    if (!fs.existsSync(publicDirPath)) {
        if (viteConfigFilePath === undefined) {
            console.error(
                [
                    "There is no public/ directory in the current working directory, we don't know your framework",
                    "you are not calling this script at the right location or we don't know your React framework",
                    `please submit an issue about it here ${getRepoIssueUrl()}`
                ].join(" ")
            );

            process.exit(-1);
        }

        fs.mkdirSync(publicDirPath, { "recursive": true });
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
