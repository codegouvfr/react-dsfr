import React from "react";
import { Footer, type FooterProps } from "../dist/Footer";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import placeholder_9x16ImgUrl from "./assets/placeholder.9x16.png";
import placeholder_16x9ImgUrl from "./assets/placeholder.16x9.png";
import { setBrandTopAndHomeLinkProps } from "../dist/zz_internal/brandTopAndHomeLinkProps";

setBrandTopAndHomeLinkProps({
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
    }
});

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Footer },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/pied-de-page)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Footer.tsx)`,
    "argTypes": {
        "accessibility": {
            "options": (() => {
                const accessibility = [
                    "non compliant",
                    "partially compliant",
                    "fully compliant"
                ] as const;

                assert<Equals<typeof accessibility[number], FooterProps["accessibility"]>>();

                return accessibility;
            })(),
            "control": { "type": "radio" }
        },
        "websiteMapLinkProps": {
            "control": { "type": null }
        },
        "accessibilityLinkProps": {
            "control": { "type": null }
        },
        "termsLinkProps": {
            "control": { "type": null }
        },
        "bottomItems": {
            "description":
                "To integrate the Dark mode switch head over to the documentation of the [Display component](https://components.react-dsfr.codegouv.studio/?path=/docs/components-display)"
        },
        "license": {
            "description":
                "By default it's Etalab v2. [You can provide a custom React node](#with-custom-license)"
        },
        "linkList": {
            "controls": { "type": null }
        },
        "brandTop": {
            "control": { "type": null },
            "description": `In the example here it's \`<>INTITULE<br />OFFICIEL</>\`
If you are using the DSFR Header (as you should) this prop is optional, 
the \`brandTop\` of the \`<Header />\` will be used.`
        },
        "homeLinkProps": {
            "control": { "type": null },
            "description": `A link to the home, when the user click on the logo he must navigate to the homepage of the website
If you are using the DSFR Header (as you should) this prop is optional, 
the \`homeLinkProps\` of the \`<Header />\` will be used.`
        }
    }
});

export default meta;

export const Default = getStory({
    "accessibility": "fully compliant",
    "contentDescription": `
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    `,
    "websiteMapLinkProps": {
        "href": "#"
    },
    "termsLinkProps": {
        "href": "#"
    }
});

export const FooterWithVerticalOperatorLogo = getStory({
    "accessibility": "fully compliant",
    "contentDescription": `
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    `,
    "operatorLogo": {
        "orientation": "vertical",
        "imgUrl": placeholder_9x16ImgUrl,
        "alt": "[À MODIFIER - texte alternatif de l’image]"
    }
});

export const FooterWithHorizontalOperatorLogo = getStory({
    "accessibility": "fully compliant",
    "contentDescription": `
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    `,
    "operatorLogo": {
        "orientation": "horizontal",
        "imgUrl": placeholder_16x9ImgUrl,
        "alt": "[À MODIFIER - texte alternatif de l’image]"
    }
});

export const WithCustomLicense = getStory({
    "accessibility": "fully compliant",
    "contentDescription": `
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    `,
    "license": (
        <>
            Unless stated otherwise all content of this website are under{" "}
            <a href="https://github.com/codegouvfr/react-dsfr/blob/main/LICENSE" target="_blank">
                licence MIT
            </a>{" "}
        </>
    )
});

export const WithPartners = getStory({
    "accessibility": "fully compliant",
    "contentDescription": `
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    `,
    "partnersLogos": {
        "main": {
            "imgUrl": placeholder_16x9ImgUrl,
            "alt": "[À MODIFIER - texte alternatif de l’image]",
            "linkProps": { "href": "#", "title": "Lien vers le site du partenaire" }
        },
        "sub": [
            {
                "imgUrl": placeholder_16x9ImgUrl,
                "alt": "[À MODIFIER - texte alternatif de l’image]",
                "linkProps": { "href": "#", "title": "Lien vers le site du partenaire" }
            },
            {
                "imgUrl": placeholder_16x9ImgUrl,
                "alt": "[À MODIFIER - texte alternatif de l’image]"
            }
        ]
    }
});

export const WithMainPartnerOnly = getStory({
    "accessibility": "fully compliant",
    "contentDescription": `
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    `,
    "partnersLogos": {
        "main": {
            "href": "#",
            "imgUrl": placeholder_16x9ImgUrl,
            "alt": "[À MODIFIER - texte alternatif de l’image]"
        }
    }
});

export const WithSubPartnersOnly = getStory({
    "accessibility": "fully compliant",
    "contentDescription": `
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    `,
    "partnersLogos": {
        "sub": [
            {
                "href": "#",
                "imgUrl": placeholder_16x9ImgUrl,
                "alt": "[À MODIFIER - texte alternatif de l’image]"
            },
            {
                "href": "#",
                "imgUrl": placeholder_16x9ImgUrl,
                "alt": "[À MODIFIER - texte alternatif de l’image]"
            }
        ]
    }
});

const links = new Array(8).fill({
    text: "Lien de navigation",
    linkProps: { href: "#" }
}) as FooterProps.LinkList.Links;
const linkList = new Array(6).fill({
    categoryName: "Nom de la catégorie",
    links
}) as FooterProps.LinkList.List;

export const WithLinkList = getStory({
    "accessibility": "fully compliant",
    "contentDescription": `
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    `,
    linkList
});
