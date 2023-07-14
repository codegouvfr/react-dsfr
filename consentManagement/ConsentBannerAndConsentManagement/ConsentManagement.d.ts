import { type ReactNode } from "react";
import type { RegisteredLinkProps } from "../../link";
import type { ExtractFinalityFromFinalityDescription, FinalityConsent } from "../types";
import type { ProcessConsentChanges } from "../processConsentChanges";
export declare function createConsentManagement<FinalityDescription extends Record<string, {
    title: ReactNode;
    description?: ReactNode;
    subFinalities?: Record<string, ReactNode>;
}>>(params: {
    personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
    finalityDescription: ((params: {
        lang: string;
    }) => FinalityDescription) | FinalityDescription;
    useFinalityConsent: () => FinalityConsent<ExtractFinalityFromFinalityDescription<FinalityDescription>> | undefined;
    processConsentChanges: ProcessConsentChanges<ExtractFinalityFromFinalityDescription<FinalityDescription>>;
    finalities: ExtractFinalityFromFinalityDescription<FinalityDescription>[];
}): {
    ConsentManagement: () => JSX.Element;
    consentModalButtonProps: {
        id: string;
        "aria-controls": string;
        "data-fr-opened": boolean;
    };
    useIsConsentManagementOpen: () => boolean;
};
