import { isBrowser } from "../tools/isBrowser";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import type { FinalityConsent } from "./types";
import type { ConsentCallback, ProcessConsentChanges } from "./processConsentChanges";

export type UseConsent<Finality extends string> = (params?: {
    consentCallback: ConsentCallback<Finality>;
}) => {
    finalityConsent: FinalityConsent<Finality> | undefined;
    assumeConsent: (finality: Finality) => void;
};

export function createUseConsent<Finality extends string>(params: {
    useFinalityConsent: () => FinalityConsent<Finality> | undefined;
    processConsentChanges: ProcessConsentChanges<Finality>;
    useConsentCallback: (params: {
        consentCallback: ConsentCallback<Finality> | undefined;
    }) => void;
}): { useConsent: UseConsent<Finality> } {
    const { useFinalityConsent, processConsentChanges, useConsentCallback } = params;

    const useConsentManagementClientSide: UseConsent<Finality> = params => {
        const { consentCallback } = params ?? {};

        useConsentCallback({ consentCallback });

        const finalityConsent = useFinalityConsent();

        const assumeConsent = useConstCallback((finality: Finality) =>
            processConsentChanges({
                "type": "atomic change",
                finality,
                "isConsentGiven": true
            })
        );

        return {
            assumeConsent,
            finalityConsent
        };
    };

    const useConsentManagementServerSide: UseConsent<Finality> = () => {
        return {
            "finalityConsent": undefined,
            "assumeConsent": () => {
                throw new Error("Cannot assume consent on the server side");
            }
        };
    };

    const useConsent = isBrowser ? useConsentManagementClientSide : useConsentManagementServerSide;

    return { useConsent };
}
