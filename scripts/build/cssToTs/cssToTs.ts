import { generateBreakpointsTsCode } from "./breakpoints";
import { generateGetColorDecisionsHexTsCode, generateColorDecisionsTsCode } from "./colorDecisions";
import { generateGetColorOptionsHexTsCode, generateColorOptionsTsCode } from "./colorOptions";
import { getProjectRoot } from "../../../src/bin/tools/getProjectRoot";
import { generateTypographyTsCode } from "./typography";
import { generateSpacingTsCode } from "./spacing";
import { generateClassNamesTsCode } from "./classNames";
import { generateColorDecisionAndCorrespondingOptionsTsCode } from "./colorDecisionAndCorrespondingOptions";
import * as fs from "fs";
import { join as pathJoin, basename as pathBasename, relative as pathRelative } from "path";
import type { Icon } from "../../../src/bin/only-include-used-icons";

export function cssToTs(params: {
    rawDsfrCssCode: string;
    generatedDirPath: string;
    icons: Icon[];
}) {
    const { rawDsfrCssCode, generatedDirPath, icons } = params;

    fs.mkdirSync(generatedDirPath, { "recursive": true });

    const warningMessage = [
        `// This file is generated automatically by ${pathRelative(
            getProjectRoot(),
            __filename
        )}, please don't edit.`
    ].join("\n");

    const targetGetColorOptionsHexFilePath = pathJoin(generatedDirPath, "getColorOptionsHex.ts");

    fs.writeFileSync(
        targetGetColorOptionsHexFilePath,
        Buffer.from(
            [warningMessage, ``, generateGetColorOptionsHexTsCode(rawDsfrCssCode), ``].join("\n"),
            "utf8"
        )
    );

    const targetColorOptionsFilePath = pathJoin(generatedDirPath, "colorOptions.ts");

    fs.writeFileSync(
        targetColorOptionsFilePath,
        Buffer.from(
            [
                warningMessage,
                ``,
                `import type { getColorOptionsHex } from "./${pathBasename(
                    targetGetColorOptionsHexFilePath
                ).replace(/\.ts$/, "")}";`,
                ``,
                generateColorOptionsTsCode(rawDsfrCssCode),
                ``,
                `export type ColorOptions<Format extends "css var" | "hex"= "css var"> = `,
                `  Format extends "css var" ? typeof colorOptions : ReturnType<typeof getColorOptionsHex>;`,
                ``
            ].join("\n"),
            "utf8"
        )
    );

    const targetGetColorDecisionsHexFilePath = pathJoin(
        generatedDirPath,
        "getColorDecisionsHex.ts"
    );

    fs.writeFileSync(
        targetGetColorDecisionsHexFilePath,
        Buffer.from(
            [
                warningMessage,
                `import type { ColorOptions } from "./${pathBasename(
                    targetColorOptionsFilePath
                ).replace(/\.ts$/, "")}";`,
                ``,
                generateGetColorDecisionsHexTsCode(rawDsfrCssCode),
                ``
            ].join("\n"),
            "utf8"
        )
    );

    const targetColorDecisionsFilePath = pathJoin(generatedDirPath, "colorDecisions.ts");

    fs.writeFileSync(
        targetColorDecisionsFilePath,
        Buffer.from(
            [
                warningMessage,
                ``,
                `import type { getColorDecisionsHex } from "./${pathBasename(
                    targetGetColorDecisionsHexFilePath
                ).replace(/\.ts$/, "")}";`,
                ``,
                generateColorDecisionsTsCode(rawDsfrCssCode),
                ``,
                `export type ColorDecisions<Format extends "css var" | "hex"= "css var"> = `,
                `  Format extends "css var" ? typeof colorDecisions : ReturnType<typeof getColorDecisionsHex>;`,
                ``
            ].join("\n"),
            "utf8"
        )
    );

    fs.writeFileSync(
        pathJoin(generatedDirPath, "breakpoints.ts"),
        Buffer.from(
            [warningMessage, ``, generateBreakpointsTsCode(rawDsfrCssCode)].join("\n"),
            "utf8"
        )
    );

    fs.writeFileSync(
        pathJoin(generatedDirPath, "typography.ts"),
        Buffer.from(
            [
                warningMessage,
                `import { breakpoints } from "../breakpoints";`,
                ``,
                generateTypographyTsCode(rawDsfrCssCode),
                ``
            ].join("\n"),
            "utf8"
        )
    );

    fs.writeFileSync(
        pathJoin(generatedDirPath, "spacing.ts"),
        Buffer.from(
            [warningMessage, ``, generateSpacingTsCode(rawDsfrCssCode), ``].join("\n"),
            "utf8"
        )
    );

    fs.writeFileSync(
        pathJoin(generatedDirPath, "classNames.ts"),
        Buffer.from(
            [
                warningMessage,
                ``,
                generateClassNamesTsCode({
                    "rawCssCode": rawDsfrCssCode,
                    "dsfrIconClassNames": icons
                        .filter(({ prefix }) => prefix === "fr-icon-")
                        .map(({ iconId, prefix }) => `${prefix}${iconId}`),
                    "remixiconClassNames": icons
                        .filter(({ prefix }) => prefix === "ri-")
                        .map(({ iconId, prefix }) => `${prefix}${iconId}`)
                }),
                ``
            ].join("\n"),
            "utf8"
        )
    );

    fs.writeFileSync(
        pathJoin(generatedDirPath, "colorDecisionAndCorrespondingOptions.ts"),
        Buffer.from(
            [
                warningMessage,
                ``,
                generateColorDecisionAndCorrespondingOptionsTsCode(rawDsfrCssCode),
                ``
            ].join("\n"),
            "utf8"
        )
    );
}
