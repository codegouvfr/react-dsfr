import { isBrowser } from "../tools/isBrowser";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import type { FinalityConsent } from "./types";
import type { GdprConsentCallback, ProcessConsentChanges } from "./processConsentChanges";

export type UseGdpr<Finality extends string> = (callback?: GdprConsentCallback<Finality>) => {
    finalityConsent: FinalityConsent<Finality> | undefined;
    assumeConsent: (finality: Finality) => void;
};

export function createUseGdpr<Finality extends string>(params: {
    useFinalityConsent: () => FinalityConsent<Finality> | undefined;
    processConsentChanges: ProcessConsentChanges<Finality>;
    useRegisterCallback: (params: { callback: GdprConsentCallback<Finality> | undefined }) => void;
}): { useGdpr: UseGdpr<Finality> } {
    const { useFinalityConsent, processConsentChanges, useRegisterCallback } = params;

    const useGdprClientSide: UseGdpr<Finality> = callback => {
        useRegisterCallback({ callback });

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

    const useGdprServerSide: UseGdpr<Finality> = () => {
        return {
            "finalityConsent": undefined,
            "assumeConsent": () => {
                throw new Error("Cannot assume consent on the server side");
            }
        };
    };

    const useGdpr = isBrowser ? useGdprClientSide : useGdprServerSide;

    return { useGdpr };
}
