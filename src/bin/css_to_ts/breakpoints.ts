import css from "css";
import { assert } from "tsafe/assert";

export type BreakpointsValues = {
    unit: string /* em, px ... */;
    sm: number;
    md: number;
    lg: number;
    xl: number;
};

export function parseBreakpointsValues(rawCssCode: string): BreakpointsValues {
    const parsedCss = css.parse(rawCssCode);

    let prevUnit: string | undefined = undefined;

    const values: number[] = [];

    parsedCss.stylesheet?.rules
        .filter(rule => rule.type === "media")
        .forEach(rule => {
            const match = (rule as { media: string }).media.match(
                /^\(min-width:\s*([0-9]+)([^)]+)\)$/
            );

            if (match === null) {
                return;
            }

            const [, valueStr, unit] = match;

            if (prevUnit === undefined) {
                prevUnit = unit;
            } else {
                assert(prevUnit === unit);
            }

            values.push(parseFloat(valueStr));
        });

    assert(values.length === 4);
    assert(prevUnit !== undefined);

    const [sm, md, lg, xl] = values;

    return {
        "unit": prevUnit,
        sm,
        md,
        lg,
        xl
    };
}

export function generateBreakpointsValuesTsCode(breakpointsValues: BreakpointsValues): string {
    return [
        `export const breakpointsValues = {`,
        JSON.stringify(breakpointsValues, null, 2)
            .replace(/^{\n/, "")
            .replace(/\n}$/, "")
            .split("\n")
            .map(line => line.replace(/^[ ]{2}/, ""))
            .map(line => `    ${line}`)
            .join("\n"),
        `} as const;`
    ].join("\n");
}
