import React, { useState } from "react";
import { LanguageSelect as LanguageSelect_base } from "../dist/LanguageSelect";

import { getStoryFactory } from "./getStory";
import { Header } from "../dist/Header";
import "./utils.css";

const { meta, getStory } = getStoryFactory({
    "wrappedComponent": { "LanguageSelect": Story },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/selecteur-de-langue/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Header/LanguageSelect.tsx)  
  


\`src/Header.tsx\`  

\`\`\`tsx  

import { Header as DsfrHeader } from "@codegouvfr/react-dsfr/Header";
import { LanguageSelect } from "./LanguageSelect";

export function Header() {
    return (
        <DsfrHeader
            quickAccessItems={[
                <LanguageSelect />
            ]}
        />
    );
}
\`\`\`  


\`src/LanguageSelect.tsx\`  

\`\`\`tsx

import { 
    LanguageSelect as LanguageSelect_base, 
    addLanguageSelectTranslations 
} from "@codegouvfr/react-dsfr/LanguageSelect";
import { useLang, languages } from "i18n"; // i18nifty

type Props = {
    id?: string;
};

// NOTE: This component can be used inside or outside of the Header component.
export function LanguageSelect(props: Props) {

    const { id } = props;

    const { lang, setLang } = useLang();

    return (
        <LanguageSelect_base
            id={id}
            supportedLangs={languages} // ["en", "fr"]
            lang={lang} // "en" or "fr"
            setLang={setLang}
            fullNameByLang={{
                en: "English",
                fr: "Français"
            }}
        />
    );

}

languages.forEach(lang =>
    addLanguageSelectTranslations({
        lang: lang,
        messages: {
            "select language": (() => {
                switch (lang) {
                    case "en": return "Select language";
                    /* spell-checker: disable */
                    case "fr": return "Choisir la langue";
                    /* spell-checker: enable */
                }
            })()
        }
    })
);
\`\`\`



`,
    "disabledProps": ["lang"]
});

export default { ...meta, title: "components/LanguageSelect" };

export const SimpleHeader = getStory({});

const brandTop = (
    <>
        INTITULE
        <br />
        OFFICIEL
    </>
);

const homeLinkProps = {
    "href": "#",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
};

type Language = "fr" | "en";

function LanguageSelect(props: { id?: string }) {
    const { id } = props;

    const [lang, setLang] = useState<Language>("en");

    return (
        <LanguageSelect_base
            id={id}
            supportedLangs={["fr", "en"]}
            fullNameByLang={{
                "fr": "Français",
                "en": "English"
            }}
            lang={lang}
            setLang={setLang}
        />
    );
}

function Story() {
    return (
        <Header
            className="margin-bottom-50px"
            brandTop={brandTop}
            homeLinkProps={homeLinkProps}
            quickAccessItems={[<LanguageSelect />]}
        />
    );
}
