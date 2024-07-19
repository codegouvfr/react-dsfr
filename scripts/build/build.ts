import { tsc } from "../tools/tsc";
import { getProjectRoot } from "../../src/bin/tools/getProjectRoot";
import { join as pathJoin, basename as pathBasename } from "path";
import * as fs from "fs";
import { getPatchedRawCssCodeForCompatWithRemixIcon, collectIcons } from "./icons";
import { cssToTs } from "./cssToTs";
import {
    PATH_OF_PATCHED_RAW_CSS_CODE_FOR_COMPAT_WITH_REMIXICON_RELATIVE_TO_DSFR,
    PATH_OF_ICONS_JSON
} from "../../src/bin/only-include-used-icons";
import * as child_process from "child_process";
import { patchCssForMui } from "./patchCssForMui";
import yargsParser from "yargs-parser";

(async () => {
    const argv = yargsParser(process.argv.slice(2));

    const isPrePublish = argv["prePublish"] === true;

    const projectRootDirPath = getProjectRoot();

    const dsfrDirPath = pathJoin(projectRootDirPath, "dsfr");

    if (fs.existsSync(dsfrDirPath)) {
        fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
    }

    const nodeModuleDirPath = pathJoin(projectRootDirPath, "node_modules");

    fs.cpSync(pathJoin(nodeModuleDirPath, "@gouvfr", "dsfr", "dist"), dsfrDirPath, {
        "recursive": true
    });

    {
        const filePath = pathJoin(dsfrDirPath, "dsfr.css");

        const dsfrCssContent = fs.readFileSync(filePath).toString("utf8");

        const dsfrCssContent_patched = dsfrCssContent.replace('@charset "UTF-8";', "");

        fs.writeFileSync(filePath, Buffer.from(dsfrCssContent_patched, "utf8"));
    }

    fs.cpSync(
        pathJoin(__dirname, "marianne-index.css"),
        pathJoin(dsfrDirPath, "fonts", "index.css")
    );

    const rawDsfrCssCode = fs.readFileSync(pathJoin(dsfrDirPath, "dsfr.css")).toString("utf8");

    fs.writeFileSync(
        pathJoin(
            dsfrDirPath,
            PATH_OF_PATCHED_RAW_CSS_CODE_FOR_COMPAT_WITH_REMIXICON_RELATIVE_TO_DSFR
        ),
        Buffer.from(
            getPatchedRawCssCodeForCompatWithRemixIcon({
                "rawCssCode": rawDsfrCssCode
            }),
            "utf8"
        )
    );

    {
        const { rawDsfrCssCodePatchedForMui, rawDsfrCssCodePatchedForMuiMinified } = patchCssForMui(
            { rawDsfrCssCode }
        );

        (
            [
                [rawDsfrCssCodePatchedForMui, ".css"],
                [rawDsfrCssCodePatchedForMuiMinified, ".min.css"]
            ] as const
        ).forEach(([rawCssCode, ext]) =>
            fs.writeFileSync(pathJoin(dsfrDirPath, `dsfr${ext}`), Buffer.from(rawCssCode, "utf8"))
        );
    }

    const icons = await collectIcons({
        "remixiconDirPath": pathJoin(nodeModuleDirPath, "remixicon"),
        "iconsCssRawCode": fs
            .readFileSync(pathJoin(dsfrDirPath, "utility", "icons", "icons.css"))
            .toString("utf8")
    });

    fs.writeFileSync(
        pathJoin(dsfrDirPath, PATH_OF_ICONS_JSON),
        Buffer.from(JSON.stringify(icons, null, 2), "utf8")
    );

    const distDirPath = pathJoin(projectRootDirPath, "dist");

    if (fs.existsSync(distDirPath)) {
        fs.rmSync(distDirPath, { "recursive": true, "force": true });
    }

    cssToTs({
        icons,
        "generatedDirPath": pathJoin(projectRootDirPath, "src", "fr", "generatedFromCss"),
        rawDsfrCssCode
    });

    await tsc({
        "tsconfigDirPath": pathJoin(projectRootDirPath, "src", "bin"),
        "doWatch": false
    });

    fs.cpSync(pathJoin(__dirname, "main.css"), pathJoin(distDirPath, "main.css"));

    fs.cpSync(pathJoin(dsfrDirPath, "favicon"), pathJoin(distDirPath, "favicon"), {
        "recursive": true
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

    {
        const assertSrcDirPath = pathJoin(projectRootDirPath, "src", "assets");

        fs.cpSync(
            assertSrcDirPath,
            pathJoin(
                projectRootDirPath,
                JSON.parse(
                    fs.readFileSync(pathJoin(projectRootDirPath, "tsproject.json")).toString("utf8")
                )["compilerOptions"]["outDir"],
                pathBasename(assertSrcDirPath)
            ),
            { "recursive": true }
        );
    }

    //NOTE: From here it's only for local linking, required for storybook and running integration apps.

    local_testing: {
        if (isPrePublish) {
            break local_testing;
        }

        {
            let modifiedPackageJsonContent = fs
                .readFileSync(pathJoin(projectRootDirPath, "package.json"))
                .toString("utf8");

            modifiedPackageJsonContent = (() => {
                const o = JSON.parse(modifiedPackageJsonContent);

                delete o.files;

                return JSON.stringify(o, null, 2);
            })();

            modifiedPackageJsonContent = modifiedPackageJsonContent
                .replace(/"dist\//g, '"')
                .replace(/"\.\/dist\//g, '"./')
                .replace(/"!dist\//g, '"!')
                .replace(/"!\.\/dist\//g, '"!./');

            fs.writeFileSync(
                pathJoin(distDirPath, "package.json"),
                Buffer.from(modifiedPackageJsonContent, "utf8")
            );
        }

        fs.cpSync(dsfrDirPath, pathJoin(distDirPath, "dsfr"), { "recursive": true });
        fs.rmSync(dsfrDirPath, { "recursive": true });
        fs.cpSync(pathJoin(projectRootDirPath, "src"), pathJoin(distDirPath, "src"), {
            "recursive": true
        });
    }
})();
