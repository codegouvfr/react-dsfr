import { join as pathJoin } from "path";
import * as fs from "fs";

const projectDirPath = pathJoin(__dirname, "..", "..");

const destDirPath = pathJoin(projectDirPath, "src", "assets", "gouvfr_dsfr_dist");

{
    const assetsDirPath = pathJoin(destDirPath, "..");

    if (!fs.existsSync(assetsDirPath)) {
        fs.mkdirSync(pathJoin(destDirPath, ".."), { "recursive": true });
    }
}

fs.rmSync(destDirPath, { "recursive": true, "force": true });

fs.cpSync(pathJoin(projectDirPath, "node_modules", "@gouvfr", "dsfr", "dist"), destDirPath, {
    "recursive": true
});
