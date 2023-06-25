import type { FinalityConsent } from "./types";
export type GdprConsentCallback<Finality extends string> = (params: {
    finalityConsent: FinalityConsent<Finality>;
    finalityConsent_prev: FinalityConsent<Finality> | undefined;
}) => Promise<void> | void;
export type ProcessConsentChanges<Finality extends string> = (params: {
    type: "grantAll" | "denyAll" | "no changes but trigger consent callbacks";
} | {
    type: "atomic change";
    finality: Finality;
    isConsentGiven: boolean;
} | {
    type: "new finalityConsent explicitly provided";
    finalityConsent: FinalityConsent<Finality>;
}) => Promise<void>;
/** Pure, exported for testing */
export declare function finalityConsentToChanges<Finality extends string>(params: {
    finalityConsent: FinalityConsent<Finality>;
}): {
    finality: Finality;
    isConsentGiven: boolean;
}[];
export declare function createProcessConsentChanges<Finality extends string>(params: {
    finalities: Finality[];
    getFinalityConsent: () => FinalityConsent<Finality> | undefined;
    setFinalityConsent: (params: {
        finalityConsent: FinalityConsent<Finality>;
        prAllConsentCallbacksRun: Promise<void>;
    }) => void;
    consentCallback: GdprConsentCallback<Finality> | undefined;
}): {
    processConsentChanges: ProcessConsentChanges<Finality>;
    useConsentCallback: (params: {
        consentCallback: GdprConsentCallback<Finality> | undefined;
    }) => void;
};
/** Pure, exported for testing */
export declare function createFullDenyFinalityConsent<Finality extends string>(finalities: Finality[]): FinalityConsent<Finality>;
/** Pure, exported for testing */
export declare function updateFinalityConsent<Finality extends string>(params: {
    finalityConsent: FinalityConsent<Finality>;
    finality: Finality;
    isConsentGiven: boolean;
}): FinalityConsent<Finality>;
/** Pure, exported for testing */
export declare function readFinalityConsent<Finality extends string>(params: {
    finalityConsent: FinalityConsent<Finality>;
    finality: Finality;
}): boolean | undefined;
