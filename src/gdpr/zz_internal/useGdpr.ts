import { isBrowser } from "../../tools/isBrowser";
import { useConstCallback } from "../../tools/powerhooks/useConstCallback";
import { assert } from "tsafe/assert";
import { getProcessBulkConsentChange, useOnConsentChange } from "./utils";
import { modal } from "./modal";
import { useFinalityConsent } from "./signal";
import type { Finality, FinalityConsent } from "./types";
import type { OnConsentChange } from "./utils";

type UseGdpr = (params?: { onConsentChange?: OnConsentChange }) => {
    finalityConsent: FinalityConsent | undefined;
    assumeConsent: (finality: Finality) => Promise<void>;
};

const useGdprClientSide: UseGdpr = params => {
    const { onConsentChange } = params ?? {};

    const { finalityConsent } = useFinalityConsent();

    useOnConsentChange({ onConsentChange });

    const assumeConsent = useConstCallback(async (finality: Finality) => {
        if (finalityConsent === undefined) {
            modal.open();
            return;
        }

        const { processBulkConsentChange } = getProcessBulkConsentChange();

        assert(
            processBulkConsentChange !== undefined,
            "ConsentBanner must be mounted before calling assumeConsent"
        );

        await processBulkConsentChange({
            "type": "custom",
            "changes": [
                {
                    finality,
                    "isConsentGiven": true
                }
            ]
        });
    });

    return {
        assumeConsent,
        finalityConsent
    };
};

const useGdprServerSide: UseGdpr = () => {
    return {
        "finalityConsent": undefined,
        "assumeConsent": () => {
            throw new Error("Cannot assume consent on server side");
        }
    };
};

export const useGdpr = isBrowser ? useGdprClientSide : useGdprServerSide;
