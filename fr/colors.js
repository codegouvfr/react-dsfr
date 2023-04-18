import { getColorOptions } from "./generatedFromCss/getColorOptions";
import { getColorDecisions } from "./generatedFromCss/getColorDecisions";
import { memoize } from "../tools/memoize";
export const getColors = memoize((isDark) => {
    const options = getColorOptions({ isDark });
    return {
        isDark,
        options,
        "decisions": getColorDecisions({ "colorOptions": options })
    };
}, { "max": 1 });
//# sourceMappingURL=colors.js.map