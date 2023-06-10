import { useEffect } from "react";
import { deepCopy } from "../tools/deepCopy";
import type { FinalityConsent } from "./types";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";

export type GdprConsentCallback<Finality extends string> = (params: {
    finalityConsent: FinalityConsent<Finality>;
    finalityConsent_prev: FinalityConsent<Finality> | undefined;
}) => Promise<void> | void;

export type ProcessConsentChanges<Finality extends string> = (
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

export function createProcessConsentChanges<Finality extends string>(params: {
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

    const processConsentChanges: ProcessConsentChanges<Finality> = async params => {
        if (params.type === "grantAll") {
            return processConsentChanges({
                "type": "custom",
                "changes": finalities.map(finality => ({
                    finality,
                    "isConsentGiven": true
                }))
            });
        }

        if (params.type === "denyAll") {
            return processConsentChanges({
                "type": "custom",
                "changes": finalities.map(finality => ({
                    finality,
                    "isConsentGiven": false
                }))
            });
        }

        if (params.type === "no changes but trigger callbacks") {
            const finalityConsent = getFinalityConsent();

            if (finalityConsent === undefined) {
                return;
            }

            await Promise.all(
                callbacks.map(callback =>
                    callback({
                        finalityConsent,
                        "finalityConsent_prev": finalityConsent
                    })
                )
            );

            return;
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

    return { processConsentChanges, useRegisterCallback };
}

/** Pure, exported for testing */
export function createFullDenyFinalityConsent<Finality extends string>(
    finalities: Finality[]
): FinalityConsent<Finality> {
    const finalityConsent: any = {
        "isFullConsent": false
    };

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
    finalityConsent: FinalityConsent<Finality>;
    finality: Finality;
    isConsentGiven: boolean;
}): FinalityConsent<Finality> {
    const { finality, finalityConsent, isConsentGiven } = params;

    const [mainFinality, subFinality] = finality.split(".");

    assert(is<Finality>(mainFinality));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isFullConsent: _1, [mainFinality]: _2, ...restTop } = deepCopy(finalityConsent);

    if (subFinality === undefined) {
        return {
            ...restTop,
            [mainFinality]: isConsentGiven,
            "isFullConsent":
                isConsentGiven &&
                !Object.values(restTop)
                    .map((value: any) => (typeof value === "boolean" ? value : value.isFullConsent))
                    .includes(false)
        } as any;
    }

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isFullConsent: _3,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        [subFinality]: _4,
        ...rest
    } = deepCopy((finalityConsent as any)[mainFinality]);

    const isFullConsentSub =
        isConsentGiven &&
        !Object.keys(rest)
            .map(key => rest[key])
            .includes(false);

    return {
        ...restTop,
        [mainFinality]: {
            ...rest,
            [subFinality]: isConsentGiven,
            "isFullConsent": isFullConsentSub
        },
        "isFullConsent":
            isFullConsentSub &&
            !Object.values(restTop)
                .map((value: any) => (typeof value === "boolean" ? value : value.isFullConsent))
                .includes(false)
    } as any;
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
