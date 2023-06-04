import { data_fr_scheme, data_fr_theme } from "../useIsDark/constants";
import { setDefaultColorSchemeServerSide } from "./zz_internal/defaultColorScheme";
import { setUseLang } from "../i18n";
const suppressHydrationWarning = true;
export function getHtmlAttributes(params) {
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
//# sourceMappingURL=getHtmlAttributes.js.map