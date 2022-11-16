#!/usr/bin/env node

import { join as pathJoin } from "path";
import * as fs from "fs";
import { getProjectRoot } from "./tools/getProjectRoot";

const projectDirPath = process.cwd();

const publicDirPath = pathJoin(projectDirPath, "public");

if (!fs.existsSync(publicDirPath)) {
    const reactDsfrRepoUrl = JSON.parse(
        fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
    )
        ["repository"]["url"].replace(/^git/, "https:")
        .replace(/\.git$/, "");

    console.error(
        [
            "There is no public/ directory in the current working directory, we don't know your framework",
            "you are not calling this script at the right location or we don't know your React framework",
            `please submit an issue about it here ${reactDsfrRepoUrl}/issues`
        ].join(" ")
    );

    process.exit(-1);
}

const dsfrDirPath = pathJoin(publicDirPath, "dsfr");

if (fs.existsSync(dsfrDirPath)) {
    fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
}

fs.cpSync(
    pathJoin(projectDirPath, "node_modules", "@codegouvfr", "react-dsfr", "dsfr"),
    dsfrDirPath,
    {
        "recursive": true
    }
);
