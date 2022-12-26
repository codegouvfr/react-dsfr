"use client";

import type { ReactNode } from "react";
import { isBrowser } from "../tools/isBrowser";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { startI18nLogic } from "../i18n/i18n";
import type { ColorScheme } from "../useIsDark";
import { startClientSideIsDarkLogic } from "../useIsDark/client";
import type { RegisteredLinkProps } from "../link";
import { setLink } from "../link";

export type StartReactDsfrParams = {
    defaultColorScheme: ColorScheme | "system";
    /** Default: false */
    verbose?: boolean;
    Link?: (props: RegisteredLinkProps & { children: ReactNode }) => ReturnType<React.FC>;
};

export type NextParams = {
    doPersistDarkModePreferenceWithCookie: boolean;
    registerEffectAction: (effect: () => void) => void;
    doAllowHtmlAttributeMutationBeforeHydration: boolean;
};

let isStarted = false;

async function startReactDsfrWithOptionalNextParams(
    params: StartReactDsfrParams,
    nextParams?: NextParams
) {
    const { defaultColorScheme, verbose = false, Link } = params;

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

    if (Link !== undefined) {
        setLink({ Link });
    }

    const registerEffectAction: (action: () => void) => void =
        nextParams === undefined ? action => action() : nextParams.registerEffectAction;

    startClientSideIsDarkLogic({
        "colorSchemeExplicitlyProvidedAsParameter": defaultColorScheme,
        "doPersistDarkModePreferenceWithCookie":
            nextParams === undefined ? false : nextParams.doPersistDarkModePreferenceWithCookie,
        registerEffectAction,
        "doAllowHtmlAttributeMutationBeforeHydration":
            nextParams === undefined
                ? false
                : nextParams.doAllowHtmlAttributeMutationBeforeHydration
    });

    startI18nLogic({ registerEffectAction });

    (window as any).dsfr = { verbose, "mode": "manual" };

    await import("../dsfr/dsfr.module" as any);

    const { dsfr } = window as unknown as { dsfr: { start: () => void } };

    registerEffectAction(() => dsfr.start());
}

export function startReactDsfr(params: StartReactDsfrParams) {
    startReactDsfrWithOptionalNextParams(params);
}

export function startReactDsfrNext(params: StartReactDsfrParams, nextParams: NextParams) {
    startReactDsfrWithOptionalNextParams(params, nextParams);
}
