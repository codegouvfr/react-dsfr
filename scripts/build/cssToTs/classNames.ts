import memoize from "memoizee";
import { parseCss } from "../parseCss";
import { assert } from "tsafe/assert";
import { typeGuard } from "tsafe/typeGuard";

export const parseClassNames = memoize((rawCssCode: string): string[] => {
    const parsedCss = parseCss(rawCssCode);

    const classNames = new Set<string>();

    JSON.stringify(parsedCss, (key, value) => {
        if (key === "selectors") {
            const selectors = value as unknown;

            assert(
                typeGuard<string[]>(
                    selectors,
                    selectors instanceof Array &&
                        selectors.every(selector => typeof selector === "string")
                )
            );

            selectors.forEach(selector => {
                const matchArr = selector.match(/\.fr-[a-zA-Z0-9_-]+(?:@[a-zA-Z0-9_-]+)?/g);
                if (matchArr === null) {
                    return;
                }

                matchArr
                    .map(matchedStr => matchedStr.replace(/^\./, ""))
                    .forEach(className => classNames.add(className));
            });
        }
        return value;
    });

    return Array.from(classNames);
});

export function generateClassNamesTsCode(params: {
    rawCssCode: string;
    dsfrIconClassNames: string[];
    remixiconClassNames: string[];
}): string {
    const { rawCssCode, dsfrIconClassNames, remixiconClassNames } = params;

    const classNames = parseClassNames(rawCssCode);

    return [
        `export const frCoreClassNames= ${JSON.stringify(classNames, null, 4)} as const;`,
        ``,
        `export type FrCoreClassName = typeof frCoreClassNames[number];`,
        ``,
        `export const frIconClassNames= ${JSON.stringify(dsfrIconClassNames, null, 4)} as const;`,
        ``,
        `export type FrIconClassName = typeof frIconClassNames[number];`,
        ``,
        `export const riIconClassNames= ${JSON.stringify(remixiconClassNames, null, 4)} as const;`,
        ``,
        `export type RiIconClassName = typeof riIconClassNames[number];`,
        ``,
        `export type FrClassName = FrCoreClassName | FrIconClassName | RiIconClassName;`,
        ``
    ].join("\n");
}
