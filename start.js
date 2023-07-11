import { isBrowser } from "./tools/isBrowser";
import { assert } from "tsafe/assert";
import { startClientSideIsDarkLogic } from "./useIsDark/client";
import { Deferred } from "./tools/Deferred";
let isStarted = false;
export async function start(params) {
    const { defaultColorScheme, verbose, nextParams } = params;
    assert(isBrowser);
    if (isStarted) {
        return;
    }
    isStarted = true;
    const registerEffectAction = nextParams === undefined ? action => action() : nextParams.registerEffectAction;
    startClientSideIsDarkLogic({
        "colorSchemeExplicitlyProvidedAsParameter": defaultColorScheme,
        "doPersistDarkModePreferenceWithCookie": nextParams === undefined ? false : nextParams.doPersistDarkModePreferenceWithCookie,
        registerEffectAction
    });
    // @ts-expect-error
    window.dsfr = {
        verbose,
        "mode": "react"
    };
    // @ts-expect-error
    await import("./dsfr/dsfr.module.min");
    dDsfrLoaded.resolve();
    registerEffectAction(() => {
        // @ts-expect-error
        window.dsfr.start();
    });
}
const dDsfrLoaded = new Deferred();
export const prDsfrLoaded = dDsfrLoaded.pr;
//# sourceMappingURL=start.js.map