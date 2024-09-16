"use client";

import { createConsentManagement } from "@codegouvfr/react-dsfr/consentManagement";

export const { 
    ConsentBannerAndConsentManagement, 
    FooterConsentManagementItem, 
    FooterPersonalDataPolicyItem,
    useConsent,
    consentLocalStorageKey
} = createConsentManagement({
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
        "to": "/politique-de-confidentialite",
    },
    "consentCallback": async ({ finalityConsent, finalityConsent_prev })=> {

        if( finalityConsent_prev === undefined && !finalityConsent.isFullConsent ){
            location.reload();
            await new Promise(()=> {/*never*/});
        }

        console.log("callback from gdpr hook");
    },
    "localStorageKeyPrefix": "company-name/app-name finalityConsent"
});
