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

    startClientSideIsDarkLogic({
        "colorSchemeExplicitlyProvidedAsParameter": defaultColorScheme,
        "doPersistDarkModePreferenceWithCookie":
            nextParams === undefined ? false : nextParams.doPersistDarkModePreferenceWithCookie,
        registerEffectAction
    });

    if ((window as any).dsfr === undefined) {
        (window as any).dsfr = { verbose, "mode": "manual" };
        await import("./dsfr/dsfr.module" as any);
    } else {
        console.log("we started downloading the js");

        (window as any).dsfr.verbose = verbose;

        if ((window as any).dsfr.start === undefined) {
            console.log("not yet done downloading");

            await new Promise<void>(resolve => {
                const listener = () => {
                    document.removeEventListener("dsfr js downloaded", listener);
                    resolve();
                };

                document.addEventListener("dsfr js downloaded", listener);
            });

            console.log("downloaded");
        }
    }

    const { dsfr } = window as unknown as { dsfr: { start: () => void } };

    registerEffectAction(() => dsfr.start());
}
