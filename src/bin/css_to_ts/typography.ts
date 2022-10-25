import { getRulesByBreakpoint, parseBreakpointsValues } from "./breakpoints";
import {
    createGetCssVariable,
    isInvariantAcrossScreenSizes,
    isInvariantAcrossTheme
} from "./cssVariable";
import { objectKeys } from "tsafe/objectKeys";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";

// Object that represent a set of CSS rules, see https://www.npmjs.com/package/csstype
// It's the argument of the `css()` function of @emotion/css.
type CSSObject = Record<string, unknown>;

export type TypographyVariant = {
    selector: string; // Ex: "h1", "h2", .fr-display--sm .fr-text--alt ...
    style: CSSObject;
};

export function parseTypographyVariants(rawCssCode: string): TypographyVariant[] {
    const typographyVariants: TypographyVariant[] = [];

    const rulesByBreakpoint = getRulesByBreakpoint(rawCssCode);

    const { mediaQueryByBreakpoint } = parseBreakpointsValues(rawCssCode);

    const { getCssVariable } = createGetCssVariable(rawCssCode);

    objectKeys(rulesByBreakpoint).forEach(breakpoint => {
        const mediaQuery = breakpoint === "root" ? undefined : mediaQueryByBreakpoint[breakpoint];

        rulesByBreakpoint[breakpoint].forEach(rule => {
            const matchedSelectors: string[] = rule.selectors.filter(matchSelector);

            if (matchedSelectors.length === 0) {
                return;
            }

            const style: CSSObject = {};

            rule.declarations.forEach(
                declaration =>
                    (style[(declaration as any).property] = (() => {
                        const value = declaration.value as string;

                        int: {
                            const n = parseInt(value.replace(/px$/, ""));

                            if (isNaN(n)) {
                                break int;
                            }

                            return n;
                        }

                        return value.replace(/var\((--[^)]+)\)/g, (...[, cssVariableName]) => {
                            assert(is<`--${string}`>(cssVariableName));

                            const cssVariableValue = getCssVariable(cssVariableName);

                            assert(
                                isInvariantAcrossTheme(cssVariableValue),
                                "CSS variable for TypoGraphy that depends on the theme have been introduce, the alg need to be made a bit more sophisticated."
                            );
                            assert(
                                isInvariantAcrossScreenSizes(cssVariableValue),
                                "CSS variable for TypoGraphy that depends on screen width have been introduce, the alg need to be made a bit more sophisticated."
                            );

                            return cssVariableValue.root.light;
                        });
                    })())
            );

            matchedSelectors.forEach(selector => {
                const typographyVariant = typographyVariants.find(
                    typographyVariant => typographyVariant.selector === selector
                );

                if (typographyVariant === undefined) {
                    typographyVariants.push({
                        selector,
                        "style":
                            mediaQuery === undefined
                                ? style
                                : {
                                      [`@media ${mediaQuery}`]: style
                                  }
                    });
                    return;
                }

                if (mediaQuery === undefined) {
                    typographyVariant.style = {
                        ...typographyVariant.style,
                        ...style
                    };
                } else {
                    typographyVariant.style[`@media ${mediaQuery}`] = {
                        ...(typographyVariant.style[`@media ${mediaQuery}`] ?? undefined),
                        ...style
                    };
                }
            });
        });
    });

    return typographyVariants;
}

function matchSelector(selector: string): boolean {
    return (
        ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(selector) ||
        /^\.fr-display--[a-zA-Z0-9-_]+$/.test(selector) ||
        /^\.fr-text--[a-zA-Z0-9-_]+$/.test(selector)
    );
}

export function generateTypographyTsCode(rawCssCode: string): string {
    const typographyVariants = parseBreakpointsValues(rawCssCode);

    //TODO
    return "const typography= " + JSON.stringify(typographyVariants, null, 2);
}
