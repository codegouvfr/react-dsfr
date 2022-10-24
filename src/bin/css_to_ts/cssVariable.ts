import type { MediaQueryByBreakpoint } from "./breakpoints";
import { getRulesByBreakpoint } from "./breakpoints";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { exclude } from "tsafe/exclude";
import memoize from "memoizee";
import type { ColorScheme } from "./colorOptions";

const orderedColorScheme = ["light", "dark"] as const;

assert<Equals<typeof orderedColorScheme[number], ColorScheme>>();

export type CssVariableValue = Record<
    "root" | keyof MediaQueryByBreakpoint,
    {
        light: string;
        dark: string;
    }
>;

export const data_fr_theme = "data-fr-theme";

export const createGetCssVariable = memoize((rawCssCode: string) => {
    const rulesByBreakpoint = getRulesByBreakpoint(rawCssCode);

    function getCssVariable(cssVariableName: `--${string}`): CssVariableValue {
        const cssVariableValue: CssVariableValue = {} as any;

        const orderedBreakpoints = ["root", "sm", "md", "lg", "xl"] as const;

        assert<Equals<typeof orderedBreakpoints[number], keyof typeof rulesByBreakpoint>>();

        orderedBreakpoints.forEach(breakpoint => {
            const rules = rulesByBreakpoint[breakpoint];

            orderedColorScheme.forEach(colorScheme => {
                const [declaration] = rules
                    .filter(
                        (rule: any) =>
                            rule.type === "rule" &&
                            rule.selectors.includes(
                                ":root" +
                                    (() => {
                                        switch (colorScheme) {
                                            case "light":
                                                return "";
                                            case "dark":
                                                return `:where([${data_fr_theme}="dark"])`;
                                        }
                                    })()
                            )
                    )
                    .map(rule =>
                        rule.declarations.find(
                            (declaration: any) => declaration.property === cssVariableName
                        )
                    )
                    .filter(exclude(undefined))
                    .reverse();

                if (breakpoint === "root" && colorScheme === "light") {
                    assert(
                        declaration !== undefined,
                        `${cssVariableName} not defined in the :root scope`
                    );
                }

                const value = declaration?.value as string | undefined;

                if (value === undefined) {
                    return;
                }

                const match = value.match(/^var\((--[^)]+)\)$/);

                for (
                    let i = orderedBreakpoints.indexOf(breakpoint);
                    i < orderedBreakpoints.length;
                    i++
                ) {
                    const breakpoint = orderedBreakpoints[i];

                    for (
                        let j = orderedColorScheme.indexOf(colorScheme);
                        j < orderedColorScheme.length;
                        j++
                    ) {
                        const colorScheme = orderedColorScheme[j];

                        (cssVariableValue[breakpoint] ??= {} as any)[colorScheme] =
                            match === null
                                ? value
                                : getCssVariable(match[1] as any)[breakpoint][colorScheme];
                    }
                }
            });
        });

        return cssVariableValue;
    }

    return { getCssVariable };
});
