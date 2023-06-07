import React, { type ReactNode } from "react";
import type { ExtractFinalityFromFinalityDescription, FinalityConsent } from "./types";
import type { RegisteredLinkProps } from "../link";
import type { FooterProps } from "../Footer";
import { getFooterPersonalDataPolicyItem, footerConsentManagementItem } from "./footerItems";
import { Reflect } from "tsafe/Reflect";
import { useGdpr, type UseGdpr } from "./useGdpr";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";
import type { GdprConsentCallback } from "./utils";



export function createGdprApi<FinalityDescription extends
    Record<
        string,
        { title: ReactNode; description?: ReactNode; subFinalities?: Record<string, ReactNode>; }
    >
>(
    params: {
        finalityDescription: ((params: { lang: string; }) => FinalityDescription) | FinalityDescription;
        personalDataPolicyLinkProps?: RegisteredLinkProps;
        callback?: GdprConsentCallback<ExtractFinalityFromFinalityDescription<FinalityDescription>>;
    }
): {
    useGdpr: UseGdpr<ExtractFinalityFromFinalityDescription<FinalityDescription>>
    ConsentBannerAndConsentManagement: (props: { lang: string; }) => ReactNode;
    footerItems: {
        personalDataPolicy: FooterProps.BottomItem.Link;
        consentManagement: FooterProps.BottomItem.Button;
    }
} {

    type Finality = ExtractFinalityFromFinalityDescription<FinalityDescription>;

    const { finalityDescription, personalDataPolicyLinkProps, callback } = params;

    const footerItems = Object.defineProperty({
        "consentManagement": footerConsentManagementItem,
        "personalDataPolicy": Reflect<FooterProps.BottomItem.Link>()
    }, "personalDataPolicy", {
        "enumerable": true,
        "get": (): FooterProps.BottomItem.Link => {
            if (personalDataPolicyLinkProps === undefined) {
                throw new Error([
                    "You should provide a personalDataPolicyLinkProps to createGdprApi if",
                    "you want to add a link to the personal data policy in the footer"
                ].join(" "));
            }
            return getFooterPersonalDataPolicyItem({ personalDataPolicyLinkProps });
        }
    });

    assert(is<UseGdpr<Finality>>(useGdpr));

    return {
        footerItems,
        useGdpr,
        "ConsentBannerAndConsentManagement": null as any
    }

    return null as any;
}



/** pure */
export function getFinalitiesFromFinalityDescription(params: {
    finalityDescription: FinalityDescription;
}): Finality[] {
    const { finalityDescription } = params;

    const finalities: Finality[] = [];

    for (const mainFinality in finalityDescription) {
        const description = finalityDescription[mainFinality];

        const { titleBySubFinality } = description as any;

        if (titleBySubFinality === undefined) {
            finalities.push(mainFinality);
            continue;
        }

        for (const subFinality in titleBySubFinality) {
            finalities.push(`${mainFinality}.${subFinality}`);
        }
    }

    return finalities;
}



/*
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
*/




