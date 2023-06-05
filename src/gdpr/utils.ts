import { useEffect } from "react";
import { deepCopy } from "../../tools/deepCopy";
import type { Finality, FinalityConsent, FinalityDescription } from "./types";
import { assert } from "tsafe/assert";
import { useConstCallback } from "../../tools/powerhooks/useConstCallback";

export type OnConsentChange = (params: {
    finality: Finality;
    isConsentGiven: boolean;
    isConsentGiven_prev: boolean | undefined;
}) => Promise<void> | void;

/** Pure, exported for testing */
export function createFullDenyFinalityConsent(finalities: Finality[]): FinalityConsent {
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
export function updateFinalityConsent(params: {
    finalityConsent: FinalityConsent;
    finality: Finality;
    isConsentGiven: boolean;
}): FinalityConsent {
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
export function readFinalityConsent(params: {
    finalityConsent: FinalityConsent;
    finality: Finality;
}): boolean | undefined {
    const { finality, finalityConsent } = params;

    const [mainFinality, subFinality] = finality.split(".");

    if (subFinality === undefined) {
        return finalityConsent[mainFinality];
    }

    return (finalityConsent as any)[mainFinality][subFinality];
}

export type ProcessBulkConsentChange = (
    params:
        | {
              type: "grantAll" | "denyAll";
          }
        | {
              type: "custom";
              changes: {
                  finality: Finality;
                  isConsentGiven: boolean;
              }[];
          }
) => Promise<void>;

const arrOfCallbacks: OnConsentChange[] = [];

const onConsentChange_global: OnConsentChange = async params => {
    await Promise.all(arrOfCallbacks.map(callback => callback(params)));
};

export function useOnConsentChange(params: { onConsentChange: OnConsentChange | undefined }) {
    const { onConsentChange } = params;

    const onConsentChange_const = useConstCallback<OnConsentChange>(params =>
        onConsentChange?.(params)
    );

    if (!arrOfCallbacks.includes(onConsentChange_const)) {
        arrOfCallbacks.push(onConsentChange_const);
    }

    useEffect(
        () => () => {
            arrOfCallbacks.splice(arrOfCallbacks.indexOf(onConsentChange_const), 1);
        },
        []
    );
}

/** pure */
export function getFinalitiesFromFinalityDescription(params: {
    finalityDescription: FinalityDescription;
}): Finality[] {
    const { finalityDescription } = params;

    const finalities: Finality[] = [];

    for (const mainFinality in finalityDescription) {
        const description = finalityDescription[mainFinality];

        const { titleBySubFinality } = description as any;

        if (titleBySubFinality === undefined) {
            finalities.push(mainFinality);
            continue;
        }

        for (const subFinality in titleBySubFinality) {
            finalities.push(`${mainFinality}.${subFinality}`);
        }
    }

    return finalities;
}

export function createProcessBulkConsentChange(params: {
    finalities: Finality[];
    getFinalityConsent: () => FinalityConsent | undefined;
    setFinalityConsent: (params: { finalityConsent: FinalityConsent }) => void;
}) {
    const { finalities, getFinalityConsent, setFinalityConsent } = params;

    const processBulkConsentChange: ProcessBulkConsentChange = async params => {
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

        assert(params.type === "custom");

        const { changes } = params;

        let finalityConsentCurrent = (() => {
            const curr = getFinalityConsent();

            return curr === undefined ? createFullDenyFinalityConsent(finalities) : deepCopy(curr);
        })();

        Promise.all(
            changes.map(async ({ finality, isConsentGiven }) => {
                await Promise.resolve(
                    onConsentChange_global({
                        finality,
                        isConsentGiven,
                        "isConsentGiven_prev": readFinalityConsent({
                            "finalityConsent": finalityConsentCurrent,
                            finality
                        })
                    })
                );

                finalityConsentCurrent = updateFinalityConsent({
                    "finalityConsent": finalityConsentCurrent,
                    finality,
                    isConsentGiven
                });
            })
        );

        setFinalityConsent({ "finalityConsent": finalityConsentCurrent });
    };

    processBulkConsentChange_global = processBulkConsentChange;

    return { processBulkConsentChange };
}

let processBulkConsentChange_global: ProcessBulkConsentChange | undefined = undefined;

export function getProcessBulkConsentChange() {
    return { processBulkConsentChange: processBulkConsentChange_global };
}
