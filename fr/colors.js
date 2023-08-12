import { colorOptions } from "./generatedFromCss/colorOptions";
import { getColorOptionsHex } from "./generatedFromCss/getColorOptionsHex";
import { getColorDecisions } from "./generatedFromCss/getColorDecisions";
export const colors = {
    "options": colorOptions,
    "decisions": getColorDecisions({ colorOptions }),
    "getHex": (() => {
        const getHex = ({ isDark }) => {
            const options = getColorOptionsHex({ isDark });
            const decisions = getColorDecisions({ colorOptions });
            return {
                isDark,
                options,
                decisions
            };
        };
        const cache = {
            "light": undefined,
            "dark": undefined
        };
        return ({ isDark }) => { var _a; var _b; return ((_a = cache[_b = isDark ? "dark" : "light"]) !== null && _a !== void 0 ? _a : (cache[_b] = getHex({ isDark }))); };
    })()
};
//# sourceMappingURL=colors.js.map