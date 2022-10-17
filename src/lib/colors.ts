import { useMemo } from "react";
import { getColorOptions } from "./generatedFromCss/getColorOptions";
import type { ColorOptions } from "./generatedFromCss/getColorOptions";
import { getColorDecisions } from "./generatedFromCss/getColorDecisions";
import type { ColorDecisions } from "./generatedFromCss/getColorDecisions";
import { useIsDark } from "./darkMode";

export type ColorTheme = {
    isDark: boolean;
    decisions: ColorDecisions;
    options: ColorOptions;
};

export function useColorTheme(): ColorTheme {
    const { isDark } = useIsDark();

    const options = useMemo(() => getColorOptions({ isDark }), [isDark]);

    const decisions = useMemo(() => getColorDecisions({ "colorOptions": options }), [options]);

    const colorTheme = useMemo(
        (): ColorTheme => ({
            isDark,
            options,
            decisions
        }),
        [isDark]
    );

    return colorTheme;
}
