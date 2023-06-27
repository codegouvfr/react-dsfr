var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useEffect } from "react";
import { deepCopy } from "../tools/deepCopy";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
/** Pure, exported for testing */
export function finalityConsentToChanges(params) {
    return Object.entries(params.finalityConsent)
        .filter(([subFinality]) => subFinality !== "isFullConsent")
        .map(([finalityOrMainFinality, isConsentGivenOrObj]) => typeof isConsentGivenOrObj === "boolean"
        ? [
            {
                "finality": finalityOrMainFinality,
                "isConsentGiven": isConsentGivenOrObj
            }
        ]
        : Object.entries(isConsentGivenOrObj)
            .filter(([subFinality]) => subFinality !== "isFullConsent")
            .map(([subFinality, isConsentGiven]) => ({
            "finality": `${finalityOrMainFinality}.${subFinality}`,
            "isConsentGiven": (assert(typeof isConsentGiven === "boolean"), isConsentGiven)
        })))
        .reduce((acc, curr) => [...acc, ...curr], []);
}
export function createProcessConsentChanges(params) {
    const { finalities, getFinalityConsent, setFinalityConsent, consentCallback } = params;
    const consentCallbacks = [];
    if (consentCallback !== undefined) {
        consentCallbacks.push(consentCallback);
    }
    function useConsentCallback(params) {
        const { consentCallback } = params;
        const onConsentChange_const = useConstCallback(params => consentCallback === null || consentCallback === void 0 ? void 0 : consentCallback(params));
        if (!consentCallbacks.includes(onConsentChange_const)) {
            consentCallbacks.push(onConsentChange_const);
        }
        useEffect(() => () => {
            consentCallbacks.splice(consentCallbacks.indexOf(onConsentChange_const), 1);
        }, []);
    }
    const processConsentChanges = async (params) => {
        if (params.type === "no changes but trigger consent callbacks") {
            const finalityConsent = getFinalityConsent();
            if (finalityConsent === undefined) {
                return;
            }
            await Promise.all(consentCallbacks.map(consentCallback => consentCallback({
                finalityConsent,
                "finalityConsent_prev": finalityConsent
            })));
            return;
        }
        const changes = (() => {
            switch (params.type) {
                case "grantAll":
                    return finalities.map(finality => ({
                        finality,
                        "isConsentGiven": true
                    }));
                case "denyAll":
                    return finalities.map(finality => ({
                        finality,
                        "isConsentGiven": false
                    }));
                case "atomic change":
                    return [
                        {
                            "finality": params.finality,
                            "isConsentGiven": params.isConsentGiven
                        }
                    ];
                case "new finalityConsent explicitly provided":
                    return finalityConsentToChanges({ "finalityConsent": params.finalityConsent });
            }
        })();
        const finalityConsent_prev = getFinalityConsent();
        let finalityConsent = finalityConsent_prev === undefined
            ? createFullDenyFinalityConsent(finalities)
            : deepCopy(finalityConsent_prev);
        for (const { finality, isConsentGiven } of changes) {
            finalityConsent = updateFinalityConsent({
                "finalityConsent": finalityConsent,
                finality,
                isConsentGiven
            });
        }
        setFinalityConsent({
            finalityConsent,
            "prAllConsentCallbacksRun": Promise.all(consentCallbacks.map(consentCallback => consentCallback({
                finalityConsent,
                finalityConsent_prev
            }))).then(() => undefined)
        });
    };
    return { processConsentChanges, useConsentCallback };
}
/** Pure, exported for testing */
export function createFullDenyFinalityConsent(finalities) {
    var _a;
    const finalityConsent = {
        "isFullConsent": false
    };
    for (const finality of finalities) {
        const [mainFinality, subFinality] = finality.split(".");
        if (subFinality === undefined) {
            finalityConsent[mainFinality] = false;
            continue;
        }
        ((_a = finalityConsent[mainFinality]) !== null && _a !== void 0 ? _a : (finalityConsent[mainFinality] = {
            "isFullConsent": false
        }))[subFinality] = false;
    }
    return finalityConsent;
}
/** Pure, exported for testing */
export function updateFinalityConsent(params) {
    const { finality, finalityConsent, isConsentGiven } = params;
    const [mainFinality, subFinality] = finality.split(".");
    assert(is(mainFinality));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = deepCopy(finalityConsent), { isFullConsent: _1 } = _a, _b = mainFinality, _2 = _a[_b], restTop = __rest(_a, ["isFullConsent", typeof _b === "symbol" ? _b : _b + ""]);
    if (subFinality === undefined) {
        return Object.assign(Object.assign({}, restTop), { [mainFinality]: isConsentGiven, "isFullConsent": isConsentGiven &&
                !Object.values(restTop)
                    .map((value) => (typeof value === "boolean" ? value : value.isFullConsent))
                    .includes(false) });
    }
    const _c = deepCopy(finalityConsent[mainFinality]), { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFullConsent: _3 } = _c, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _d = subFinality, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _4 = _c[_d], rest = __rest(_c, ["isFullConsent", typeof _d === "symbol" ? _d : _d + ""]);
    const isFullConsentSub = isConsentGiven &&
        !Object.keys(rest)
            .map(key => rest[key])
            .includes(false);
    return Object.assign(Object.assign({}, restTop), { [mainFinality]: Object.assign(Object.assign({}, rest), { [subFinality]: isConsentGiven, "isFullConsent": isFullConsentSub }), "isFullConsent": isFullConsentSub &&
            !Object.values(restTop)
                .map((value) => (typeof value === "boolean" ? value : value.isFullConsent))
                .includes(false) });
}
/** Pure, exported for testing */
export function readFinalityConsent(params) {
    const { finality, finalityConsent } = params;
    const [mainFinality, subFinality] = finality.split(".");
    if (subFinality === undefined) {
        return finalityConsent[mainFinality];
    }
    return finalityConsent[mainFinality][subFinality];
}
//# sourceMappingURL=processConsentChanges.js.map