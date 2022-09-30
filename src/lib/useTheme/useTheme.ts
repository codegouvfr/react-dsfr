import { useMemo } from "react";
import { getColorOptions } from "./generated/getColorOptions";
import type { ColorOptions } from "./generated/getColorOptions";
import { getColorDecisions } from "./generated/getColorDecisions";
import type { ColorDecisions } from "./generated/getColorDecisions";
import { useIsDark } from "../useColorScheme";

export type Theme = {
    isDark: boolean;
    colors: {
        decisions: ColorDecisions;
        options: ColorOptions;
    };
};

export function useTheme(): Theme {
    const { isDark } = useIsDark();

    const colorOptions = useMemo(() => getColorOptions({ isDark }), [isDark]);

    const colorDecisions = useMemo(() => getColorDecisions({ colorOptions }), [colorOptions]);

    const theme = useMemo(
        (): Theme => ({
            isDark,
            colors: {
                "decisions": colorDecisions,
                "options": colorOptions
            }
        }),
        [isDark]
    );

    return theme;
}
