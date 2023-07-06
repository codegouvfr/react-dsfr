import React, { useState } from "react";
import { Header } from "../dist/Header";
import { MainNavigation } from "../dist/MainNavigation";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { GlobalStyles } from "tss-react";
import placeholder_9x16ImgUrl from "./assets/placeholder.9x16.png";
import placeholder_16x9ImgUrl from "./assets/placeholder.16x9.png";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Header },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Header.tsx)  
  
See also [\\<MainNavigation \\/\\>](https://components.react-dsfr.fr/?path=/docs/components-mainnavigation)  
  
*NOTE*: On small screens (mobile), you can click on the burger menu to open the menu modal.
You can watch if the menu modal is open or not with the \`useIsHeaderMenuModalOpen\` hook.  

\`\`\`tsx  

import { useIsHeaderMenuModalOpen } from "@codegouvfr/react-dsfr/Header/useIsHeaderMenuModalOpen";

const isOpen = useIsHeaderMenuModalOpen();

\`\`\`  

`,
    "argTypes": {
        "brandTop": {
            "control": { "type": null },
            "description": "In the example here it's `<>INTITULE<br />OFFICIEL</>`"
        },
        "homeLinkProps": {
            "control": { "type": null },
            "description":
                "A link to the home, when the user click on the logo he must navigate to the homepage of the website"
        },
        "navigation": {
            "description":
                "Note that navigation can be an array or a custom react node, see [navigation-as-custom-node](#navigation-as-custom-node)."
        },
        "quickAccessItems": {
            "description":
                "To integrate the Dark mode switch head over to the documentation of the [Display component](https://components.react-dsfr.fr/?path=/docs/components-display)"
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const SimpleHeader = getStory({
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
    ]
});

export const SimpleHeaderWithServiceTitleAndTagline = getStory({
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
    "serviceTagline": "baseline - précisions sur l'organisation"
});

export const HeaderWithQuickAccessItems = getStory(
    {
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
                    "href": "mailto:contact@code.gouv.fr"
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
        ]
    },
    {
        "description": `See [\\<Display \\/\\>](https://components.react-dsfr.fr/?path=/docs/components-display) for instructions on how to integrate the Dark mode switch.  

Note for Next App Router: If you want to have \`quickAccessItems\` client side without having to wrap the whole \`<Header />\` 
component within a \`"use client";\` directive you can use the \`<HeaderQuickAccessItem />\` component as demonstrated 
[here](https://github.com/garronej/react-dsfr-next-appdir-demo/blob/b485bda99d6140e59584d3134ac9e203ae6b2208/app/layout.tsx#L72) and 
[here](https://github.com/garronej/react-dsfr-next-appdir-demo/blob/b485bda99d6140e59584d3134ac9e203ae6b2208/app/LoginHeaderItem.tsx#L1-L24).  
    `
    }
);

export const WithUncontrolledSearchBar = getStory(
    {
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
        "onSearchButtonClick": text => alert(`TODO: implement search with text: ${text}`)
    },
    {
        "description": `

If you you do not plan to provide any realtime hinting to the user as he types the search query you can provide a \`onSearchButtonClick\`
callback that will be called when the user click on the search button or press enter.

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
If you go with MUI make sure to use the [\`<MuiDsfrProvider />\`](https://react-dsfr.etalab.studio/mui).  

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

export const HeaderWithVerticalOperatorLogo = getStory(
    {
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
    },

    {
        "description": `

\`\`\`tsx

<Header
    //...
    renderSearchInput={({ className, id, placeholder, type }) => 
        <input className={className} id={id} placeholder={placeholder} type={type} />
    }
/>
        
\`\`\`
    
    `
    }
);

export const WithHorizontalOperatorLogo = getStory(
    {
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

export const NavigationAsCustomNode = getStory(
    {
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
