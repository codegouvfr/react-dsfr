"use client";

import { isBrowser } from "../tools/isBrowser";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import { assert } from "tsafe/assert";
import { getProcessBulkConsentChange, useOnConsentChange } from "./utils";
import { modal } from "./modal";
import { useFinalityConsent } from "./signal";
import type { FinalityToFinalityConsent } from "./types";

export type UseGdpr<Finality extends string> = (params: {
    callback?: (params: {
        finalityConsent: FinalityToFinalityConsent<Finality>;
        finalityConsent_prev: FinalityToFinalityConsent<Finality> | undefined;
    }) => Promise<void> | void;
}) => {
    finalityConsent: FinalityToFinalityConsent<Finality> | undefined;
    assumeConsent: (finality: Finality) => void;
};

type Finality = string;

const useGdprClientSide: UseGdpr<Finality> = params => {
    const { callback } = params ?? {};

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

const useGdprServerSide: UseGdpr<Finality> = () => {
    return {
        "finalityConsent": undefined,
        "assumeConsent": () => {
            throw new Error("Cannot assume consent on server side");
        }
    };
};

export const useGdpr = isBrowser ? useGdprClientSide : useGdprServerSide;