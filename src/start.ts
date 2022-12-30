import { isBrowser } from "./tools/isBrowser";
import { assert } from "tsafe/assert";
import type { ColorScheme } from "./useIsDark";
import { startClientSideIsDarkLogic } from "./useIsDark/client";

type Params = {
    defaultColorScheme: ColorScheme | "system";
    verbose: boolean;
    nextParams:
        | {
              doPersistDarkModePreferenceWithCookie: boolean;
              registerEffectAction: (effect: () => void) => void;
          }
        | undefined;
};

let isStarted = false;

export async function start(params: Params) {
    const { defaultColorScheme, verbose, nextParams } = params;

    assert(isBrowser);

    if (isStarted) {
        return;
    }

    isStarted = true;

    const registerEffectAction: (action: () => void) => void =
        nextParams === undefined ? action => action() : nextParams.registerEffectAction;

    console.log("startClientSideIsDarkLogic", Date.now());

    startClientSideIsDarkLogic({
        "colorSchemeExplicitlyProvidedAsParameter": defaultColorScheme,
        "doPersistDarkModePreferenceWithCookie":
            nextParams === undefined ? false : nextParams.doPersistDarkModePreferenceWithCookie,
        registerEffectAction
    });

    console.log("registering action download dsfr and start", Date.now());

    registerEffectAction(async () => {
        console.log("executing action download dsfr and start", Date.now());

        (window as any).dsfr = { verbose, "mode": "manual" };

        console.log("Start download DSFR js", Date.now());

        await import("./dsfr/dsfr.module" as any);

        console.log("DSFR js downloaded", Date.now());

        const { dsfr } = window as unknown as { dsfr: { start: () => void } };

        dsfr.start();
    });
}
