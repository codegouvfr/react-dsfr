import * as fs from "fs";
import { join as pathJoin } from "path";
import { getProjectRoot } from "../bin/tools/getProjectRoot";
import { exclude } from "tsafe/exclude";
import { execSync } from "child_process";
import { same } from "evt/tools/inDepth/same";
import { capitalize } from "tsafe/capitalize";

const packageJsonFilePath = pathJoin(getProjectRoot(), "package.json");

const packageJsonParsed = JSON.parse(fs.readFileSync(packageJsonFilePath).toString("utf8"));

const srcDirPath = pathJoin(getProjectRoot(), "src");

const newExports = {
    ".": `./${packageJsonParsed["module"]}`,
    ...Object.fromEntries(
        fs
            .readdirSync(srcDirPath)
            .map(basename => {
                const path = pathJoin(srcDirPath, basename);

                if (fs.lstatSync(path).isDirectory()) {
                    if (capitalize(path) !== path) {
                        return undefined;
                    }

                    for (const ext of [".ts", ".tsx"] as const) {
                        const relativePath = pathJoin(basename, `index${ext}`);

                        if (!fs.existsSync(pathJoin(srcDirPath, relativePath))) {
                            continue;
                        }

                        return [basename, relativePath];
                    }

                    return undefined;
                }

                walk: {
                    const match = basename.match(/^([^.]+)\.tsx?$/);

                    if (match === null) {
                        break walk;
                    }

                    const componentName = match[1];

                    return [componentName, `${componentName}.tsx`];
                }

                return undefined;
            })
            .filter(exclude(undefined))
            .filter(([, relativePath]) => {
                try {
                    execSync(`git ls-files --error-unmatch ${pathJoin(srcDirPath, relativePath)}`, {
                        "stdio": []
                    });
                } catch {
                    return false;
                }

                return true;
            })
            .filter(exclude(undefined))
            .sort()
            .reverse()
            .map(([componentName, relativePath]) => [
                componentName,
                relativePath.replace(/\.tsx?$/, ".js")
            ])
            .map(([componentName, relativeDistPath]) => [
                `./${componentName}`,
                `./dist/${relativeDistPath}`
            ])
    )
};

if (same(packageJsonParsed["exports"], newExports)) {
    process.exit(0);
}

fs.writeFileSync(
    packageJsonFilePath,
    Buffer.from(
        JSON.stringify(
            {
                ...packageJsonParsed,
                "exports": newExports
            },
            null,
            2
        ),
        "utf8"
    )
);
