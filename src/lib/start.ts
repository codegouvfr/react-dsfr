import { isBrowser } from "./tools/isBrowser";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { setLangToUseIfProviderNotUsed } from "./i18n";
import type { ColorScheme } from "./darkMode";
import { startClientSideIsDarkLogic } from "./darkMode";

export type Params = {
    defaultColorScheme: ColorScheme | "system";
    /** If not specified it will fall back to browser preference */
    langIfNoProvider?: string;
    /** Default: false */
    verbose?: boolean;
};

export type NextParams = {
    doPersistDarkModePreferenceWithCookie: boolean;
    registerEffectAction: (effect: () => void) => void;
};

let isStarted = false;

async function startReactDsfrWithOptionalNextParams(params: Params, nextParams?: NextParams) {
    const { defaultColorScheme, verbose = false, langIfNoProvider } = params;

    assert(
        isBrowser,
        [
            `${symToStr({ startReactDsfr })}() is not supposed`,
            `to be run on the backed, only in the browser`
        ].join(" ")
    );

    if (isStarted) {
        return;
    }

    isStarted = true;

    if (langIfNoProvider !== undefined) {
        console.log(`start(), setLangToUseIfProviderNotUsed, ${langIfNoProvider}`);
        setLangToUseIfProviderNotUsed(langIfNoProvider);
    }

    startClientSideIsDarkLogic({
        "colorSchemeExplicitlyProvidedAsParameter": defaultColorScheme,
        "doPersistDarkModePreferenceWithCookie":
            nextParams === undefined ? false : nextParams.doPersistDarkModePreferenceWithCookie,
        "registerEffectAction":
            nextParams === undefined ? action => action() : nextParams.registerEffectAction
    });

    (window as any).dsfr = { verbose, "mode": "manual" };

    await import("../dsfr/dsfr.module" as any);

    const { dsfr } = window as unknown as { dsfr: { start: () => void } };

    if (nextParams === undefined) {
        dsfr.start();
        return;
    } else {
        nextParams.registerEffectAction(() => dsfr.start());
    }
}

export function startReactDsfr(params: Params) {
    startReactDsfrWithOptionalNextParams(params);
}

export function startReactDsfrNext(params: Params, nextParams: NextParams) {
    startReactDsfrWithOptionalNextParams(params, nextParams);
}
