/* eslint-disable @typescript-eslint/ban-types */
import { assert } from "tsafe/assert";
import { capitalize } from "tsafe/capitalize";
import { spacingTokenByValue } from "./generatedFromCss/spacing";
export function spacing(kindOrToken, params) {
    if (["padding", "margin"].indexOf(kindOrToken) >= 0) {
        const kind = kindOrToken;
        assert(params !== undefined);
        const out = {};
        const paramsWithOnlyDirection = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (() => {
            const { rightLeft } = params;
            return (rightLeft !== undefined && {
                "right": rightLeft,
                "left": rightLeft
            });
        })()), (() => {
            const { topBottom } = params;
            return (topBottom !== undefined && {
                "top": topBottom,
                "bottom": topBottom
            });
        })()), (params.top !== undefined && { "top": params.top })), (params.right !== undefined && { "right": params.right })), (params.bottom !== undefined && { "bottom": params.bottom })), (params.left !== undefined && { "left": params.left }));
        ["top", "right", "bottom", "left"].forEach(p => {
            const v = paramsWithOnlyDirection[p];
            if (v === undefined) {
                return;
            }
            out[`${kind}${capitalize(p)}`] = typeof v === "number" ? v : spacingTokenByValue[v];
        });
        return out;
    }
    else {
        const token = kindOrToken;
        return spacingTokenByValue[token];
    }
}
//# sourceMappingURL=spacing.js.map