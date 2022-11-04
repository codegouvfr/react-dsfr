import { join as pathJoin } from "path";
import * as fs from "fs";
import { getProjectRoot } from "./tools/getProjectRoot";
import {
    pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist,
    getPatchedRawCssCodeForCompatWithRemixIcon
} from "./css_to_ts/icons";

const projectRootDirPath = getProjectRoot();

const dsfrDirPath = pathJoin(projectRootDirPath, "dsfr");

if (fs.existsSync(dsfrDirPath)) {
    fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
}

fs.cpSync(pathJoin(projectRootDirPath, "node_modules", "@gouvfr", "dsfr", "dist"), dsfrDirPath, {
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
