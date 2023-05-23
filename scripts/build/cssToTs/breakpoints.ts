/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { objectKeys } from "tsafe/objectKeys";
import { exclude } from "tsafe/exclude";
import { parseCss } from "../parseCss";
import memoize from "memoizee";

export type BreakpointsValues = {
    unit: string /* em, px ... */;
    sm: number;
    md: number;
    lg: number;
    xl: number;
};

export type MediaQueryByBreakpoint = Record<"sm" | "md" | "lg" | "xl", string>;

assert<Equals<keyof MediaQueryByBreakpoint, Exclude<keyof BreakpointsValues, "unit">>>();

export const parseBreakpointsValues = memoize(
    (
        rawCssCode: string
    ): {
        breakpointsValues: BreakpointsValues;
        mediaQueryByBreakpoint: MediaQueryByBreakpoint;
    } => {
        const parsedCss = parseCss(rawCssCode);

        let prevUnit: string | undefined = undefined;

        const values: number[] = [];

        const mediaQueryByValue = new Map<number, string>();

        parsedCss.stylesheet?.rules
            .filter(rule => rule.type === "media")
            .forEach(rule => {
                const mediaQuery: string = (rule as any).media;

                const match = mediaQuery.match(/^\(min-width:\s*([0-9]+)([^)]+)\)$/);

                if (match === null) {
                    return;
                }

                const [, valueStr, unit] = match;

                if (prevUnit === undefined) {
                    prevUnit = unit;
                } else {
                    assert(prevUnit === unit);
                }

                const value = parseFloat(valueStr);

                values.push(value);

                mediaQueryByValue.set(value, mediaQuery);
            });

        assert(values.length === 4);
        assert(prevUnit !== undefined);

        const [sm, md, lg, xl] = values.sort();

        const breakpointsValues: BreakpointsValues = {
            "unit": prevUnit,
            sm,
            md,
            lg,
            xl
        };

        const mediaQueryByBreakpoint = Object.fromEntries(
            objectKeys(breakpointsValues)
                .map(breakPoint =>
                    breakPoint === "unit"
                        ? undefined
                        : ([breakPoint, breakpointsValues[breakPoint]] as const)
                )
                .filter(exclude(undefined))
                .map(([breakPoint, value]) => [
                    breakPoint,
                    (() => {
                        const mediaQuery = mediaQueryByValue.get(value);
                        assert(mediaQuery !== undefined);
                        return mediaQuery;
                    })()
                ])
        ) as MediaQueryByBreakpoint;

        return { breakpointsValues, mediaQueryByBreakpoint };
    }
);

export type RulesByBreakpoint = Record<
    "root" | keyof MediaQueryByBreakpoint,
    {
        type: "rule";
        selectors: string[];
        declarations: Record<string, unknown>[];
    }[]
>;

export const getRulesByBreakpoint = memoize((rawCssCode: string): RulesByBreakpoint => {
    const parsedCss = parseCss(rawCssCode);

    const { mediaQueryByBreakpoint } = parseBreakpointsValues(rawCssCode);

    const rulesByBreakpoint: RulesByBreakpoint = {} as any;

    rulesByBreakpoint.root = (parsedCss.stylesheet!.rules as any[]).filter(
        ({ type }) => type === "rule"
    );

    (parsedCss.stylesheet!.rules as any[])
        .filter(({ type }) => type === "supports")
        .forEach(({ rules }: any) =>
            rulesByBreakpoint.root.push(...rules.filter(({ type }: any) => type === "rule"))
        );

    (parsedCss.stylesheet!.rules as any[])
        .filter(({ type }) => type === "media")
        .filter(({ media }) => Object.values(mediaQueryByBreakpoint).includes(media))
        .forEach(
            ({ media, rules }: any) =>
                (rulesByBreakpoint[
                    objectKeys(mediaQueryByBreakpoint)
                        .map(breakpoint => ({
                            breakpoint,
                            "mediaQuery": mediaQueryByBreakpoint[breakpoint]
                        }))
                        .find(({ mediaQuery }) => mediaQuery === media)!.breakpoint
                ] = rules.filter(({ type }: any) => type === "rule"))
        );

    return rulesByBreakpoint;
});

export function generateBreakpointsTsCode(rawCssCode: string): string {
    const { breakpointsValues } = parseBreakpointsValues(rawCssCode);

    const sortedKeys = objectKeys(breakpointsValues)
        .filter(exclude("unit"))
        .sort((a, b) => breakpointsValues[a] - breakpointsValues[b]);

    return [
        `import { assert } from "tsafe/assert";`,
        `import type { Extends } from "tsafe";`,
        ``,
        `export const BreakpointsValuesUnit = "em";`,
        ``,
        `export const breakpointKeys = ["xs", ${sortedKeys
            .map(key => `"${key}"`)
            .join(", ")}] as const;`,
        ``,
        `export type BreakpointKeys = typeof breakpointKeys[number];`,
        ``,
        `export const BreakpointsValues = {`,
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
        `assert<Extends<typeof BreakpointsValues, Record<BreakpointKeys, number>>>();`,
        ``
    ].join("\n");
}
