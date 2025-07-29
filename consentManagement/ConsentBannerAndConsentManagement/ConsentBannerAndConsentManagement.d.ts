import { type ReactNode } from "react";
import type { RegisteredLinkProps } from "../../link";
import type { ExtractFinalityFromFinalityDescription, FinalityConsent, SubFinalityContent } from "../types";
import type { ProcessConsentChanges } from "../processConsentChanges";
export declare function createConsentBannerAndConsentManagement<FinalityDescription extends Record<string, {
    title: ReactNode;
    description?: ReactNode;
    subFinalities?: Record<string, SubFinalityContent>;
}>>(params: {
    finalityDescription: ((params: {
        lang: string;
    }) => FinalityDescription) | FinalityDescription;
    useFinalityConsent: () => FinalityConsent<ExtractFinalityFromFinalityDescription<FinalityDescription>> | undefined;
    processConsentChanges: ProcessConsentChanges<ExtractFinalityFromFinalityDescription<FinalityDescription>>;
    personalDataPolicyLinkProps?: RegisteredLinkProps;
    finalities: ExtractFinalityFromFinalityDescription<FinalityDescription>[];
}): {
    ConsentBannerAndConsentManagement: () => JSX.Element | null;
    FooterConsentManagementItem: () => JSX.Element;
    FooterPersonalDataPolicyItem: () => JSX.Element;
};
