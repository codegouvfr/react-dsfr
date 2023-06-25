import { useMemo } from "react";
import { capitalize } from "tsafe/capitalize";
function getLanguageBestApprox(params) {
    const { languages, languageLike } = params;
    scope: {
        const lang = languages.find(lang => lang.toLowerCase() === languageLike.toLowerCase());
        if (lang === undefined) {
            break scope;
        }
        return lang;
    }
    scope: {
        const iso2LanguageLike = languageLike.split("-")[0].toLowerCase();
        const lang = languages.find(lang => lang.toLowerCase().includes(iso2LanguageLike));
        if (lang === undefined) {
            break scope;
        }
        return lang;
    }
    return undefined;
}
let useLang_glob = () => "fr";
export function setUseLang(params) {
    useLang_glob = params.useLang;
}
export function useLang() {
    return useLang_glob();
}
export function createComponentI18nApi(params) {
    const { componentName, frMessages } = params;
    const messagesByLang = { "fr": frMessages };
    function useTranslation() {
        const lang = useLang();
        const bestMatchLang = useMemo(() => {
            const bestApproxLang = getLanguageBestApprox({
                "languages": Object.keys(messagesByLang),
                "languageLike": lang
            });
            return bestApproxLang !== null && bestApproxLang !== void 0 ? bestApproxLang : "fr";
        }, [lang]);
        function t(messageKey, params) {
            var _a;
            const messageOrFn = (_a = messagesByLang[bestMatchLang][messageKey]) !== null && _a !== void 0 ? _a : messagesByLang["fr"][messageKey];
            return params === undefined ? messageOrFn : messageOrFn(params);
        }
        return { t };
    }
    function addTranslations(params) {
        const { lang, messages } = params;
        Object.entries(messages)
            .filter(([, value]) => value !== undefined)
            .forEach(([key, value]) => { var _a; var _b; return (((_a = (_b = messagesByLang)[lang]) !== null && _a !== void 0 ? _a : (_b[lang] = {}))[key] = value); });
    }
    return {
        useTranslation,
        [`add${capitalize(componentName)}Translations`]: addTranslations
    };
}
//# sourceMappingURL=i18n.js.map