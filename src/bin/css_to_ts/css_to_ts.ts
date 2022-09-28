import { generateGetColorOptionsTsCode, parseColorOptions } from "./colorOptions";
import { getProjectRoot } from "../tools/getProjectRoot";
import * as fs from "fs";
import { join as pathJoin, dirname as pathDirname, relative as pathRelative } from "path";

const projectRoot = getProjectRoot();

const rawCssCode = fs.readFileSync(pathJoin(projectRoot, "dsfr", "dsfr.css")).toString("utf8");

const tsCode = generateGetColorOptionsTsCode(parseColorOptions(rawCssCode));

const targetFilePath = pathJoin(
    projectRoot,
    "src",
    "lib",
    "useTheme",
    "generated",
    "getColorOptions.ts"
);

fs.mkdirSync(pathDirname(targetFilePath), { "recursive": true });

fs.writeFileSync(
    targetFilePath,
    Buffer.from(
        [
            `// This file is generated automatically by ${pathRelative(
                projectRoot,
                __filename
            )}, please don't edit.`,
            `import type { ColorScheme } from "../../useColorScheme";`,
            ``,
            tsCode,
            ``,
            `export type ColorOptions = ReturnType<typeof getColorOptions>;`,
            ``
        ].join("\n"),
        "utf8"
    )
);
