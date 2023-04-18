import type { ColorOptions } from "./generatedFromCss/getColorOptions";
import type { ColorDecisions } from "./generatedFromCss/getColorDecisions";
export type ColorTheme = {
    isDark: boolean;
    decisions: ColorDecisions;
    options: ColorOptions;
};
export declare const getColors: (isDark: boolean) => ColorTheme;
