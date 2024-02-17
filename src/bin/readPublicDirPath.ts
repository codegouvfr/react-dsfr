/* eslint-disable @typescript-eslint/no-unused-vars */

import { join as pathJoin, dirname as pathDirname } from "path";
import * as fs from "fs";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { getAbsoluteAndInOsFormatPath } from "./tools/getAbsoluteAndInOsFormatPath";

/** If we read from vite config we take the liberty of creating it if it does not exist */
export async function readPublicDirPath(params: { projectDirPath: string }): Promise<string> {
    const { projectDirPath } = params;

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

    read_from_vite_config: {
        if (viteConfigFilePath === undefined) {
            break read_from_vite_config;
        }

        const viteConfig = fs.readFileSync(viteConfigFilePath).toString("utf8");

        if (
            !viteConfig
                .split(/\r?\n/)
                .filter(line => !line.trim().startsWith("//"))
                .join("\n")
                .includes("publicDir")
        ) {
            break read_from_vite_config;
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

            const publicDirPath = getAbsoluteAndInOsFormatPath({
                "pathIsh": candidate,
                "cwd": pathDirname(viteConfigFilePath)
            });

            if (!fs.existsSync(publicDirPath)) {
                fs.mkdirSync(publicDirPath, { "recursive": true });
            }

            return publicDirPath;
        }

        console.error(
            `Can't parse the vite configuration please open an issue about it on the react-dsfr GitHub repository.`
        );

        process.exit(-1);
    }

    const publicDirPath = pathJoin(projectDirPath, "public");

    return publicDirPath;
}
