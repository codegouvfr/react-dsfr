/** This script grant execution (chmod +x) to all the files in
 * the "bin" property of the package.json
 **/

import { getProjectRoot } from "./getProjectRoot";
import { join as pathJoin } from "path";
import * as child_process from "child_process";
import * as fs from "fs";

Object.entries<string>(
    JSON.parse(fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8"))["bin"]
).forEach(([, scriptPath]) =>
    child_process.execSync(`chmod +x ${scriptPath}`, {
        "cwd": getProjectRoot()
    })
);
