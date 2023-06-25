import type { FinalityConsent } from "./types";
import type { GdprConsentCallback, ProcessConsentChanges } from "./processConsentChanges";
export type UseGdpr<Finality extends string> = (params?: {
    consentCallback: GdprConsentCallback<Finality>;
}) => {
    finalityConsent: FinalityConsent<Finality> | undefined;
    assumeConsent: (finality: Finality) => void;
};
export declare function createUseGdpr<Finality extends string>(params: {
    useFinalityConsent: () => FinalityConsent<Finality> | undefined;
    processConsentChanges: ProcessConsentChanges<Finality>;
    useConsentCallback: (params: {
        consentCallback: GdprConsentCallback<Finality> | undefined;
    }) => void;
}): {
    useGdpr: UseGdpr<Finality>;
};
