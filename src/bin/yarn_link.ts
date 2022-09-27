/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execSync } from "child_process";
import { join as pathJoin, relative as pathRelative, basename as pathBasename } from "path";
import * as fs from "fs";
import { getProjectRoot } from "./tools/getProjectRoot";

const projectDirPath = getProjectRoot();

fs.writeFileSync(
    pathJoin(projectDirPath, "dist", "package.json"),
    Buffer.from(
        JSON.stringify(
            (() => {
                const packageJsonParsed = JSON.parse(
                    fs.readFileSync(pathJoin(projectDirPath, "package.json")).toString("utf8")
                );

                return {
                    ...packageJsonParsed,
                    "main": packageJsonParsed["main"].replace(/^dist\//, ""),
                    "types": packageJsonParsed["types"].replace(/^dist\//, "")
                    /*
                    "module": packageJsonParsed["module"].replace(
                        /^dist\//,
                        "",
                    ),
                    "exports": Object.fromEntries(
                        Object.entries(packageJsonParsed["exports"]).map(
                            ([path, obj]) => [
                                path,
                                Object.fromEntries(
                                    Object.entries(
                                        obj as Record<string, string>,
                                    ).map(([type, path]) => [
                                        type,
                                        path.replace(/^\.\/dist\//, "./"),
                                    ]),
                                ),
                            ],
                        ),
                    ),
                    */
                };
            })(),
            null,
            2
        ),
        "utf8"
    )
);

{
    const dsfrDestDirPath = pathJoin(projectDirPath, "dist", "dsfr");

    if (fs.existsSync(dsfrDestDirPath)) {
        fs.rmSync(dsfrDestDirPath, { "recursive": true, "force": true });
    }

    fs.cpSync(pathJoin(projectDirPath, pathBasename(dsfrDestDirPath)), dsfrDestDirPath, {
        "recursive": true
    });
}

const commonThirdPartyDeps = (() => {
    const namespaceModuleNames: string[] = [
        /*"@emotion"*/
    ];
    const standaloneModuleNames = ["react", "@types/react"];

    return [
        ...namespaceModuleNames
            .map(namespaceModuleName =>
                fs
                    .readdirSync(pathJoin(projectDirPath, "node_modules", namespaceModuleName))
                    .map(submoduleName => `${namespaceModuleName}/${submoduleName}`)
            )
            .reduce((prev, curr) => [...prev, ...curr], []),
        ...standaloneModuleNames
    ];
})();

const yarnHomeDirPath = pathJoin(projectDirPath, ".yarn_home");

fs.rmSync(yarnHomeDirPath, { "recursive": true, "force": true });

fs.mkdirSync(yarnHomeDirPath);

const execYarnLink = (params: { targetModuleName?: string; cwd: string }) => {
    const { targetModuleName, cwd } = params;

    const cmd = [
        "yarn",
        "link",
        ...(targetModuleName !== undefined ? [targetModuleName] : [])
    ].join(" ");

    console.log(`$ cd ${pathRelative(projectDirPath, cwd) || "."} && ${cmd}`);

    execSync(cmd, {
        cwd,
        "env": {
            ...process.env,
            "HOME": yarnHomeDirPath
        }
    });
};

const testAppNames = ["cra", "vite", "next"] as const;

const getTestAppPath = (testAppName: typeof testAppNames[number]) =>
    pathJoin(projectDirPath, "src", "test", "frameworks", testAppName);

testAppNames.forEach(testAppName =>
    execSync("yarn install", { "cwd": getTestAppPath(testAppName) })
);

console.log("=== Linking common dependencies ===");

const total = commonThirdPartyDeps.length;
let current = 0;

commonThirdPartyDeps.forEach(commonThirdPartyDep => {
    current++;

    console.log(`${current}/${total} ${commonThirdPartyDep}`);

    const localInstallPath = pathJoin(
        ...[
            projectDirPath,
            "node_modules",
            ...(commonThirdPartyDep.startsWith("@")
                ? commonThirdPartyDep.split("/")
                : [commonThirdPartyDep])
        ]
    );

    execYarnLink({ "cwd": localInstallPath });

    testAppNames.forEach(testAppName =>
        execYarnLink({
            "cwd": getTestAppPath(testAppName),
            "targetModuleName": commonThirdPartyDep
        })
    );
});

console.log("=== Linking in house dependencies ===");

execYarnLink({ "cwd": pathJoin(projectDirPath, "dist") });

testAppNames.forEach(testAppName =>
    execYarnLink({
        "cwd": getTestAppPath(testAppName),
        "targetModuleName": "@codegouvfr/react-dsfr"
    })
);
