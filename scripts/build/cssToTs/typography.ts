import { getRulesByBreakpoint, parseBreakpointsValues } from "./breakpoints";
import { objectKeys } from "tsafe/objectKeys";
import { capitalize } from "tsafe/capitalize";
import { assert } from "tsafe/assert";

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

    objectKeys(rulesByBreakpoint).forEach(breakpoint => {
        const mediaQuery = breakpoint === "root" ? undefined : mediaQueryByBreakpoint[breakpoint];

        rulesByBreakpoint[breakpoint].forEach(rule => {
            const matchedSelectors: string[] = rule.selectors.filter(matchSelector);

            if (matchedSelectors.length === 0) {
                return;
            }

            const style: CSSObject = {};

            rule.declarations.forEach(declaration => {
                const property: string = (declaration as any).property;

                assert(
                    !property.startsWith("--"),
                    "We don't know how to deal with variables redefined specifically for typography"
                );

                return (style[
                    property
                        .split("-")
                        .map((word, i) => (i === 0 ? word : capitalize(word)))
                        .join("")
                ] = (() => {
                    const value = declaration.value as string;

                    int: {
                        const matchArr = value.match(/^([0-9]+(?:\.[0-9]+)?)(?:px)?$/);

                        if (matchArr === null) {
                            break int;
                        }

                        return Number.parseFloat(matchArr[1]);
                    }

                    return value;
                })());
            });

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
    let typographyVariantsJson = JSON.stringify(parseTypographyVariants(rawCssCode), null, 4);

    const { mediaQueryByBreakpoint } = parseBreakpointsValues(rawCssCode);

    objectKeys(mediaQueryByBreakpoint).forEach(
        bp =>
            (typographyVariantsJson = typographyVariantsJson.replaceAll(
                `"@media ${mediaQueryByBreakpoint[bp]}"`,
                `[breakpoints.up("${bp}")]`
            ))
    );

    return `export const typography = ${typographyVariantsJson} as const;`;
}
