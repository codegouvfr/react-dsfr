import { useEffect } from "react";
import { deepCopy } from "../tools/deepCopy";
import type { FinalityConsent } from "./types";
import { assert } from "tsafe/assert";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";

export type GdprConsentCallback<Finality extends string> = (params: {
    finalityConsent: FinalityConsent<Finality>;
    finalityConsent_prev: FinalityConsent<Finality> | undefined;
}) => Promise<void> | void;

export type ProcessBulkConsentChanges<Finality extends string> = (
    params:
        | {
              type: "grantAll" | "denyAll" | "no changes but trigger callbacks";
          }
        | {
              type: "custom";
              changes: {
                  finality: Finality;
                  isConsentGiven: boolean;
              }[];
          }
) => Promise<void>;

export function createProcessBulkConsentChange<Finality extends string>(params: {
    finalities: Finality[];
    getFinalityConsent: () => FinalityConsent<Finality> | undefined;
    setFinalityConsent: (params: { finalityConsent: FinalityConsent<Finality> }) => void;
    callback: GdprConsentCallback<Finality> | undefined;
}) {
    const { finalities, getFinalityConsent, setFinalityConsent, callback } = params;

    const callbacks: GdprConsentCallback<Finality>[] = [];

    if (callback !== undefined) {
        callbacks.push(callback);
    }

    function useRegisterCallback(params: { callback: GdprConsentCallback<Finality> | undefined }) {
        const { callback } = params;

        const onConsentChange_const = useConstCallback<GdprConsentCallback<Finality>>(params =>
            callback?.(params)
        );

        if (!callbacks.includes(onConsentChange_const)) {
            callbacks.push(onConsentChange_const);
        }

        useEffect(
            () => () => {
                callbacks.splice(callbacks.indexOf(onConsentChange_const), 1);
            },
            []
        );
    }

    const processBulkConsentChange: ProcessBulkConsentChanges<Finality> = async params => {
        if (params.type === "grantAll") {
            return processBulkConsentChange({
                "type": "custom",
                "changes": finalities.map(finality => ({
                    finality,
                    "isConsentGiven": true
                }))
            });
        }

        if (params.type === "denyAll") {
            return processBulkConsentChange({
                "type": "custom",
                "changes": finalities.map(finality => ({
                    finality,
                    "isConsentGiven": false
                }))
            });
        }

        if (params.type === "no changes but trigger callbacks") {
        }

        assert(params.type === "custom");

        const { changes } = params;

        const finalityConsent_prev = getFinalityConsent();

        let finalityConsent =
            finalityConsent_prev === undefined
                ? createFullDenyFinalityConsent(finalities)
                : deepCopy(finalityConsent_prev);

        for (const { finality, isConsentGiven } of changes) {
            finalityConsent = updateFinalityConsent({
                "finalityConsent": finalityConsent,
                finality,
                isConsentGiven
            });
        }

        await Promise.all(
            callbacks.map(callback =>
                callback({
                    finalityConsent,
                    finalityConsent_prev
                })
            )
        );

        setFinalityConsent({ finalityConsent });
    };

    return { processBulkConsentChange, useRegisterCallback };
}

/** Pure, exported for testing */
export function createFullDenyFinalityConsent<Finality extends string>(
    finalities: Finality[]
): FinalityConsent<Finality> {
    const finalityConsent: any = {};

    for (const finality of finalities) {
        const [mainFinality, subFinality] = finality.split(".");

        if (subFinality === undefined) {
            finalityConsent[mainFinality] = false;
            continue;
        }

        (finalityConsent[mainFinality] ??= {
            "isFullConsent": false
        })[subFinality] = false;
    }

    return finalityConsent;
}

/** Pure, exported for testing */
export function updateFinalityConsent<Finality extends string>(params: {
    finalityConsent: FinalityConsent<string>;
    finality: Finality;
    isConsentGiven: boolean;
}): FinalityConsent<Finality> {
    const { finality, finalityConsent, isConsentGiven } = params;

    const [mainFinality, subFinality] = finality.split(".");

    if (subFinality === undefined) {
        return {
            ...deepCopy(finalityConsent),
            [mainFinality]: isConsentGiven
        };
    }

    const obj = deepCopy((finalityConsent as any)[mainFinality]);

    return {
        ...deepCopy(finalityConsent),
        [mainFinality]: {
            ...obj,
            [subFinality]: isConsentGiven,
            "isFullConsent":
                isConsentGiven &&
                Object.keys(obj)
                    .filter(key => key !== subFinality && key !== "isFullConsent")
                    .map(key => obj[key])
                    .find(isConsentGiven => !isConsentGiven) === undefined
        }
    };
}

/** Pure, exported for testing */
export function readFinalityConsent<Finality extends string>(params: {
    finalityConsent: FinalityConsent<Finality>;
    finality: Finality;
}): boolean | undefined {
    const { finality, finalityConsent } = params;

    const [mainFinality, subFinality] = finality.split(".");

    if (subFinality === undefined) {
        return (finalityConsent as any)[mainFinality];
    }

    return (finalityConsent as any)[mainFinality][subFinality];
}
