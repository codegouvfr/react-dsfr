import { useReducer, useEffect, type ReactNode } from "react";
import type { ExtractFinalityFromFinalityDescription } from "./types";
import type { RegisteredLinkProps } from "../link";
import { createUseGdpr } from "./useGdpr";
import { createProcessConsentChanges, type GdprConsentCallback } from "./processConsentChanges";
import { createStatefulObservable } from "../tools/StatefulObservable";
import type { FinalityConsent } from "./types";
import { useRerenderOnChange } from "../tools/StatefulObservable/hooks";
import { createConsentBannerAndConsentManagement } from "./ConsentBannerAndConsentManagement";

export function createGdprApi<
    FinalityDescription extends Record<
        string,
        { title: ReactNode; description?: ReactNode; subFinalities?: Record<string, ReactNode> }
    >
>(params: {
    finalityDescription: ((params: { lang: string }) => FinalityDescription) | FinalityDescription;
    callback?: GdprConsentCallback<ExtractFinalityFromFinalityDescription<FinalityDescription>>;
    /** Optional: If you have a dedicated page that provides comprehensive information about your website's GDPR policies. */
    personalDataPolicyLinkProps?: RegisteredLinkProps;
}) {
    type Finality = ExtractFinalityFromFinalityDescription<FinalityDescription>;

    const { finalityDescription, personalDataPolicyLinkProps, callback } = params;

    const localStorageKey = "@codegouvfr/react-dsfr gdpr finalityConsent";

    const $finalityConsent = createStatefulObservable<FinalityConsent<Finality> | undefined>(() => {
        const serializedFinalityConsent = localStorage.getItem(localStorageKey);

        if (serializedFinalityConsent === null) {
            return undefined;
        }

        return JSON.parse(serializedFinalityConsent);
    });

    $finalityConsent.subscribe(finalityConsent => {
        if( finalityConsent === undefined ){
            return;
        }
        localStorage.setItem(localStorageKey, JSON.stringify(finalityConsent))
    });

    const { processConsentChanges, useRegisterCallback } = createProcessConsentChanges<Finality>({
        callback,
        "finalities": getFinalitiesFromFinalityDescription({
            "finalityDescription":
                typeof finalityDescription === "function"
                    ? finalityDescription({ "lang": "fr" })
                    : finalityDescription
        }),
        "getFinalityConsent": () => $finalityConsent.current,
        "setFinalityConsent": ({ finalityConsent }) => ($finalityConsent.current = finalityConsent)
    });

    function useFinalityConsent() {
        useRerenderOnChange($finalityConsent);

        const [isHydrated, setIsHydrated] = useReducer(() => true, true);

        useEffect(() => {
            setIsHydrated();
        }, []);

        if (!isHydrated) {
            return undefined;
        }

        return $finalityConsent.current;
    }

    const { useGdpr } = createUseGdpr({
        useFinalityConsent,
        processConsentChanges,
        useRegisterCallback
    });

    const {
        ConsentBannerAndConsentManagement,
        FooterConsentManagementItem,
        FooterPersonalDataPolicyItem
    } = createConsentBannerAndConsentManagement({
        finalityDescription,
        personalDataPolicyLinkProps,
        processConsentChanges
    });

    return {
        useGdpr,
        ConsentBannerAndConsentManagement,
        FooterConsentManagementItem,
        FooterPersonalDataPolicyItem
    };
}

/** pure, exported for testing */
export function getFinalitiesFromFinalityDescription<
    FinalityDescription extends Record<
        string,
        { title: ReactNode; description?: ReactNode; subFinalities?: Record<string, ReactNode> }
    >
>(params: {
    finalityDescription: FinalityDescription;
}): ExtractFinalityFromFinalityDescription<FinalityDescription>[] {
    const { finalityDescription } = params;

    type Finality = ExtractFinalityFromFinalityDescription<FinalityDescription>;

    const finalities: Finality[] = [];

    for (const mainFinality in finalityDescription) {
        const description = finalityDescription[mainFinality];

        const { titleBySubFinality } = description as any;

        if (titleBySubFinality === undefined) {
            finalities.push(mainFinality as Finality);
            continue;
        }

        for (const subFinality in titleBySubFinality) {
            finalities.push(`${mainFinality}.${subFinality}` as Finality);
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
