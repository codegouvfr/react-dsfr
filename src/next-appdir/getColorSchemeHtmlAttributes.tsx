import { data_fr_scheme, data_fr_theme } from "../useIsDark/constants";
import type { ColorScheme } from "../useIsDark";
import { type DefaultColorScheme, setDefaultColorSchemeServerSide } from "./zz_internal/defaultColorScheme";

const suppressHydrationWarning = true;

//export function getColorSchemeHtmlAttributes(params: { defaultColorScheme: "system"; }): { suppressHydrationWarning: true; };
//export function getColorSchemeHtmlAttributes(params: { defaultColorScheme: ColorScheme; }): { suppressHydrationWarning: true; } & Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme>;
export function getColorSchemeHtmlAttributes(params: {
    defaultColorScheme: DefaultColorScheme;
}): { suppressHydrationWarning: true } & (
    | Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme>
    | {}
) {
    const { defaultColorScheme } = params;

    setDefaultColorSchemeServerSide({ defaultColorScheme });

    if (defaultColorScheme === "system") {
        return { suppressHydrationWarning };
    }

    return {
        suppressHydrationWarning,
        [data_fr_scheme]: defaultColorScheme,
        [data_fr_theme]: defaultColorScheme
    };
}
