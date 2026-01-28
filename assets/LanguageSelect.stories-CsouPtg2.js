import{r as m,c as L,R as e,f as r,s as S}from"./iframe-DCkbD6Ro.js";import{a as E,H as h}from"./Header-CwGYAvDm.js";import{g as x}from"./getStory-JVSS1Wer.js";/* empty css              */import"./preload-helper-PPVm8Dsz.js";import"./generateValidHtmlId-Bu5zDHjN.js";import"./Modal-aFyFqFph.js";import"./Button-DMub5GVd.js";import"./brandTopAndHomeLinkProps-OUsIpWwg.js";import"./SearchButton-BS3Oea2P.js";function i(s){const{supportedLangs:o,fullNameByLang:c,lang:t,setLang:d}=s,g=(function(){var n;const f=m.useId();return(n=s.id)!==null&&n!==void 0?n:`language-select-${f}`})(),u=`dropdown-menu-${g}`,{t:p}=b();return e.createElement(E,{id:g,className:"language-select",quickAccessItem:{buttonProps:{"aria-controls":u,"aria-expanded":!1,title:p("select language"),className:r.cx("fr-btn--tertiary","fr-translate","fr-nav")},iconId:"fr-icon-translate-2",text:e.createElement(e.Fragment,null,e.createElement("div",null," ",e.createElement("span",{className:"short-label"},t),e.createElement("span",{className:r.cx("fr-hidden-lg")}," ","-",c[t])," "),e.createElement("div",{className:r.cx("fr-collapse","fr-menu"),id:u},e.createElement("ul",{className:r.cx("fr-menu__list")},o.map(a=>e.createElement("li",{key:a},e.createElement("a",{className:r.cx("fr-translate__language","fr-nav__link"),href:"#","aria-current":a===t?"true":void 0,onClick:n=>{n.preventDefault(),d(a)}},e.createElement("span",{className:"short-label"},a)," - ",c[a]))))))}})}const{useTranslation:b,addLanguageSelectTranslations:N}=L({componentName:S({LanguageSelect:i}),frMessages:{"select language":"Sélectionner la langue"}});N({lang:"en",messages:{"select language":"Select language"}});const{meta:y,getStory:H}=x({wrappedComponent:{LanguageSelect:T},description:`
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



`,disabledProps:["lang"]}),R={...y,title:"components/LanguageSelect"},l=H({}),v=e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),I={href:"#",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"};function k(s){const{id:o}=s,[c,t]=m.useState("en");return e.createElement(i,{id:o,supportedLangs:["fr","en"],fullNameByLang:{fr:"Français",en:"English"},lang:c,setLang:t})}function T(){return e.createElement(h,{className:"margin-bottom-50px",brandTop:v,homeLinkProps:I,quickAccessItems:[e.createElement(k,null)]})}l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"getStory({})",...l.parameters?.docs?.source}}};const $=["SimpleHeader"];export{l as SimpleHeader,$ as __namedExportsOrder,R as default};
