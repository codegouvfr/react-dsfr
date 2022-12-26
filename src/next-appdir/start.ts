import { isBrowser } from "../tools/isBrowser";
import type { StartReactDsfrParams } from "../start";
import { startReactDsfrNext } from "../start/start";
import { setLink } from "../link";

let isAfterFirstEffect = false;
const actions: (() => void)[] = [];

export function startReactDsfr(params: StartReactDsfrParams): void {
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
        "doAllowHtmlAttributeMutationBeforeHydration": process.env.NODE_ENV !== "development"
    });
}

export function dsfrEffect(): void {
    if (isAfterFirstEffect) {
        return;
    }
    isAfterFirstEffect = true;
    actions.forEach(action => action());
}
