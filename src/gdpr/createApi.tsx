import React, { type ReactNode } from "react";
import type { ExtractFinalityFromFinalityDescription, FinalityToFinalityConsent } from "./types";


export function createGdprApi<FinalityDescription extends
    Record<
        string,
        { title: ReactNode; description?: ReactNode; subFinalities?: Record<string, ReactNode>; }
    >
>(
    params: {
        finalityDescription: ((params: { lang: string; })=> FinalityDescription) | FinalityDescription;
    }
): {
    useGdpr: UseGdpr<ExtractFinalityFromFinalityDescription<FinalityDescription>>
    ConsentBannerAndConsentManagement: (props: { lang: string; })=> ReactNode;

} {


    return null as any;
}

export type UseGdpr<Finality extends string> = (params: {
    callback?: (params: { 
        finalityConsent: FinalityToFinalityConsent<Finality>;
        finalityConsent_prev: FinalityToFinalityConsent<Finality> | undefined;
    })=> Promise<void> | void;
}) => {
    finalityConsent: FinalityToFinalityConsent<Finality>;
    assumeConsent: (finality: Finality) => void;
};




const { finalityConsent } = createGdprApi({
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
    })
});




