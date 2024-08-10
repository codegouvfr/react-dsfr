import React from "react";
import { fr } from "./fr";
import { HeaderQuickAccessItem } from "./Header";
import { useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import "./assets/language-select.css";

/** NOTE: Can be used as quick access item in the Header */
export function LanguageSelect<Language extends string>(props: {
    id?: string;
    supportedLangs: readonly Language[];
    fullNameByLang: Record<Language, string>;
    lang: Language;
    setLang: (lang: Language) => void;
}) {
    const { supportedLangs, fullNameByLang, lang, setLang } = props;

    const id = (function useClosure() {
        const id = useId();

        return props.id ?? `language-select-${id}`;
    })();

    const menuId = `dropdown-menu-${id}`;

    const { t } = useTranslation();

    return (
        <HeaderQuickAccessItem
            id={id}
            className="language-select"
            quickAccessItem={{
                buttonProps: {
                    "aria-controls": menuId,
                    "aria-expanded": false,
                    title: t("select language"),
                    className: fr.cx("fr-btn--tertiary", "fr-translate", "fr-nav")
                },
                iconId: "fr-icon-translate-2",
                text: (
                    <>
                        <div>
                            {" "}
                            <span className="short-label">{lang}</span>
                            <span className={fr.cx("fr-hidden-lg")}>
                                {" "}
                                -{fullNameByLang[lang]}
                            </span>{" "}
                        </div>
                        <div className={fr.cx("fr-collapse", "fr-menu")} id={menuId}>
                            <ul className={fr.cx("fr-menu__list")}>
                                {supportedLangs.map(lang_i => (
                                    <li key={lang_i}>
                                        <a
                                            className={fr.cx(
                                                "fr-translate__language",
                                                "fr-nav__link"
                                            )}
                                            href="#"
                                            aria-current={lang_i === lang ? "true" : undefined}
                                            onClick={e => {
                                                e.preventDefault();
                                                setLang(lang_i);
                                            }}
                                        >
                                            <span className="short-label">{lang_i}</span>
                                            &nbsp;-&nbsp;
                                            {fullNameByLang[lang_i]}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )
            }}
        />
    );
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
