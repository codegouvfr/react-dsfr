import { generateGetColorOptionsTsCode, parseColorOptions } from "./colorOptions";
import { generateGetColorDecisionsTsCode, parseColorDecision } from "./colorDecisions";
import { getProjectRoot } from "../tools/getProjectRoot";
import * as fs from "fs";
import { join as pathJoin, basename as pathBasename, relative as pathRelative } from "path";

const projectRoot = getProjectRoot();

const rawCssCode = fs.readFileSync(pathJoin(projectRoot, "dsfr", "dsfr.css")).toString("utf8");

const generatedDirPath = pathJoin(projectRoot, "src", "lib", "useTheme", "generated");

fs.mkdirSync(generatedDirPath, { "recursive": true });

const warningMessage = [
    `// This file is generated automatically by ${pathRelative(
        projectRoot,
        __filename
    )}, please don't edit.`
].join("\n");

const targetOptionFilePath = pathJoin(generatedDirPath, "getColorOptions.ts");

const colorOptions = parseColorOptions(rawCssCode);

fs.writeFileSync(
    targetOptionFilePath,
    Buffer.from(
        [
            warningMessage,
            ``,
            generateGetColorOptionsTsCode(colorOptions),
            ``,
            `export type ColorOptions = ReturnType<typeof getColorOptions>;`,
            ``
        ].join("\n"),
        "utf8"
    )
);

const targetDecisionFilePath = pathJoin(generatedDirPath, "getColorDecisions.ts");

fs.writeFileSync(
    targetDecisionFilePath,
    Buffer.from(
        [
            warningMessage,
            `import type { ColorOptions } from "./${pathBasename(targetOptionFilePath).replace(
                /\.ts$/,
                ""
            )}";`,
            ``,
            generateGetColorDecisionsTsCode(
                parseColorDecision({
                    "colorOptionNames": colorOptions.map(({ colorOptionName }) => colorOptionName),
                    rawCssCode
                })
            ),
            ``,
            `export type ColorDecisions = ReturnType<typeof getColorDecisions>;`,
            ``
        ].join("\n"),
        "utf8"
    )
);
