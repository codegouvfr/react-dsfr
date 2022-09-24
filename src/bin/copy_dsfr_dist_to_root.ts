import { join as pathJoin } from "path";
import * as fs from "fs";
import { getProjectRoot } from "./tools/getProjectRoot";

const projectRootDirPath = getProjectRoot();

const dsfrDirPath = pathJoin(projectRootDirPath, "dsfr");

if (fs.existsSync(dsfrDirPath)) {
    fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
}

fs.cpSync(pathJoin(projectRootDirPath, "node_modules", "@gouvfr", "dsfr", "dist"), dsfrDirPath, {
    "recursive": true
});
