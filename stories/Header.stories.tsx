import React, { useState } from "react";
import { Header } from "../dist/Header";
import { Badge } from "../dist/Badge";
import { MainNavigation } from "../dist/MainNavigation";

import { getStoryFactory } from "./getStory";
import { GlobalStyles } from "tss-react";
import placeholder_9x16ImgUrl from "./assets/placeholder.9x16.png";
import placeholder_16x9ImgUrl from "./assets/placeholder.16x9.png";

const { meta, getStory } = getStoryFactory({
    "wrappedComponent": { Header },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Header/Header.tsx)  
  
See also [\\<MainNavigation \\/\\>](https://components.react-dsfr.codegouv.studio/?path=/docs/components-mainnavigation)  
  
*NOTE*: On small screens (mobile), you can click on the burger menu to open the menu modal.
You can watch if the menu modal is open or not with the \`useIsHeaderMenuModalOpen\` hook.  

\`\`\`tsx  

import { useIsHeaderMenuModalOpen } from "@codegouvfr/react-dsfr/Header/useIsHeaderMenuModalOpen";

const isOpen = useIsHeaderMenuModalOpen();

\`\`\`  

`,
    "argTypes": {
        "brandTop": {
            "control": false,
            "description": "In the example here it's `<>INTITULE<br />OFFICIEL</>`"
        },
        "homeLinkProps": {
            "control": false,
            "description":
                "A link to the home, when the user click on the logo he must navigate to the homepage of the website"
        },
        "navigation": {
            "description":
                "Note that navigation can be an array or a custom react node, see [navigation-as-custom-node](#navigation-as-custom-node)."
        },
        "quickAccessItems": {
            "description":
                "To integrate the Dark mode switch head over to the documentation of the [Display component](https://components.react-dsfr.codegouv.studio/?path=/docs/components-display)"
        },
        "onSearchButtonClick": {
            "description":
                "Optional, callback called when the user click on the search button or press enter",
            "control": false
        },
        "clearSearchInputOnSearch": {
            "description":
                "Default: false, if true the search input value will be cleared when the user click on the search button or press enter",
            "control": { "type": "boolean" }
        },
        "allowEmptySearch": {
            "description":
                "Default: false, if true the user will be able to search with an empty input, otherwise clicking ont the search button or pressing enter will focus the input",
            "control": { "type": "boolean" }
        }
    },
    "disabledProps": ["lang"]
});

export default { ...meta, title: "components/Header" };

export const SimpleHeader = getStory({
    "id": "fr-header-simple-header",
    "brandTop": (
        <>
            INTITULE
            <br />
            OFFICIEL
        </>
    ),
    "homeLinkProps": {
        "href": "/",
        "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
    },
    "navigation": [
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            }
        },
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            },
            "isActive": true
        },
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            }
        },
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            }
        }
    ],
    "onSearchButtonClick": undefined
});

export const SimpleHeaderWithServiceTitleAndTagline = getStory({
    "id": "fr-header-simple-header-with-service-title-and-tagline",
    "brandTop": (
        <>
            INTITULE
            <br />
            OFFICIEL
        </>
    ),
    "homeLinkProps": {
        "href": "/",
        "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
    },
    "serviceTitle": "Nom du site / service",
    "serviceTagline": "baseline - précisions sur l'organisation",
    "onSearchButtonClick": undefined
});

export const SimpleHeaderWithServiceTitleAndBetaBadge = getStory({
    "id": "fr-header-simple-header-with-service-title-and-tagline",
    "brandTop": (
        <>
            INTITULE
            <br />
            OFFICIEL
        </>
    ),
    "homeLinkProps": {
        "href": "/",
        "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
    },
    "serviceTitle": (
        <>
            Nom du site / service{" "}
            <Badge noIcon severity="success" as="span">
                Beta
            </Badge>
        </>
    ),
    "onSearchButtonClick": undefined
});

export const HeaderWithQuickAccessItems = getStory(
    {
        "id": "fr-header-header-with-quick-access-items",
        "brandTop": (
            <>
                INTITULE
                <br />
                OFFICIEL
            </>
        ),
        "homeLinkProps": {
            "href": "/",
            "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
        },
        "serviceTitle": "Nom du site / service",
        "serviceTagline": "baseline - précisions sur l'organisation",
        "quickAccessItems": [
            {
                "iconId": "fr-icon-add-circle-line",
                "text": "Créer un espace",
                "linkProps": {
                    "href": "#"
                }
            },
            {
                "iconId": "fr-icon-mail-fill",
                "linkProps": {
                    "href": "mailto:floss@numerique.gouv.fr"
                },
                "text": "Contact us"
            },
            {
                "iconId": "ri-account-box-line",
                "text": "Se connecter",
                "buttonProps": {
                    "onClick": () => {
                        alert("TODO: implement login");
                    }
                }
            }
        ],
        "onSearchButtonClick": undefined
    },
    {
        "description": `Let's see an example usage of quick access items in the Header component.  

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

`
    }
);

