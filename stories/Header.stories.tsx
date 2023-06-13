import React from "react";
import { Header } from "../dist/Header";
import { MainNavigation } from "../dist/MainNavigation";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import placeholder_9x16ImgUrl from "./assets/placeholder.9x16.png";
import placeholder_16x9ImgUrl from "./assets/placeholder.16x9.png";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Header },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Header.tsx)  
  
See also [\\<MainNavigation \\/\\>](https://react-dsfr-components.etalab.studio/?path=/docs/components-mainnavigation)


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
                "To integrate the Dark mode switch head over to the documentation of the [Display component](https://react-dsfr-components.etalab.studio/?path=/docs/components-display)"
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
        "description": `See [\\<Display \\/\\>](https://react-dsfr-components.etalab.studio/?path=/docs/components-display) for instructions on how to integrate the Dark mode switch.  

Note for Next App Router: If you want to have \`quickAccessItems\` client side without having to wrap the whole \`<Header />\` 
component within a \`"use client";\` directive you can use the \`<HeaderQuickAccessItem />\` component as demonstrated 
[here](https://github.com/garronej/react-dsfr-next-appdir-demo/blob/b485bda99d6140e59584d3134ac9e203ae6b2208/app/layout.tsx#L72) and 
[here](https://github.com/garronej/react-dsfr-next-appdir-demo/blob/b485bda99d6140e59584d3134ac9e203ae6b2208/app/LoginHeaderItem.tsx#L1-L24).  
    `
    }
);

export const HeaderWithSearchEngine = getStory({
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
    "renderSearchInput": ({ className, id, name, placeholder, type }) => (
        <input className={className} id={id} name={name} placeholder={placeholder} type={type} />
    )
});

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
        "renderSearchInput": ({ className, id, name, placeholder, type }) => (
            <input
                className={className}
                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
            />
        )
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
        "renderSearchInput": ({ className, id, name, placeholder, type }) => (
            <input
                className={className}
                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
            />
        ),
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
    renderSearchInput={({ className, id, name, placeholder, type }) => 
        <input className={className} id={id} name={name} placeholder={placeholder} type={type} />
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
        "renderSearchInput": ({ className, id, name, placeholder, type }) => (
            <input
                className={className}
                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
            />
        ),
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
