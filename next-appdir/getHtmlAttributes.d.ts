import { data_fr_scheme, data_fr_theme } from "../useIsDark/constants";
import type { ColorScheme } from "../useIsDark";
import { type DefaultColorScheme } from "./zz_internal/defaultColorScheme";
export declare function getHtmlAttributes(params: {
    defaultColorScheme: DefaultColorScheme;
    lang?: string;
}): {
    suppressHydrationWarning: true;
    lang?: string;
} & (Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme> | {});
