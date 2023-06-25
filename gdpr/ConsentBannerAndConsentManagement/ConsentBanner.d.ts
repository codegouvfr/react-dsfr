import type { RegisteredLinkProps } from "../../link";
import type { ProcessConsentChanges } from "../processConsentChanges";
export declare function createConsentBanner<Finality extends string>(params: {
    personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
    processConsentChanges: ProcessConsentChanges<Finality>;
    consentModalButtonProps: {
        "aria-controls": string;
        "data-fr-opened": boolean;
    };
}): {
    ConsentBanner: () => JSX.Element;
};
