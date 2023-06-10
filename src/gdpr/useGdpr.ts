import { isBrowser } from "../tools/isBrowser";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import type { FinalityConsent } from "./types";
import type { GdprConsentCallback, ProcessBulkConsentChanges } from "./utils";

export type UseGdpr<Finality extends string> = (params: {
    callback?: GdprConsentCallback<Finality>;
}) => {
    finalityConsent: FinalityConsent<Finality> | undefined;
    assumeConsent: (finality: Finality) => void;
};

export function createUseGdpr<Finality extends string>(params: {
    useFinalityConsent: () => FinalityConsent<Finality> | undefined;
    processBulkConsentChanges: ProcessBulkConsentChanges<Finality>;
    useRegisterCallback: (params: { callback: GdprConsentCallback<Finality> | undefined }) => void;
}): { useGdpr: UseGdpr<Finality> } {
    const { useFinalityConsent, processBulkConsentChanges, useRegisterCallback } = params;

    const useGdprClientSide: UseGdpr<Finality> = params => {
        const { callback } = params ?? {};

        useRegisterCallback({ callback });

        const finalityConsent = useFinalityConsent();

        const assumeConsent = useConstCallback((finality: Finality) =>
            processBulkConsentChanges({
                "type": "custom",
                "changes": [
                    {
                        finality,
                        "isConsentGiven": true
                    }
                ]
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
                throw new Error("Cannot assume consent on server side");
            }
        };
    };

    const useGdpr = isBrowser ? useGdprClientSide : useGdprServerSide;

    return { useGdpr };
}
