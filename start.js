import { isBrowser } from "./tools/isBrowser";
import { assert } from "tsafe/assert";
import { startClientSideIsDarkLogic } from "./useIsDark/client";
let isStarted = false;
export async function start(params) {
    const { defaultColorScheme, verbose, nextParams, eulerianAnalytics } = params;
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
    window.dsfr = {
        verbose,
        "mode": "react",
        "analytics": eulerianAnalytics
    };
    await import("./dsfr/dsfr.module");
    if (eulerianAnalytics !== undefined) {
        await import("./dsfr/analytics/analytics.module.js");
    }
    const { dsfr } = window;
    registerEffectAction(() => dsfr.start());
}
//# sourceMappingURL=start.js.map