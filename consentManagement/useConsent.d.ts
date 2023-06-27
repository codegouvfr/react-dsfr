import type { FinalityConsent } from "./types";
import type { ConsentCallback, ProcessConsentChanges } from "./processConsentChanges";
export type UseConsent<Finality extends string> = (params?: {
    consentCallback: ConsentCallback<Finality>;
}) => {
    finalityConsent: FinalityConsent<Finality> | undefined;
    assumeConsent: (finality: Finality) => void;
};
export declare function createUseConsent<Finality extends string>(params: {
    useFinalityConsent: () => FinalityConsent<Finality> | undefined;
    processConsentChanges: ProcessConsentChanges<Finality>;
    useConsentCallback: (params: {
        consentCallback: ConsentCallback<Finality> | undefined;
    }) => void;
}): {
    useConsent: UseConsent<Finality>;
};
