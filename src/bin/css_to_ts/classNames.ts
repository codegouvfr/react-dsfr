import { getRulesByBreakpoint } from "./breakpoints";
import memoize from "memoizee";
import { objectKeys } from "tsafe/objectKeys";

export const parseClassNames = memoize((rawCssCode: string): string[] => {
    const rulesByBreakpoint = getRulesByBreakpoint(rawCssCode);

    const classes = new Set<string>();

    objectKeys(rulesByBreakpoint).forEach(breakpoint => {
        const rules = rulesByBreakpoint[breakpoint];

        rules.forEach(({ selectors }) => {
            selectors.forEach(selector => {
                const matchArr = selector.match(/^\.(fr-[a-zA-Z0-9_-]+)/);

                if (matchArr === null) {
                    return;
                }

                classes.add(matchArr[1]);
            });
        });
    });

    return Array.from(classes);
});

export function generateClassNamesTsCode(rawCssCode: string): string {
    const classNames = parseClassNames(rawCssCode);

    return [
        `export const frClassNames= ${JSON.stringify(classNames, null, 4)} as const;`,
        ``,
        `export type FrClassName = typeof frClassNames[number];`,
        ``
    ].join("\n");
}
