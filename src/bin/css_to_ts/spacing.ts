import memoize from "memoizee";
import { assert } from "tsafe/assert";
import { exclude } from "tsafe/exclude";
import { getRulesByBreakpoint } from "./breakpoints";
import { objectKeys } from "tsafe/objectKeys";

export type SpacingTokenAndValue = { token: string; value: string };

export const parseSpacing = memoize((rawCssCode: string): SpacingTokenAndValue[] => {
    const spacingTokenAndValues: SpacingTokenAndValue[] = [];

    const rulesByBreakpoint = getRulesByBreakpoint(rawCssCode);

    objectKeys(rulesByBreakpoint).forEach(breakpoint => {
        rulesByBreakpoint[breakpoint].forEach(({ selectors, declarations }) => {
            let value: string | undefined = undefined;

            selectors
                .map((selector: string) => {
                    const matchArr = selector.match(/^.fr-m-([0-9]+[a-zA-Z])+$/);
                    return matchArr === null ? undefined : matchArr[1];
                })
                .filter(exclude(undefined))
                .forEach(token => {
                    if (value === undefined) {
                        const declaration = declarations.find(
                            (declaration: any) =>
                                declaration.type === "declaration" &&
                                declaration.property === "margin"
                        );
                        assert(declaration !== undefined);
                        value = (declaration as any).value.replace(
                            /\s*!important\s*$/,
                            ""
                        ) as string;
                    }

                    const preExistingSpacingTokenAndValues = spacingTokenAndValues.find(
                        o => o.token === token
                    );

                    if (breakpoint !== "root") {
                        assert(
                            preExistingSpacingTokenAndValues !== undefined &&
                                preExistingSpacingTokenAndValues.value === value,
                            "Need tu update the module so that we support spacing that varies depending on screen sizes, so far we assumed they didn't"
                        );

                        return;
                    }

                    assert(spacingTokenAndValues.find(o => o.token === token) === undefined);

                    spacingTokenAndValues.push({
                        token,
                        value
                    });
                });
        });
    });

    {
        const getValueWeight = (value: string) => {
            const match = value.match(/^([0-9.]+)/);
            assert(match !== null);
            const n = parseFloat(match[1]);
            assert(!isNaN(n));
            return n;
        };

        spacingTokenAndValues.sort((a, b) => {
            const w1 = getValueWeight(a.value);
            const w2 = getValueWeight(b.value);

            if (w1 === w2) {
                if (a.token < b.token) {
                    return -1;
                }
                if (a.token > b.token) {
                    return 1;
                }
                return 0;
            }

            return w1 - w2;
        });
    }

    return spacingTokenAndValues;
});
