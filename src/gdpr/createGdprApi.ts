import { useReducer, useEffect, type ReactNode } from "react";
import type { ExtractFinalityFromFinalityDescription } from "./types";
import type { RegisteredLinkProps } from "../link";
import { createUseGdpr } from "./useGdpr";
import { createProcessConsentChanges, type GdprConsentCallback } from "./processConsentChanges";
import { createStatefulObservable } from "../tools/StatefulObservable";
import type { FinalityConsent } from "./types";
import { useRerenderOnChange } from "../tools/StatefulObservable/hooks";
import { createConsentBannerAndConsentManagement } from "./ConsentBannerAndConsentManagement";
import { isBrowser } from "../tools/isBrowser";

export const localStorageKey = "@codegouvfr/react-dsfr gdpr finalityConsent";

export function createGdprApi<
    FinalityDescription extends Record<
        string,
        { title: ReactNode; description?: ReactNode; subFinalities?: Record<string, ReactNode> }
    >
>(params: {
    finalityDescription: ((params: { lang: string }) => FinalityDescription) | FinalityDescription;
    consentCallback?: GdprConsentCallback<
        ExtractFinalityFromFinalityDescription<FinalityDescription>
    >;
    /** Optional: If you have a dedicated page that provides comprehensive information about your website's GDPR policies. */
    personalDataPolicyLinkProps?: RegisteredLinkProps;
}) {
    type Finality = ExtractFinalityFromFinalityDescription<FinalityDescription>;

    const { finalityDescription, personalDataPolicyLinkProps, consentCallback } = params;

    const $finalityConsent = createStatefulObservable<FinalityConsent<Finality> | undefined>(() => {
        if (!isBrowser) {
            return undefined;
        }

        const serializedFinalityConsent = localStorage.getItem(localStorageKey);

        if (serializedFinalityConsent === null) {
            return undefined;
        }

        return JSON.parse(serializedFinalityConsent);
    });

    const finalities = getFinalitiesFromFinalityDescription({
        "finalityDescription":
            typeof finalityDescription === "function"
                ? finalityDescription({ "lang": "fr" })
                : finalityDescription
    });

    const { processConsentChanges, useConsentCallback } = createProcessConsentChanges<Finality>({
        consentCallback,
        finalities,
        "getFinalityConsent": () => $finalityConsent.current,
        "setFinalityConsent": ({ finalityConsent, prAllConsentCallbacksRun }) => {
            localStorage.setItem(localStorageKey, JSON.stringify(finalityConsent));

            prAllConsentCallbacksRun.then(() => ($finalityConsent.current = finalityConsent));
        }
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
        useConsentCallback
    });

    const {
        ConsentBannerAndConsentManagement,
        FooterConsentManagementItem,
        FooterPersonalDataPolicyItem
    } = createConsentBannerAndConsentManagement({
        finalityDescription,
        personalDataPolicyLinkProps,
        processConsentChanges,
        useFinalityConsent,
        finalities
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

        const { subFinalities } = description as any;

        if (subFinalities === undefined) {
            finalities.push(mainFinality as Finality);
            continue;
        }

        for (const subFinality in subFinalities) {
            finalities.push(`${mainFinality}.${subFinality}` as Finality);
        }
    }

    return finalities;
}
