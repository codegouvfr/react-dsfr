import { colorOptions } from "./generatedFromCss/colorOptions";
import { getColorOptionsHex } from "./generatedFromCss/getColorOptionsHex";
import { colorDecisions } from "./generatedFromCss/colorDecisions";
import { getColorDecisionsHex } from "./generatedFromCss/getColorDecisionsHex";
export const colors = {
    "options": colorOptions,
    "decisions": colorDecisions,
    "getHex": (() => {
        const getHex = ({ isDark }) => {
            const options = getColorOptionsHex({ isDark });
            const decisions = getColorDecisionsHex({ "colorOptions": options });
            return {
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