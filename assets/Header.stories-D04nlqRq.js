import{R as e,r as y}from"./iframe-DCkbD6Ro.js";import{H as E,M as N}from"./Header-CwGYAvDm.js";import{B as w}from"./Badge-Cbie0W8K.js";import{g as A}from"./getStory-JVSS1Wer.js";import"./index-D20S1PIo.js";import{p as L,a as x}from"./placeholder.16x9-CJQzyDdj.js";import{G as P,c as O}from"./emotion-react.browser.esm-CVkFjoh8.js";import"./preload-helper-PPVm8Dsz.js";import"./generateValidHtmlId-Bu5zDHjN.js";import"./Modal-aFyFqFph.js";import"./Button-DMub5GVd.js";import"./brandTopAndHomeLinkProps-OUsIpWwg.js";import"./SearchButton-BS3Oea2P.js";import"./emotion-serialize.browser.esm-B2PIuRZ_.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-Bh5soZz2.js";function C(t){const{styles:r}=t;return e.createElement(P,{styles:O(r)})}const{meta:F,getStory:n}=A({wrappedComponent:{Header:E},description:`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Header/Header.tsx)  
  
See also [\\<MainNavigation \\/\\>](https://components.react-dsfr.codegouv.studio/?path=/docs/components-mainnavigation)  
  
*NOTE*: On small screens (mobile), you can click on the burger menu to open the menu modal.
You can watch if the menu modal is open or not with the \`useIsHeaderMenuModalOpen\` hook.  

\`\`\`tsx  

import { useIsHeaderMenuModalOpen } from "@codegouvfr/react-dsfr/Header/useIsHeaderMenuModalOpen";

const isOpen = useIsHeaderMenuModalOpen();

\`\`\`  

`,argTypes:{brandTop:{control:!1,description:"In the example here it's `<>INTITULE<br />OFFICIEL</>`"},homeLinkProps:{control:!1,description:"A link to the home, when the user click on the logo he must navigate to the homepage of the website"},navigation:{description:"Note that navigation can be an array or a custom react node, see [navigation-as-custom-node](#navigation-as-custom-node)."},quickAccessItems:{description:"To integrate the Dark mode switch head over to the documentation of the [Display component](https://components.react-dsfr.codegouv.studio/?path=/docs/components-display)"},onSearchButtonClick:{description:"Optional, callback called when the user click on the search button or press enter",control:!1},clearSearchInputOnSearch:{description:"Default: false, if true the search input value will be cleared when the user click on the search button or press enter",control:{type:"boolean"}},allowEmptySearch:{description:"Default: false, if true the user will be able to search with an empty input, otherwise clicking ont the search button or pressing enter will focus the input",control:{type:"boolean"}}},disabledProps:["lang"]}),G={...F,title:"components/Header"},o=n({id:"fr-header-simple-header",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},navigation:[{text:"accès direct",linkProps:{href:"#",target:"_self"}},{text:"accès direct",linkProps:{href:"#",target:"_self"},isActive:!0},{text:"accès direct",linkProps:{href:"#",target:"_self"}},{text:"accès direct",linkProps:{href:"#",target:"_self"}}],onSearchButtonClick:void 0}),i=n({id:"fr-header-simple-header-with-service-title-and-tagline",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},serviceTitle:"Nom du site / service",serviceTagline:"baseline - précisions sur l'organisation",onSearchButtonClick:void 0}),a=n({id:"fr-header-simple-header-with-service-title-and-tagline",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},serviceTitle:e.createElement(e.Fragment,null,"Nom du site / service"," ",e.createElement(w,{noIcon:!0,severity:"success",as:"span"},"Beta")),onSearchButtonClick:void 0}),s=n({id:"fr-header-header-with-quick-access-items",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},serviceTitle:"Nom du site / service",serviceTagline:"baseline - précisions sur l'organisation",quickAccessItems:[{iconId:"fr-icon-add-circle-line",text:"Créer un espace",linkProps:{href:"#"}},{iconId:"fr-icon-mail-fill",linkProps:{href:"mailto:floss@numerique.gouv.fr"},text:"Contact us"},{iconId:"ri-account-box-line",text:"Se connecter",buttonProps:{onClick:()=>{alert("TODO: implement login")}}}],onSearchButtonClick:void 0},{description:`Let's see an example usage of quick access items in the Header component.  

\`src/Header.tsx\`  

\`\`\`tsx  

import { Header as DsfrHeader } from "@codegouvfr/react-dsfr/Header";
import { LanguageSelect } from "./LanguageSelect";
import { AuthButtons } from "./AuthButtons";

export function Header() {

    return (
        <DsfrHeader
            quickAccessItems={[
                {
                    iconId: "fr-icon-add-circle-line",
                    text: "Créer un espace",
                    linkProps: {
                        "href": "#" // Link to a page
                    }
                },
                {
                    iconId: "fr-icon-mail-fill",
                    linkProps: {
                        href: "mailto:floss@numerique.gouv.fr"
                    },
                    text: "Contact us"
                },
                <LanguageSelect />, // See "LanguageSelect" component of this website
                headerFooterDisplayItem, // See "Display" component of this website
                <AuthButtons /> // See below

            ]}
        />
    );

}

\`\`\`  

If you need to create a dynamic Header quick action items there is how you can do it.  
Let's see an example with the \`AuthButton\` component.
In this example we assume the use of [oidc-spa](https://oidc-spa.dev/) for authentication.
And [i18nifty](for internationalization).
You can see this component live [here](https://vite-insee-starter.demo-domain.ovh/).  

\`src/AuthButton.tsx\`  

\`\`\`tsx  

import { HeaderQuickAccessItem } from "@codegouvfr/react-dsfr/Header";
import { declareComponentKeys, useTranslation } from "i18n"; // i18nifty
import { useOidc } from "oidc"; // oidc-spa

type Props = {
    // NOTE: If you component assigns id you must use the one passed as prop.
    // If you have multiple id you must prefix them to differentiate them.
    // In this example we don't actually need to set ids but I do is so you can see how to do it.  
    // See this example where it's more relevant: 
    id?: string;
};

export function AuthButtons(props: Props) {

    const { id } = props;

    const { isUserLoggedIn, login, logout } = useOidc();

    const { t } = useTranslation("AuthButtons");

    if (!isUserLoggedIn) {
        return (
            <>
                <HeaderQuickAccessItem
                    id={\`login-\${id}\`}
                    quickAccessItem={{
                        iconId: "fr-icon-lock-line",
                        buttonProps: {
                            onClick: () => login({ doesCurrentHrefRequiresAuth: false })
                        },
                        text: t("login")
                    }}
                />
                <HeaderQuickAccessItem
                    id={\`register-\${id}\`}
                    quickAccessItem={{
                        iconId: "ri-id-card-line",
                        buttonProps: {
                            onClick: () => login({ 
                                doesCurrentHrefRequiresAuth: false,
                                transformUrlBeforeRedirect: url => {
                                    const urlObj = new URL(url);

                                    urlObj.pathname = urlObj.pathname.replace(
                                        /\\/auth$/,
                                        "/registrations"
                                    );

                                    return urlObj.href;
                                }
                            })
                        },
                        text: t("register")
                    }}
                />
            </>
        );
    }

    return (
        <>
            <HeaderQuickAccessItem
                id={\`account-\${id}\`}
                quickAccessItem={{
                    iconId: "fr-icon-account-fill",
                    linkProps: {
                        to: "/account"
                    },
                    text: t("my account")
                }}
            />
            <HeaderQuickAccessItem
                id={\`logout-\${id}\`}
                quickAccessItem={{
                    iconId: "ri-logout-box-line",
                    buttonProps: {
                        onClick: () =>
                            logout({
                                redirectTo: "home"
                            })
                    },
                    text: t("logout")
                }}
            />
        </>
    );

}

const { i18n } = declareComponentKeys<
    | "login"
    | "register"
    | "logout"
    | "my account"
>()("AuthButtons");

export type I18n = typeof i18n;
\`\`\`  

`}),c=n({id:"fr-header-with-uncontrolled-search-bar",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},serviceTitle:"Nom du site / service",serviceTagline:"baseline - précisions sur l'organisation",onSearchButtonClick:t=>alert(`TODO: implement search with text: ${t}`),clearSearchInputOnSearch:!0,allowEmptySearch:!0},{description:`

If you you do not plan to provide any realtime hinting to the user as he types the search query you can provide a \`onSearchButtonClick\`
callback that will be called when the user click on the search button or press enter.

You can also have a use the \`clearSearchInputOnSearch\` and \`allowEmptySearch\` props to control the behavior of the search input.  

> NOTE: There is a bug in the DSFR that prevent te input to be cleared when the user press the escape key.  
We hope it will be fixed soon.

\`\`\`tsx

<Header
    ...
    onSearchButtonClick={text=> alert(\`TODO: implement search with text: \${text}\`)}
/>
\`\`\`

`});function H(t){const{className:r,id:f,placeholder:g,type:S}=t,[v,k]=y.useState(""),[b,T]=y.useState(null);return e.createElement(e.Fragment,null,e.createElement(C,{styles:{".fr-container":{overflow:"visible"}}}),e.createElement("input",{ref:T,className:r,id:f,placeholder:g,type:S,value:v,onChange:I=>k(I.currentTarget.value),onKeyDown:I=>{I.key==="Escape"&&(k(""),b?.blur())}}),e.createElement("p",{style:{position:"absolute",top:81,left:0}},"Search results for: ",v))}const l=n({id:"fr-header-with-controlled-search-bar",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},serviceTitle:"Nom du site / service",serviceTagline:"baseline - précisions sur l'organisation",renderSearchInput:({className:t,id:r,placeholder:f,type:g})=>e.createElement(H,{className:t,id:r,placeholder:f,type:g})},{description:`


\`\`\`tsx
function Root(){

    const [search, onSearchChange] = useState("");

    return (
        <>
            <Header
                ...
                renderSearchInput={({ className, id, placeholder, type }) => {
                    const [inputElement, setInputElement] =
                        useState<HTMLInputElement | null>(null);

                    return (
                        <input
                            ref={setInputElement}
                            className={className}
                            id={id}
                            placeholder={placeholder}
                            type={type}
                            value={search}
                            // Note: The default behavior for an input of type 'text' is to clear the input value when the escape key is pressed.
                            // However, due to a bug in @gouvfr/dsfr the escape key event is not propagated to the input element.
                            // As a result this onChange is not called when the escape key is pressed.
                            onChange={event => onSearchChange(event.currentTarget.value)}
                            // Same goes for the keydown event so this is useless but we hope the bug will be fixed soon.
                            onKeyDown={event => {
                                if (event.key === "Escape") {
                                    assert(inputElement !== null);
                                    inputElement.blur();
                                }
                            }}
                        />
                    );
                }}
                ...
            />
            <p>Search results for: {search}</p>
        </>

    );

}
\`\`\`

If you want to feature a modern search experience with realtime hinting you can omit providing a \`onSearchButtonClick\` callback and instead
make sure you provide an overlay with the search results in the the \`renderSearchInput\` function.  

As, to this day, the DSFR do not provide any component to help you with that, you are on your own for implementing the overlay.  
You can achieve great result by using [MUI's autocomplete](https://mui.com/material-ui/react-autocomplete/) component.  
[Video demo](https://youtu.be/AT3CvmY_Y7M?t=64).  
If you go with MUI make sure to use the [\`<MuiDsfrProvider />\`](https://react-dsfr.codegouv.studio/mui).  

\`\`\`tsx

import Autocomplete from "@mui/material/Autocomplete";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

type MySearchInputProps = {
    className?: string;
    id: string;
    placeholder: string;
    type: "search;
};

function MySearchInput(props: MySearchInputProps) {

    const { className, id, placeholder, type } = props;

    return (
        <Autocomplete 
            ...
            renderInput={params => 
                <div ref={params.InputProps.ref}>
                    <input 
                        {...params.inputProps} 
                        className={cx(params.inputProps.className, className)}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                    />
                </div>
            }
        />
    );

}

<Header
    ...
    renderSearchInput={({ className, id, placeholder, type }) => (
        <MySearchInput
            className={className}
            id={id}
            placeholder={placeholder}
            type={type}
        />
    )}
/>
\`\`\`

`}),u=n({id:"fr-header-header-with-quick-access-items-nav-items-and-search-engine",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},serviceTitle:"Nom du site / service",serviceTagline:"baseline - précisions sur l'organisation",quickAccessItems:[{iconId:"fr-icon-add-circle-line",text:"Créer un espace",linkProps:{href:"#"}},{iconId:"fr-icon-lock-line",text:"Se connecter",linkProps:{href:"#"}},{iconId:"fr-icon-account-line",text:"S’enregistrer",linkProps:{href:"#"}}],navigation:[{text:"accès direct",linkProps:{href:"#",target:"_self"}},{text:"accès direct",linkProps:{href:"#",target:"_self"},isActive:!0},{text:"accès direct",linkProps:{href:"#",target:"_self"}},{text:"accès direct",linkProps:{href:"#",target:"_self"}}],onSearchButtonClick:t=>alert(`TODO: implement search with text: ${t}`)},{description:`

\`\`\`tsx

<Header
    //...
    renderSearchInput={({ className, id, name, placeholder, type }) => 
        <input className={className} id={id} name={name} placeholder={placeholder} type={type} />
    }
/>
        
\`\`\`
    
    `}),d=n({id:"fr-header-header-with-vertical-operator-logo",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - [À MODIFIER - texte alternatif de l’image : nom de l'opérateur ou du site serviciel] - République Française"},onSearchButtonClick:t=>alert(`TODO: implement search with text: ${t}`),operatorLogo:{orientation:"vertical",imgUrl:L,alt:"[À MODIFIER - texte alternatif de l’image]"}}),p=n({id:"fr-header-with-horizontal-operator-logo",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},serviceTitle:"Nom du site / service",serviceTagline:"baseline - précisions sur l'organisation",quickAccessItems:[{iconId:"fr-icon-add-circle-line",text:"Créer un espace",linkProps:{href:"#"}},{iconId:"fr-icon-lock-line",text:"Se connecter",linkProps:{href:"#"}},{iconId:"fr-icon-account-line",text:"S’enregistrer",linkProps:{href:"#"}}],onSearchButtonClick:t=>alert(`TODO: implement search with text: ${t}`),operatorLogo:{orientation:"horizontal",imgUrl:x,alt:"[À MODIFIER - texte alternatif de l’image]"}}),m=n({id:"fr-header-with-operator-logo-with-link",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},serviceTitle:"Nom du site / service",serviceTagline:"baseline - précisions sur l'organisation",quickAccessItems:[{iconId:"fr-icon-add-circle-line",text:"Créer un espace",linkProps:{href:"#"}},{iconId:"fr-icon-lock-line",text:"Se connecter",linkProps:{href:"#"}},{iconId:"fr-icon-account-line",text:"S’enregistrer",linkProps:{href:"#"}}],onSearchButtonClick:t=>alert(`TODO: implement search with text: ${t}`),operatorLogo:{orientation:"horizontal",imgUrl:x,alt:"[À MODIFIER - texte alternatif de l’image]",linkProps:{href:"#",title:"Accueil - [À MODIFIER - texte alternatif de l’image : nom de l'opérateur ou du site serviciel] - République Française"}}}),h=n({id:"fr-header-navigation-as-custom-node",brandTop:e.createElement(e.Fragment,null,"INTITULE",e.createElement("br",null),"OFFICIEL"),homeLinkProps:{href:"/",title:"Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"},navigation:e.createElement(N,{items:[{text:"accès direct",linkProps:{href:"#",target:"_self"}},{text:"accès direct",linkProps:{href:"#",target:"_self"},isActive:!0},{text:"accès direct",linkProps:{href:"#",target:"_self"}},{text:"accès direct",linkProps:{href:"#",target:"_self"}}]})},{description:'You can provide a custom `ReactNode` as `navigation` prop.  \n    It is useful to keep the Header as a server component in Next 13 AppDir.  \n\n```tsx\n        \nimport { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";  \n        \n```\n\n    '});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-simple-header",
  "brandTop": <>
            INTITULE
            <br />
            OFFICIEL
        </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
  },
  "navigation": [{
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    }
  }, {
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    },
    "isActive": true
  }, {
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    }
  }, {
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    }
  }],
  "onSearchButtonClick": undefined
})`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-simple-header-with-service-title-and-tagline",
  "brandTop": <>
            INTITULE
            <br />
            OFFICIEL
        </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
  },
  "serviceTitle": "Nom du site / service",
  "serviceTagline": "baseline - précisions sur l'organisation",
  "onSearchButtonClick": undefined
})`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-simple-header-with-service-title-and-tagline",
  "brandTop": <>
            INTITULE
            <br />
            OFFICIEL
        </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
  },
  "serviceTitle": <>
            Nom du site / service{" "}
            <Badge noIcon severity="success" as="span">
                Beta
            </Badge>
        </>,
  "onSearchButtonClick": undefined
})`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-header-with-quick-access-items",
  "brandTop": <>
                INTITULE
                <br />
                OFFICIEL
            </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
  },
  "serviceTitle": "Nom du site / service",
  "serviceTagline": "baseline - précisions sur l'organisation",
  "quickAccessItems": [{
    "iconId": "fr-icon-add-circle-line",
    "text": "Créer un espace",
    "linkProps": {
      "href": "#"
    }
  }, {
    "iconId": "fr-icon-mail-fill",
    "linkProps": {
      "href": "mailto:floss@numerique.gouv.fr"
    },
    "text": "Contact us"
  }, {
    "iconId": "ri-account-box-line",
    "text": "Se connecter",
    "buttonProps": {
      "onClick": () => {
        alert("TODO: implement login");
      }
    }
  }],
  "onSearchButtonClick": undefined
}, {
  "description": \`Let's see an example usage of quick access items in the Header component.  

\\\`src/Header.tsx\\\`  

\\\`\\\`\\\`tsx  

import { Header as DsfrHeader } from "@codegouvfr/react-dsfr/Header";
import { LanguageSelect } from "./LanguageSelect";
import { AuthButtons } from "./AuthButtons";

export function Header() {

    return (
        <DsfrHeader
            quickAccessItems={[
                {
                    iconId: "fr-icon-add-circle-line",
                    text: "Créer un espace",
                    linkProps: {
                        "href": "#" // Link to a page
                    }
                },
                {
                    iconId: "fr-icon-mail-fill",
                    linkProps: {
                        href: "mailto:floss@numerique.gouv.fr"
                    },
                    text: "Contact us"
                },
                <LanguageSelect />, // See "LanguageSelect" component of this website
                headerFooterDisplayItem, // See "Display" component of this website
                <AuthButtons /> // See below

            ]}
        />
    );

}

\\\`\\\`\\\`  

If you need to create a dynamic Header quick action items there is how you can do it.  
Let's see an example with the \\\`AuthButton\\\` component.
In this example we assume the use of [oidc-spa](https://oidc-spa.dev/) for authentication.
And [i18nifty](for internationalization).
You can see this component live [here](https://vite-insee-starter.demo-domain.ovh/).  

\\\`src/AuthButton.tsx\\\`  

\\\`\\\`\\\`tsx  

import { HeaderQuickAccessItem } from "@codegouvfr/react-dsfr/Header";
import { declareComponentKeys, useTranslation } from "i18n"; // i18nifty
import { useOidc } from "oidc"; // oidc-spa

type Props = {
    // NOTE: If you component assigns id you must use the one passed as prop.
    // If you have multiple id you must prefix them to differentiate them.
    // In this example we don't actually need to set ids but I do is so you can see how to do it.  
    // See this example where it's more relevant: 
    id?: string;
};

export function AuthButtons(props: Props) {

    const { id } = props;

    const { isUserLoggedIn, login, logout } = useOidc();

    const { t } = useTranslation("AuthButtons");

    if (!isUserLoggedIn) {
        return (
            <>
                <HeaderQuickAccessItem
                    id={\\\`login-\\\${id}\\\`}
                    quickAccessItem={{
                        iconId: "fr-icon-lock-line",
                        buttonProps: {
                            onClick: () => login({ doesCurrentHrefRequiresAuth: false })
                        },
                        text: t("login")
                    }}
                />
                <HeaderQuickAccessItem
                    id={\\\`register-\\\${id}\\\`}
                    quickAccessItem={{
                        iconId: "ri-id-card-line",
                        buttonProps: {
                            onClick: () => login({ 
                                doesCurrentHrefRequiresAuth: false,
                                transformUrlBeforeRedirect: url => {
                                    const urlObj = new URL(url);

                                    urlObj.pathname = urlObj.pathname.replace(
                                        /\\\\/auth$/,
                                        "/registrations"
                                    );

                                    return urlObj.href;
                                }
                            })
                        },
                        text: t("register")
                    }}
                />
            </>
        );
    }

    return (
        <>
            <HeaderQuickAccessItem
                id={\\\`account-\\\${id}\\\`}
                quickAccessItem={{
                    iconId: "fr-icon-account-fill",
                    linkProps: {
                        to: "/account"
                    },
                    text: t("my account")
                }}
            />
            <HeaderQuickAccessItem
                id={\\\`logout-\\\${id}\\\`}
                quickAccessItem={{
                    iconId: "ri-logout-box-line",
                    buttonProps: {
                        onClick: () =>
                            logout({
                                redirectTo: "home"
                            })
                    },
                    text: t("logout")
                }}
            />
        </>
    );

}

const { i18n } = declareComponentKeys<
    | "login"
    | "register"
    | "logout"
    | "my account"
>()("AuthButtons");

export type I18n = typeof i18n;
\\\`\\\`\\\`  

\`
})`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-with-uncontrolled-search-bar",
  "brandTop": <>
                INTITULE
                <br />
                OFFICIEL
            </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
  },
  "serviceTitle": "Nom du site / service",
  "serviceTagline": "baseline - précisions sur l'organisation",
  "onSearchButtonClick": text => alert(\`TODO: implement search with text: \${text}\`),
  "clearSearchInputOnSearch": true,
  "allowEmptySearch": true
}, {
  "description": \`

If you you do not plan to provide any realtime hinting to the user as he types the search query you can provide a \\\`onSearchButtonClick\\\`
callback that will be called when the user click on the search button or press enter.

You can also have a use the \\\`clearSearchInputOnSearch\\\` and \\\`allowEmptySearch\\\` props to control the behavior of the search input.  

> NOTE: There is a bug in the DSFR that prevent te input to be cleared when the user press the escape key.  
We hope it will be fixed soon.

\\\`\\\`\\\`tsx

<Header
    ...
    onSearchButtonClick={text=> alert(\\\`TODO: implement search with text: \\\${text}\\\`)}
/>
\\\`\\\`\\\`

\`
})`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-with-controlled-search-bar",
  "brandTop": <>
                INTITULE
                <br />
                OFFICIEL
            </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
  },
  "serviceTitle": "Nom du site / service",
  "serviceTagline": "baseline - précisions sur l'organisation",
  "renderSearchInput": ({
    className,
    id,
    placeholder,
    type
  }) => <MySearchInput className={className} id={id} placeholder={placeholder} type={type} />
}, {
  "description": \`


\\\`\\\`\\\`tsx
function Root(){

    const [search, onSearchChange] = useState("");

    return (
        <>
            <Header
                ...
                renderSearchInput={({ className, id, placeholder, type }) => {
                    const [inputElement, setInputElement] =
                        useState<HTMLInputElement | null>(null);

                    return (
                        <input
                            ref={setInputElement}
                            className={className}
                            id={id}
                            placeholder={placeholder}
                            type={type}
                            value={search}
                            // Note: The default behavior for an input of type 'text' is to clear the input value when the escape key is pressed.
                            // However, due to a bug in @gouvfr/dsfr the escape key event is not propagated to the input element.
                            // As a result this onChange is not called when the escape key is pressed.
                            onChange={event => onSearchChange(event.currentTarget.value)}
                            // Same goes for the keydown event so this is useless but we hope the bug will be fixed soon.
                            onKeyDown={event => {
                                if (event.key === "Escape") {
                                    assert(inputElement !== null);
                                    inputElement.blur();
                                }
                            }}
                        />
                    );
                }}
                ...
            />
            <p>Search results for: {search}</p>
        </>

    );

}
\\\`\\\`\\\`

If you want to feature a modern search experience with realtime hinting you can omit providing a \\\`onSearchButtonClick\\\` callback and instead
make sure you provide an overlay with the search results in the the \\\`renderSearchInput\\\` function.  

As, to this day, the DSFR do not provide any component to help you with that, you are on your own for implementing the overlay.  
You can achieve great result by using [MUI's autocomplete](https://mui.com/material-ui/react-autocomplete/) component.  
[Video demo](https://youtu.be/AT3CvmY_Y7M?t=64).  
If you go with MUI make sure to use the [\\\`<MuiDsfrProvider />\\\`](https://react-dsfr.codegouv.studio/mui).  

\\\`\\\`\\\`tsx

import Autocomplete from "@mui/material/Autocomplete";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

type MySearchInputProps = {
    className?: string;
    id: string;
    placeholder: string;
    type: "search;
};

function MySearchInput(props: MySearchInputProps) {

    const { className, id, placeholder, type } = props;

    return (
        <Autocomplete 
            ...
            renderInput={params => 
                <div ref={params.InputProps.ref}>
                    <input 
                        {...params.inputProps} 
                        className={cx(params.inputProps.className, className)}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                    />
                </div>
            }
        />
    );

}

<Header
    ...
    renderSearchInput={({ className, id, placeholder, type }) => (
        <MySearchInput
            className={className}
            id={id}
            placeholder={placeholder}
            type={type}
        />
    )}
/>
\\\`\\\`\\\`

\`
})`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-header-with-quick-access-items-nav-items-and-search-engine",
  "brandTop": <>
                INTITULE
                <br />
                OFFICIEL
            </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
  },
  "serviceTitle": "Nom du site / service",
  "serviceTagline": "baseline - précisions sur l'organisation",
  "quickAccessItems": [{
    "iconId": "fr-icon-add-circle-line",
    "text": "Créer un espace",
    "linkProps": {
      "href": "#"
    }
  }, {
    "iconId": "fr-icon-lock-line",
    "text": "Se connecter",
    "linkProps": {
      "href": "#"
    }
  }, {
    "iconId": "fr-icon-account-line",
    "text": "S’enregistrer",
    "linkProps": {
      "href": "#"
    }
  }],
  "navigation": [{
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    }
  }, {
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    },
    "isActive": true
  }, {
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    }
  }, {
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    }
  }],
  "onSearchButtonClick": text => alert(\`TODO: implement search with text: \${text}\`)
}, {
  "description": \`

\\\`\\\`\\\`tsx

<Header
    //...
    renderSearchInput={({ className, id, name, placeholder, type }) => 
        <input className={className} id={id} name={name} placeholder={placeholder} type={type} />
    }
/>
        
\\\`\\\`\\\`
    
    \`
})`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-header-with-vertical-operator-logo",
  "brandTop": <>
            INTITULE
            <br />
            OFFICIEL
        </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - [À MODIFIER - texte alternatif de l’image : nom de l'opérateur ou du site serviciel] - République Française"
  },
  "onSearchButtonClick": text => alert(\`TODO: implement search with text: \${text}\`),
  "operatorLogo": {
    "orientation": "vertical",
    "imgUrl": placeholder_9x16ImgUrl,
    "alt": "[À MODIFIER - texte alternatif de l’image]"
  }
})`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-with-horizontal-operator-logo",
  "brandTop": <>
            INTITULE
            <br />
            OFFICIEL
        </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
  },
  "serviceTitle": "Nom du site / service",
  "serviceTagline": "baseline - précisions sur l'organisation",
  "quickAccessItems": [{
    "iconId": "fr-icon-add-circle-line",
    "text": "Créer un espace",
    "linkProps": {
      "href": "#"
    }
  }, {
    "iconId": "fr-icon-lock-line",
    "text": "Se connecter",
    "linkProps": {
      "href": "#"
    }
  }, {
    "iconId": "fr-icon-account-line",
    "text": "S’enregistrer",
    "linkProps": {
      "href": "#"
    }
  }],
  "onSearchButtonClick": text => alert(\`TODO: implement search with text: \${text}\`),
  "operatorLogo": {
    "orientation": "horizontal",
    "imgUrl": placeholder_16x9ImgUrl,
    "alt": "[À MODIFIER - texte alternatif de l’image]"
  }
})`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-with-operator-logo-with-link",
  "brandTop": <>
            INTITULE
            <br />
            OFFICIEL
        </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
  },
  "serviceTitle": "Nom du site / service",
  "serviceTagline": "baseline - précisions sur l'organisation",
  "quickAccessItems": [{
    "iconId": "fr-icon-add-circle-line",
    "text": "Créer un espace",
    "linkProps": {
      "href": "#"
    }
  }, {
    "iconId": "fr-icon-lock-line",
    "text": "Se connecter",
    "linkProps": {
      "href": "#"
    }
  }, {
    "iconId": "fr-icon-account-line",
    "text": "S’enregistrer",
    "linkProps": {
      "href": "#"
    }
  }],
  "onSearchButtonClick": text => alert(\`TODO: implement search with text: \${text}\`),
  "operatorLogo": {
    "orientation": "horizontal",
    "imgUrl": placeholder_16x9ImgUrl,
    "alt": "[À MODIFIER - texte alternatif de l’image]",
    "linkProps": {
      "href": "#",
      "title": "Accueil - [À MODIFIER - texte alternatif de l’image : nom de l'opérateur ou du site serviciel] - République Française"
    }
  }
})`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`getStory({
  "id": "fr-header-navigation-as-custom-node",
  "brandTop": <>
                INTITULE
                <br />
                OFFICIEL
            </>,
  "homeLinkProps": {
    "href": "/",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
  },
  "navigation": <MainNavigation items={[{
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    }
  }, {
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    },
    "isActive": true
  }, {
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    }
  }, {
    "text": "accès direct",
    "linkProps": {
      "href": "#",
      "target": "_self"
    }
  }]} />
}, {
  "description": \`You can provide a custom \\\`ReactNode\\\` as \\\`navigation\\\` prop.  
    It is useful to keep the Header as a server component in Next 13 AppDir.  

\\\`\\\`\\\`tsx
        
import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";  
        
\\\`\\\`\\\`

    \`
})`,...h.parameters?.docs?.source}}};const J=["SimpleHeader","SimpleHeaderWithServiceTitleAndTagline","SimpleHeaderWithServiceTitleAndBetaBadge","HeaderWithQuickAccessItems","WithUncontrolledSearchBar","WithControlledSearchBar","HeaderWithQuickAccessItemsNavItemsAndSearchEngine","HeaderWithVerticalOperatorLogo","WithHorizontalOperatorLogo","WithOperatorLogoWithLink","NavigationAsCustomNode"];export{s as HeaderWithQuickAccessItems,u as HeaderWithQuickAccessItemsNavItemsAndSearchEngine,d as HeaderWithVerticalOperatorLogo,h as NavigationAsCustomNode,o as SimpleHeader,a as SimpleHeaderWithServiceTitleAndBetaBadge,i as SimpleHeaderWithServiceTitleAndTagline,l as WithControlledSearchBar,p as WithHorizontalOperatorLogo,m as WithOperatorLogoWithLink,c as WithUncontrolledSearchBar,J as __namedExportsOrder,G as default};
