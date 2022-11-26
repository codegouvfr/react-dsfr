import { tsc } from "./tools/tsc";
import { getProjectRoot } from "../bin/tools/getProjectRoot";
import { join as pathJoin } from "path";
import * as fs from "fs";
import { getPatchedRawCssCodeForCompatWithRemixIcon, collectIcons, cssToTs } from "./cssToTs";
import {
    pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist,
    pathOfIconsJson
} from "../bin/only-include-used-icons";
import * as child_process from "child_process";
import { oppa } from "oppa";
import { assert } from "tsafe/assert";

(async () => {
    const { args } = oppa()
        .add({
            "name": "npm",
            "type": "boolean"
        })
        .parse();

    const projectRootDirPath = getProjectRoot();

    const dsfrDirPath = pathJoin(projectRootDirPath, "dsfr");

    if (fs.existsSync(dsfrDirPath)) {
        fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
    }

    const nodeModuleDirPath = pathJoin(projectRootDirPath, "node_modules");

    fs.cpSync(pathJoin(nodeModuleDirPath, "@gouvfr", "dsfr", "dist"), dsfrDirPath, {
        "recursive": true
    });

    fs.writeFileSync(
        pathJoin(dsfrDirPath, pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist),
        Buffer.from(
            getPatchedRawCssCodeForCompatWithRemixIcon({
                "rawCssCode": fs.readFileSync(pathJoin(dsfrDirPath, "dsfr.css")).toString("utf8")
            }),
            "utf8"
        )
    );

    fs.writeFileSync(
        pathJoin(dsfrDirPath, pathOfIconsJson),
        Buffer.from(
            JSON.stringify(
                await collectIcons({
                    "remixiconDirPath": pathJoin(nodeModuleDirPath, "remixicon"),
                    "iconsCssRawCode": fs
                        .readFileSync(pathJoin(dsfrDirPath, "utility", "icons", "icons.css"))
                        .toString("utf8")
                }),
                null,
                2
            ),
            "utf8"
        )
    );

    const distDirPath = pathJoin(projectRootDirPath, "dist");

    if (fs.existsSync(distDirPath)) {
        fs.rmSync(distDirPath, { "recursive": true, "force": true });
    }

    cssToTs();

    await tsc({
        "tsconfigDirPath": pathJoin(projectRootDirPath, "src", "bin"),
        "doWatch": false
    });

    Object.entries<string>(
        JSON.parse(fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8"))[
            "bin"
        ]
    ).forEach(([, scriptPath]) =>
        child_process.execSync(`chmod +x ${scriptPath}`, {
            "cwd": getProjectRoot()
        })
    );

    await tsc({
        "tsconfigDirPath": pathJoin(projectRootDirPath, "src"),
        "doWatch": false
    });

    //NOTE: From here it's only for local linking, required for storybook and
    // running integration apps.
    if (!args.npm) {
        fs.writeFileSync(
            pathJoin(distDirPath, "package.json"),
            Buffer.from(
                JSON.stringify(
                    (() => {
                        const packageJsonParsed = JSON.parse(
                            fs
                                .readFileSync(pathJoin(projectRootDirPath, "package.json"))
                                .toString("utf8")
                        );

                        return {
                            ...packageJsonParsed,
                            "main": packageJsonParsed["main"].replace(/^dist\//, ""),
                            "types": packageJsonParsed["types"].replace(/^dist\//, ""),
                            "module": packageJsonParsed["module"].replace(/^dist\//, ""),
                            "exports": Object.fromEntries(
                                Object.entries(packageJsonParsed["exports"]).map(([key, value]) => [
                                    key,
                                    (assert(typeof value === "string"),
                                    value.replace(/^\.\/dist\//, "./"))
                                ])
                            )
                        };
                    })(),
                    null,
                    2
                ),
                "utf8"
            )
        );

        fs.cpSync(dsfrDirPath, pathJoin(distDirPath, "dsfr"), { "recursive": true });
    }
})();
