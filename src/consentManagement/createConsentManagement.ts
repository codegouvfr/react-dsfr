import { useReducer, useEffect, type ReactNode } from "react";
import type { ExtractFinalityFromFinalityDescription } from "./types";
import type { RegisteredLinkProps } from "../link";
import { createUseConsent } from "./useConsent";
import { createProcessConsentChanges, type ConsentCallback } from "./processConsentChanges";
import { createStatefulObservable } from "../tools/StatefulObservable";
import type { FinalityConsent } from "./types";
import { useRerenderOnChange } from "../tools/StatefulObservable/hooks";
import { createConsentBannerAndConsentManagement } from "./ConsentBannerAndConsentManagement";
import { isBrowser } from "../tools/isBrowser";

export const defaultLocalStorageKeyPrefix = "@codegouvfr/react-dsfr finalityConsent";

export function createConsentManagement<
    FinalityDescription extends Record<
        string,
        { title: ReactNode; description?: ReactNode; subFinalities?: Record<string, ReactNode> }
    >
>(params: {
    finalityDescription: ((params: { lang: string }) => FinalityDescription) | FinalityDescription;
    consentCallback?: ConsentCallback<ExtractFinalityFromFinalityDescription<FinalityDescription>>;
    /** Optional: If you have a dedicated page that provides comprehensive information about your website's GDPR policies. */
    personalDataPolicyLinkProps?: RegisteredLinkProps;
    localStorageKeyPrefix?: string;
}) {
    type Finality = ExtractFinalityFromFinalityDescription<FinalityDescription>;

    const {
        finalityDescription,
        personalDataPolicyLinkProps,
        consentCallback,
        localStorageKeyPrefix
    } = params;

    const finalities = getFinalitiesFromFinalityDescription({
        "finalityDescription":
            typeof finalityDescription === "function"
                ? finalityDescription({ "lang": "fr" })
                : finalityDescription
    });

    const localStorageKey = `${
        localStorageKeyPrefix ?? defaultLocalStorageKeyPrefix
    } ${finalities.join("-")}`;

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

    const { useConsent } = createUseConsent({
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
        useConsent,
        ConsentBannerAndConsentManagement,
        FooterConsentManagementItem,
        FooterPersonalDataPolicyItem,
        consentLocalStorageKey: localStorageKey
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
