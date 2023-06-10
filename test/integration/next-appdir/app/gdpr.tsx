"use client";

import { createGdprApi } from "@codegouvfr/react-dsfr/gdpr";

export const { ConsentBannerAndConsentManagement, useGdpr, FooterConsentManagementItem, FooterPersonalDataPolicyItem } = createGdprApi({
    "finalityDescription": {
        "advertising": {
            "title": "Publicité",
            "description": "Nous utilisons des cookies pour vous proposer des publicités adaptées à vos centres d’intérêts et mesurer leur efficacité."
        },
        "analytics": {
            "title": "Analyse",
            "description": "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu."
        },
        "personalization": {
            "title": "Personnalisation",
            "description": "Nous utilisons des cookies pour vous proposer des contenus adaptés à vos centres d’intérêts."
        },
        "statistics": {
            "title": "Statistiques",
            "description": "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu.",
            "titleBySubFinality": {
                "deviceInfo": "Informations sur votre appareil",
                "traffic": "Informations sur votre navigation",
            }
        }
    },
    "personalDataPolicyLinkProps": {
        "href": "/politique-de-confidentialite",
    }
});




