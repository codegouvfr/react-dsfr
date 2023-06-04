import { data_fr_scheme, data_fr_theme } from "../useIsDark/constants";
import type { ColorScheme } from "../useIsDark";
import {
    type DefaultColorScheme,
    setDefaultColorSchemeServerSide
} from "./zz_internal/defaultColorScheme";
import { setUseLang } from "../i18n";

const suppressHydrationWarning = true;

export function getHtmlAttributes(params: {
    defaultColorScheme: DefaultColorScheme;
    lang?: string;
}): { suppressHydrationWarning: true; lang?: string } & (
    | Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme>
    | {}
) {
    const { defaultColorScheme, lang } = params;

    setDefaultColorSchemeServerSide({ defaultColorScheme });

    if (lang !== undefined) {
        setUseLang({ "useLang": () => lang });
    }

    if (defaultColorScheme === "system") {
        return {
            lang,
            suppressHydrationWarning
        };
    }

    return {
        lang,
        suppressHydrationWarning,
        [data_fr_scheme]: defaultColorScheme,
        [data_fr_theme]: defaultColorScheme
    };
}
