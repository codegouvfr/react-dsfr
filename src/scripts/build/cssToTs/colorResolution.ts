import { parseColorOptions } from "./colorOptions";
import { parseColorDecision } from "./colorDecisions";

export function generateColorResolutionTsCode(rawCssCode: string): string {
    return [
        `export const colorOptions= ${JSON.stringify(
            parseColorOptions(rawCssCode),
            null,
            4
        )} as const;`,
        ``,
        `export const colorDecisions= ${JSON.stringify(
            parseColorDecision(rawCssCode),
            null,
            4
        )} as const;`,
        ``
    ].join("\n");
}
