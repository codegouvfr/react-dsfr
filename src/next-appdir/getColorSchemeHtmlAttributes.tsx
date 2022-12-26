import type { ColorScheme, data_fr_scheme, data_fr_theme } from "../lib/darkMode";
import { id } from "tsafe/id";

export function getColorSchemeHtmlAttributes(params: {
    defaultColorScheme: ColorScheme | "system";
}): Record<never, unknown> | Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme> {
    const { defaultColorScheme } = params;

    if (defaultColorScheme === "system") {
        return {};
    }

    return {
        [id<typeof data_fr_scheme>("data-fr-scheme")]: defaultColorScheme,
        [id<typeof data_fr_theme>("data-fr-theme")]: defaultColorScheme
    };
}
