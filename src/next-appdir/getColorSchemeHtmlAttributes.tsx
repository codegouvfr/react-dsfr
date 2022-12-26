import { data_fr_scheme, data_fr_theme } from "../useIsDark/constants";
import type { ColorScheme } from "../useIsDark";

const suppressHydrationWarning = true;

//export function getColorSchemeHtmlAttributes(params: { defaultColorScheme: "system"; }): { suppressHydrationWarning: true; };
//export function getColorSchemeHtmlAttributes(params: { defaultColorScheme: ColorScheme; }): { suppressHydrationWarning: true; } & Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme>;
export function getColorSchemeHtmlAttributes(params: {
    defaultColorScheme: ColorScheme | "system";
}): { suppressHydrationWarning: true } & (
    | Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme>
    | {}
) {
    const { defaultColorScheme } = params;

    if (defaultColorScheme === "system") {
        return { suppressHydrationWarning };
    }

    return {
        suppressHydrationWarning,
        [data_fr_scheme]: defaultColorScheme,
        [data_fr_theme]: defaultColorScheme
    };
}
