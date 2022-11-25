import * as fs from "fs";
import { join as pathJoin } from "path";
import { getProjectRoot } from "../bin/tools/getProjectRoot";
import { exclude } from "tsafe/exclude";

const packageJsonFilePath = pathJoin(getProjectRoot(), "package.json");

const packageJsonParsed = JSON.parse(fs.readFileSync(packageJsonFilePath).toString("utf8"));

fs.writeFileSync(
    packageJsonFilePath,
    Buffer.from(
        JSON.stringify(
            {
                ...packageJsonParsed,
                "exports": {
                    ".": `./${packageJsonParsed["module"]}`,
                    ...Object.fromEntries(
                        fs
                            .readdirSync(pathJoin(getProjectRoot(), "src"))
                            .map(basename => {
                                const match = basename.match(/^([^.]+)\.tsx?$/);

                                if (match === null) {
                                    return undefined;
                                }

                                return match[1];
                            })
                            .filter(exclude(undefined))
                            .sort()
                            .reverse()
                            .map(name => [`./${name}`, `./dist/${name}.js`])
                    )
                }
            },
            null,
            2
        ),
        "utf8"
    )
);
