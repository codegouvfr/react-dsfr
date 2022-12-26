import { data_fr_scheme, data_fr_theme } from "../useIsDark/constants";
import type { ColorScheme } from "../useIsDark";

export function getColorSchemeHtmlAttributes(params: {
    defaultColorScheme: ColorScheme | "system";
}): Record<never, unknown> | Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme> {
    const { defaultColorScheme } = params;

    if (defaultColorScheme === "system") {
        return {};
    }

    return {
        [data_fr_scheme]: defaultColorScheme,
        [data_fr_theme]: defaultColorScheme
    };
}
