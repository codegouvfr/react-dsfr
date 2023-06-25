import { useReducer, useEffect } from "react";
import { createUseGdpr } from "./useGdpr";
import { createProcessConsentChanges } from "./processConsentChanges";
import { createStatefulObservable } from "../tools/StatefulObservable";
import { useRerenderOnChange } from "../tools/StatefulObservable/hooks";
import { createConsentBannerAndConsentManagement } from "./ConsentBannerAndConsentManagement";
import { isBrowser } from "../tools/isBrowser";
export const localStorageKey = "@codegouvfr/react-dsfr gdpr finalityConsent";
export function createGdprApi(params) {
    const { finalityDescription, personalDataPolicyLinkProps, consentCallback } = params;
    const $finalityConsent = createStatefulObservable(() => {
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
        "finalityDescription": typeof finalityDescription === "function"
            ? finalityDescription({ "lang": "fr" })
            : finalityDescription
    });
    const { processConsentChanges, useConsentCallback } = createProcessConsentChanges({
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
    const { ConsentBannerAndConsentManagement, FooterConsentManagementItem, FooterPersonalDataPolicyItem } = createConsentBannerAndConsentManagement({
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
export function getFinalitiesFromFinalityDescription(params) {
    const { finalityDescription } = params;
    const finalities = [];
    for (const mainFinality in finalityDescription) {
        const description = finalityDescription[mainFinality];
        const { subFinalities } = description;
        if (subFinalities === undefined) {
            finalities.push(mainFinality);
            continue;
        }
        for (const subFinality in subFinalities) {
            finalities.push(`${mainFinality}.${subFinality}`);
        }
    }
    return finalities;
}
//# sourceMappingURL=createGdprApi.js.map