import { data_fr_scheme, data_fr_theme } from "../useIsDark/constants";
import type { ColorScheme } from "../useIsDark";
export declare function getColorSchemeHtmlAttributes(params: {
    defaultColorScheme: ColorScheme | "system";
}): {
    suppressHydrationWarning: true;
} & (Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme> | {});
