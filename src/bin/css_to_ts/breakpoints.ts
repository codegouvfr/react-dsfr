import css from "css";
import { assert } from "tsafe/assert";
import { objectKeys } from "tsafe/objectKeys";
import { exclude } from "tsafe/exclude";

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

    const [sm, md, lg, xl] = values.sort();

    return {
        "unit": prevUnit,
        sm,
        md,
        lg,
        xl
    };
}

export function generateBreakpointsTsCode(breakpointsValues: BreakpointsValues): string {
    const sortedKeys = objectKeys(breakpointsValues)
        .filter(exclude("unit"))
        .sort((a, b) => breakpointsValues[a] - breakpointsValues[b]);

    return [
        `import { assert } from "tsafe/assert";`,
        `import type { Extends } from "tsafe";`,
        ``,
        `export const breakpointValuesUnit = "em";`,
        ``,
        `export const breakpointKeys = ["xs", ${sortedKeys
            .map(key => `"${key}"`)
            .join(", ")}] as const;`,
        ``,
        `export type BreakpointKeys = typeof breakpointKeys[number];`,
        ``,
        `export const breakpointValues = {`,
        JSON.stringify(
            Object.fromEntries(
                (["xs", ...sortedKeys] as const).map(key => [
                    key,
                    key === "xs" ? 0 : breakpointsValues[key]
                ])
            ),
            null,
            2
        )
            .replace(/^{\n/, "")
            .replace(/\n}$/, "")
            .split("\n")
            .map(line => line.replace(/^[ ]{2}/, ""))
            .map(line => `    ${line}`)
            .join("\n"),
        `} as const;`,
        ``,
        `assert<Extends<typeof breakpointValues, Record<BreakpointKeys, number>>>();`,
        ``
    ].join("\n");
}
