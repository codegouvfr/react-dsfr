"use client";

import { isBrowser } from "../lib/tools/isBrowser";
import type { Params as StartDsfrReactParams } from "../lib/start";
import { startReactDsfrNext } from "../lib/start";
import { setLink } from "../lib/routing";

let isAfterFirstEffect = false;
const actions: (() => void)[] = [];

export function startReactDsfr(params: StartDsfrReactParams): void {
    if (!isBrowser) {
        const { Link } = params;
        if (Link !== undefined) {
            setLink({ Link });
        }

        return;
    }

    startReactDsfrNext(params, {
        "doPersistDarkModePreferenceWithCookie": false,
        "registerEffectAction": action => {
            if (isAfterFirstEffect) {
                action();
            } else {
                actions.push(action);
            }
        },
        "doAvoidAllPreHydrationMutation": process.env.NODE_ENV === "development"
    });
}

export function dsfrEffect(): void {
    if (isAfterFirstEffect) {
        return;
    }
    isAfterFirstEffect = true;
    actions.forEach(action => action());
}
