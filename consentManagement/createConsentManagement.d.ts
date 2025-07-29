import { type ReactNode } from "react";
import type { ExtractFinalityFromFinalityDescription, SubFinalityContent } from "./types";
import type { RegisteredLinkProps } from "../link";
import { type ConsentCallback } from "./processConsentChanges";
export declare const defaultLocalStorageKeyPrefix = "@codegouvfr/react-dsfr finalityConsent";
export declare function createConsentManagement<FinalityDescription extends Record<string, {
    title: ReactNode;
    description?: ReactNode;
    subFinalities?: Record<string, SubFinalityContent>;
}>>(params: {
    finalityDescription: ((params: {
        lang: string;
    }) => FinalityDescription) | FinalityDescription;
    consentCallback?: ConsentCallback<ExtractFinalityFromFinalityDescription<FinalityDescription>>;
    /** Optional: If you have a dedicated page that provides comprehensive information about your website's GDPR policies. */
    personalDataPolicyLinkProps?: RegisteredLinkProps;
    localStorageKeyPrefix?: string;
}): {
    useConsent: import("./useConsent").UseConsent<ExtractFinalityFromFinalityDescription<FinalityDescription>>;
    ConsentBannerAndConsentManagement: () => JSX.Element | null;
    FooterConsentManagementItem: () => JSX.Element;
    FooterPersonalDataPolicyItem: () => JSX.Element;
};
/** pure, exported for testing */
export declare function getFinalitiesFromFinalityDescription<FinalityDescription extends Record<string, {
    title: ReactNode;
    description?: ReactNode;
    subFinalities?: Record<string, SubFinalityContent>;
}>>(params: {
    finalityDescription: FinalityDescription;
}): ExtractFinalityFromFinalityDescription<FinalityDescription>[];
