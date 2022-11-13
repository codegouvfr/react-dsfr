import { join as pathJoin } from "path";
import * as fs from "fs";
import { getProjectRoot } from "./tools/getProjectRoot";
import {
    pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist,
    getPatchedRawCssCodeForCompatWithRemixIcon,
    pathOfIconsJson,
    collectIcons
} from "./css_to_ts/icons";

(async () => {
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
})();
