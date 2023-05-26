import React, { memo } from "react";
import { makeStyles } from "./tss";
import { fr } from "./fr";

type Props = {
    lang: string;
    /**
     * Record<language code, language fullname>
     */
    languages: Record<string, string>;
    setLang: (lang: string) => void;
};

/**
 * The button controlling the component must specify 2 attributes
 * - "aria-controls": "translate-select",
 * - "aria-expanded": false,
 */
export const LanguageSelector = memo((props: Props) => {
    const { lang, languages, setLang } = props;

    const { cx, classes } = useStyles();

    return (
        <>
            <div className={classes.root}>
                {" "}
                <span className={classes.langShort}>{lang}</span>
                <span className={fr.cx("fr-hidden-lg")}> -{languages[lang]}</span>{" "}
            </div>
            <div
                className={cx(fr.cx("fr-collapse", "fr-menu"), classes.menuLanguage)}
                id="translate-select"
            >
                <ul className={fr.cx("fr-menu__list")}>
                    {Object.keys(languages).map(lang_i => (
                        <li key={lang_i}>
                            <a
                                className={fr.cx("fr-translate__language", "fr-nav__link")}
                                href="#"
                                aria-current={lang_i === lang ? "true" : undefined}
                                onClick={e => {
                                    e.preventDefault();
                                    setLang(lang_i);
                                }}
                            >
                                <span className={classes.langShort}>{lang_i}</span>
                                &nbsp;-&nbsp;{languages[lang_i]}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
});

LanguageSelector.displayName = "LanguageSelector";

const useStyles = makeStyles({ "name": { LanguageSelector } })(() => ({
    "root": {
        display: "inline-flex"
    },
    "menuLanguage": {
        "right": 0
    },
    "langShort": {
        "textTransform": "uppercase"
    }
}));
