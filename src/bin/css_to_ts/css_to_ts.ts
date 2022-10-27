import { generateBreakpointsTsCode } from "./breakpoints";
import { generateGetColorDecisionsTsCode } from "./colorDecisions";
import { generateGetColorOptionsTsCode } from "./colorOptions";
import { getProjectRoot } from "../tools/getProjectRoot";
import { generateTypographyTsCode } from "./typography";
import { generateSpacingTsCode } from "./spacing";
import * as fs from "fs";
import { join as pathJoin, basename as pathBasename, relative as pathRelative } from "path";

const projectRoot = getProjectRoot();

const rawCssCode = fs.readFileSync(pathJoin(projectRoot, "dsfr", "dsfr.css")).toString("utf8");

const generatedDirPath = pathJoin(projectRoot, "src", "lib", "generatedFromCss");

fs.mkdirSync(generatedDirPath, { "recursive": true });

const warningMessage = [
    `// This file is generated automatically by ${pathRelative(
        projectRoot,
        __filename
    )}, please don't edit.`
].join("\n");

const targetOptionFilePath = pathJoin(generatedDirPath, "getColorOptions.ts");

fs.writeFileSync(
    targetOptionFilePath,
    Buffer.from(
        [
            warningMessage,
            ``,
            generateGetColorOptionsTsCode(rawCssCode),
            ``,
            `export type ColorOptions = ReturnType<typeof getColorOptions>;`,
            ``
        ].join("\n"),
        "utf8"
    )
);

fs.writeFileSync(
    pathJoin(generatedDirPath, "getColorDecisions.ts"),
    Buffer.from(
        [
            warningMessage,
            `import type { ColorOptions } from "./${pathBasename(targetOptionFilePath).replace(
                /\.ts$/,
                ""
            )}";`,
            ``,
            generateGetColorDecisionsTsCode(rawCssCode),
            ``,
            `export type ColorDecisions = ReturnType<typeof getColorDecisions>;`,
            ``
        ].join("\n"),
        "utf8"
    )
);

fs.writeFileSync(
    pathJoin(generatedDirPath, "breakpoints.ts"),
    Buffer.from([warningMessage, ``, generateBreakpointsTsCode(rawCssCode)].join("\n"), "utf8")
);

fs.writeFileSync(
    pathJoin(generatedDirPath, "typography.ts"),
    Buffer.from(
        [
            warningMessage,
            `import { breakpoints } from "../breakpoints";`,
            ``,
            generateTypographyTsCode(rawCssCode),
            ``
        ].join("\n"),
        "utf8"
    )
);

fs.writeFileSync(
    pathJoin(generatedDirPath, "spacing.ts"),
    Buffer.from([warningMessage, ``, generateSpacingTsCode(rawCssCode), ``].join("\n"), "utf8")
);