export const WithUncontrolledSearchBar = getStory(
    {
        "id": "fr-header-with-uncontrolled-search-bar",
        "brandTop": (
            <>
                INTITULE
                <br />
                OFFICIEL
            </>
        ),
        "homeLinkProps": {
            "href": "/",
            "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
        },
        "serviceTitle": "Nom du site / service",
        "serviceTagline": "baseline - précisions sur l'organisation",
        "onSearchButtonClick": text => alert(`TODO: implement search with text: ${text}`),
        "clearSearchInputOnSearch": true,
        "allowEmptySearch": true
    },
    {
        "description": `

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

`
    }
);

type MySearchInputProps = {
    className?: string;
    id: string;
    placeholder: string;
    type: "search";
};

function MySearchInput(props: MySearchInputProps) {
    const { className, id, placeholder, type } = props;

    const [search, onSearchChange] = useState("");
    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);

    return (
        <>
            <GlobalStyles
                styles={{
                    ".fr-container": {
                        "overflow": "visible"
                    }
                }}
            />
            <input
                ref={setInputElement}
                className={className}
                id={id}
                placeholder={placeholder}
                type={type}
                value={search}
                onChange={event => onSearchChange(event.currentTarget.value)}
                onKeyDown={event => {
                    if (event.key === "Escape") {
                        onSearchChange("");
                        inputElement?.blur();
                    }
                }}
            />
            <p
                style={{
                    "position": "absolute",
                    "top": 81,
                    "left": 0
                }}
            >
                Search results for: {search}
            </p>
        </>
    );
}

export const WithControlledSearchBar = getStory(
    {
        "id": "fr-header-with-controlled-search-bar",
        "brandTop": (
            <>
                INTITULE
                <br />
                OFFICIEL
            </>
        ),
        "homeLinkProps": {
            "href": "/",
            "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
        },
        "serviceTitle": "Nom du site / service",
        "serviceTagline": "baseline - précisions sur l'organisation",
        "renderSearchInput": ({ className, id, placeholder, type }) => (
            <MySearchInput className={className} id={id} placeholder={placeholder} type={type} />
        )
    },
    {
        "description": `


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

`
    }
);

export const HeaderWithQuickAccessItemsNavItemsAndSearchEngine = getStory(
    {
        "id": "fr-header-header-with-quick-access-items-nav-items-and-search-engine",
        "brandTop": (
            <>
                INTITULE
                <br />
                OFFICIEL
            </>
        ),
        "homeLinkProps": {
            "href": "/",
            "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
        },
        "serviceTitle": "Nom du site / service",
        "serviceTagline": "baseline - précisions sur l'organisation",
        "quickAccessItems": [
            {
                "iconId": "fr-icon-add-circle-line",
                "text": "Créer un espace",
                "linkProps": {
                    "href": "#"
                }
            },
            {
                "iconId": "fr-icon-lock-line",
                "text": "Se connecter",
                "linkProps": {
                    "href": "#"
                }
            },
            {
                "iconId": "fr-icon-account-line",
                "text": "S’enregistrer",
                "linkProps": {
                    "href": "#"
                }
            }
        ],
        "navigation": [
            {
                "text": "accès direct",
                "linkProps": {
                    "href": "#",
                    "target": "_self"
                }
            },
            {
                "text": "accès direct",
                "linkProps": {
                    "href": "#",
                    "target": "_self"
                },
                "isActive": true
            },
            {
                "text": "accès direct",
                "linkProps": {
                    "href": "#",
                    "target": "_self"
                }
            },
            {
                "text": "accès direct",
                "linkProps": {
                    "href": "#",
                    "target": "_self"
                }
            }
        ],
        "onSearchButtonClick": text => alert(`TODO: implement search with text: ${text}`)
    },
    {
        "description": `

\`\`\`tsx

<Header
    //...
    renderSearchInput={({ className, id, name, placeholder, type }) => 
        <input className={className} id={id} name={name} placeholder={placeholder} type={type} />
    }
/>
        
\`\`\`
    
    `
    }
);

