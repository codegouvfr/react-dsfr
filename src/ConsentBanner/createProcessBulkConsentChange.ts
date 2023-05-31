import type { Param0 } from "tsafe";
import { deepCopy } from "../tools/deepCopy";
import type { StatefulObservable } from "../tools/StatefulObservable";
import type { Finality, FinalityConsent } from "./types";

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

    return null as any;
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

    async function processBulkConsentChange(params: {
        paramsOfOnConsentChangeArr: Param0<typeof onConsentChange>[];
    }) {
        const { paramsOfOnConsentChangeArr } = params;

        let finalityConsentCurrent =
            $finalityConsent.current === undefined
                ? createFullDenyFinalityConsent(finalities)
                : deepCopy($finalityConsent.current);

        Promise.all(
            paramsOfOnConsentChangeArr.map(async paramsOfOnConsentChange => {
                const { finality, isConsentGiven, isConsentGiven_prev } = paramsOfOnConsentChange;

                await Promise.resolve(
                    onConsentChange?.({ finality, isConsentGiven, isConsentGiven_prev })
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

    return { processBulkConsentChange };
}
