import { getColorOptions } from "./generatedFromCss/getColorOptions";
import type { ColorOptions } from "./generatedFromCss/getColorOptions";
import { getColorDecisions } from "./generatedFromCss/getColorDecisions";
import type { ColorDecisions } from "./generatedFromCss/getColorDecisions";
import { useIsDark } from "./darkMode";
import { memoize } from "./tools/memoize";

export type ColorTheme = {
    isDark: boolean;
    decisions: ColorDecisions;
    options: ColorOptions;
};

export const getColors = memoize(
    (isDark: boolean): ColorTheme => {
        const options = getColorOptions({ isDark });

        return {
            isDark,
            options,
            "decisions": getColorDecisions({ "colorOptions": options })
        };
    },
    { "max": 1 }
);

export function useColors(): ColorTheme {
    const { isDark } = useIsDark();

    return getColors(isDark);
}