export const HeaderWithVerticalOperatorLogo = getStory({
    "id": "fr-header-header-with-vertical-operator-logo",
    "brandTop": (
        <>
            INTITULE
            <br />
            OFFICIEL
        </>
    ),
    "homeLinkProps": {
        "href": "/",
        "title":
            "Accueil - [À MODIFIER - texte alternatif de l’image : nom de l'opérateur ou du site serviciel] - République Française"
    },
    "onSearchButtonClick": text => alert(`TODO: implement search with text: ${text}`),
    "operatorLogo": {
        "orientation": "vertical",
        "imgUrl": placeholder_9x16ImgUrl,
        "alt": "[À MODIFIER - texte alternatif de l’image]"
    }
});

export const WithHorizontalOperatorLogo = getStory({
    "id": "fr-header-with-horizontal-operator-logo",
    "brandTop": (
        <>
            INTITULE
            <br />
            OFFICIEL
        </>
    ),
    "homeLinkProps": {
        "href": "/",
        "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
    },
    "serviceTitle": "Nom du site / service",
    "serviceTagline": "baseline - précisions sur l'organisation",
    "quickAccessItems": [
        {
            "iconId": "fr-icon-add-circle-line",
            "text": "Créer un espace",
            "linkProps": {
                "href": "#"
            }
        },
        {
            "iconId": "fr-icon-lock-line",
            "text": "Se connecter",
            "linkProps": {
                "href": "#"
            }
        },
        {
            "iconId": "fr-icon-account-line",
            "text": "S’enregistrer",
            "linkProps": {
                "href": "#"
            }
        }
    ],
    "onSearchButtonClick": text => alert(`TODO: implement search with text: ${text}`),
    "operatorLogo": {
        "orientation": "horizontal",
        "imgUrl": placeholder_16x9ImgUrl,
        "alt": "[À MODIFIER - texte alternatif de l’image]"
    }
});

export const WithOperatorLogoWithLink = getStory({
    "id": "fr-header-with-operator-logo-with-link",
    "brandTop": (
        <>
            INTITULE
            <br />
            OFFICIEL
        </>
    ),
    "homeLinkProps": {
        "href": "/",
        "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
    },
    "serviceTitle": "Nom du site / service",
    "serviceTagline": "baseline - précisions sur l'organisation",
    "quickAccessItems": [
        {
            "iconId": "fr-icon-add-circle-line",
            "text": "Créer un espace",
            "linkProps": {
                "href": "#"
            }
        },
        {
            "iconId": "fr-icon-lock-line",
            "text": "Se connecter",
            "linkProps": {
                "href": "#"
            }
        },
        {
            "iconId": "fr-icon-account-line",
            "text": "S’enregistrer",
            "linkProps": {
                "href": "#"
            }
        }
    ],
    "onSearchButtonClick": text => alert(`TODO: implement search with text: ${text}`),
    "operatorLogo": {
        "orientation": "horizontal",
        "imgUrl": placeholder_16x9ImgUrl,
        "alt": "[À MODIFIER - texte alternatif de l’image]",
        "linkProps": {
            "href": "#",
            "title":
                "Accueil - [À MODIFIER - texte alternatif de l’image : nom de l'opérateur ou du site serviciel] - République Française"
        }
    }
});

export const NavigationAsCustomNode = getStory(
    {
        "id": "fr-header-navigation-as-custom-node",
        "brandTop": (
            <>
                INTITULE
                <br />
                OFFICIEL
            </>
        ),
        "homeLinkProps": {
            "href": "/",
            "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
        },
        "navigation": (
            <MainNavigation
                items={[
                    {
                        "text": "accès direct",
                        "linkProps": {
                            "href": "#",
                            "target": "_self"
                        }
                    },
                    {
                        "text": "accès direct",
                        "linkProps": {
                            "href": "#",
                            "target": "_self"
                        },
                        "isActive": true
                    },
                    {
                        "text": "accès direct",
                        "linkProps": {
                            "href": "#",
                            "target": "_self"
                        }
                    },
                    {
                        "text": "accès direct",
                        "linkProps": {
                            "href": "#",
                            "target": "_self"
                        }
                    }
                ]}
            />
        )
    },
    {
        "description": `You can provide a custom \`ReactNode\` as \`navigation\` prop.  
    It is useful to keep the Header as a server component in Next 13 AppDir.  

\`\`\`tsx
        
import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";  
        
\`\`\`

    `
    }
);
