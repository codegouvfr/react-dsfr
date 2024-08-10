import React from "react";
import { fr } from "./fr";
import { HeaderQuickAccessItem } from "./Header";
import { useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import "./assets/language-select.css";
/** NOTE: Can be used as quick access item in the Header */
export function LanguageSelect(props) {
    const { supportedLangs, fullNameByLang, lang, setLang } = props;
    const id = (function useClosure() {
        var _a;
        const id = useId();
        return (_a = props.id) !== null && _a !== void 0 ? _a : `language-select-${id}`;
    })();
    const menuId = `dropdown-menu-${id}`;
    const { t } = useTranslation();
    return (React.createElement(HeaderQuickAccessItem, { id: id, className: "language-select", quickAccessItem: {
            buttonProps: {
                "aria-controls": menuId,
                "aria-expanded": false,
                title: t("select language"),
                className: fr.cx("fr-btn--tertiary", "fr-translate", "fr-nav")
            },
            iconId: "fr-icon-translate-2",
            text: (React.createElement(React.Fragment, null,
                React.createElement("div", null,
                    " ",
                    React.createElement("span", { className: "short-label" }, lang),
                    React.createElement("span", { className: fr.cx("fr-hidden-lg") },
                        " ",
                        "-",
                        fullNameByLang[lang]),
                    " "),
                React.createElement("div", { className: fr.cx("fr-collapse", "fr-menu"), id: menuId },
                    React.createElement("ul", { className: fr.cx("fr-menu__list") }, supportedLangs.map(lang_i => (React.createElement("li", { key: lang_i },
                        React.createElement("a", { className: fr.cx("fr-translate__language", "fr-nav__link"), href: "#", "aria-current": lang_i === lang ? "true" : undefined, onClick: e => {
                                e.preventDefault();
                                setLang(lang_i);
                            } },
                            React.createElement("span", { className: "short-label" }, lang_i),
                            "\u00A0-\u00A0",
                            fullNameByLang[lang_i]))))))))
        } }));
}
export const { useTranslation, addLanguageSelectTranslations } = createComponentI18nApi({
    "componentName": symToStr({ LanguageSelect }),
    "frMessages": {
        /* spell-checker: disable */
        "select language": "Sélectionner la langue"
        /* spell-checker: enable */
    }
});
addLanguageSelectTranslations({
    "lang": "en",
    "messages": {
        "select language": "Select language"
    }
});
//# sourceMappingURL=LanguageSelect.js.map