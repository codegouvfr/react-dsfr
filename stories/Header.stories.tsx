import React from "react";
import { Header } from "../dist/Header";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Header },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Header/Header.tsx)`,
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
    "navItems": [
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

export const HeaderWithQuickAccessItems = getStory({
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
    ]
});

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

export const HeaderWithQuickAccessItemsAndSearchEngine = getStory({
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
        <input className={className} id={id} name={name} placeholder={placeholder} type={type} />
    )
});
