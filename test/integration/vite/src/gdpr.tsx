"use client";

import { createGdprApi } from "@codegouvfr/react-dsfr/gdpr";

export const { 
    ConsentBannerAndConsentManagement, 
    useGdpr, 
    FooterConsentManagementItem, 
    FooterPersonalDataPolicyItem 
} = createGdprApi({
    "finalityDescription": ({ lang }) => ({
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
            "subFinalities": {
                "deviceInfo": "Informations sur votre appareil",
                "traffic": "Informations sur votre navigation",
            }
        }
    }),
    "personalDataPolicyLinkProps": {
        "to": "#",
        "onClick": ()=> {
            alert("Navigate or display your data policy");
        }
    },
    "consentCallback": async ({ finalityConsent, finalityConsent_prev })=> {
        console.log("callback from gdpr hook", { finalityConsent, finalityConsent_prev });
    }
});




