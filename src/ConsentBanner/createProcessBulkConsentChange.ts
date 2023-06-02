import { deepCopy } from "../tools/deepCopy";
import type { StatefulObservable } from "../tools/StatefulObservable";
import type { Finality, FinalityConsent } from "./types";
import { assert } from "tsafe/assert";

function createFullDenyFinalityConsent(finalities: Finality[]): FinalityConsent {
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

function updateFinalityConsent(params: {
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
                Object.keys(obj)
                    .filter(key => key !== subFinality && key !== "isFullConsent")
                    .map(key => obj[key])
                    .find(isConsentGiven => !isConsentGiven) === undefined
        }
    };
}

function readFinalityConsent(params: {
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

export function createProcessBulkConsentChange(params: {
    onConsentChange:
        | ((params: {
              finality: Finality;
              isConsentGiven: boolean;
              isConsentGiven_prev: boolean | undefined;
          }) => Promise<void> | void)
        | undefined;

    finalities: Finality[];
    $finalityConsent: StatefulObservable<FinalityConsent | undefined>;
}) {
    const { onConsentChange, finalities, $finalityConsent } = params;

    type Params =
        | {
              type: "grantAll" | "denyAll";
          }
        | {
              type: "custom";
              changes: {
                  finality: Finality;
                  isConsentGiven: boolean;
              }[];
          };

    async function processBulkConsentChange(params: Params) {
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

        let finalityConsentCurrent =
            $finalityConsent.current === undefined
                ? createFullDenyFinalityConsent(finalities)
                : deepCopy($finalityConsent.current);

        Promise.all(
            changes.map(async ({ finality, isConsentGiven }) => {
                await Promise.resolve(
                    onConsentChange?.({
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

        $finalityConsent.current = finalityConsentCurrent;
    }

    return processBulkConsentChange;
}
