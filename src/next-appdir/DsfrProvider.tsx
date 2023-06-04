"use client";

import React, { useMemo, useEffect } from "react";
import type { ReactNode } from "react";
import { isBrowser } from "../tools/isBrowser";
import { SsrIsDarkProvider } from "../useIsDark/server";
import { dsfrEffect } from "./zz_internal/start";
import { GdprStoreProvider } from "../gdpr/GdprStore";
import { getDefaultColorSchemeClientSide } from "./zz_internal/defaultColorScheme";
import { setUseLang } from "../i18n";

export type DsfrProviderProps = {
    children: ReactNode;
    lang?: string;
};

export function DsfrProvider(props: DsfrProviderProps) {
    const { children, lang } = props;

    useEffect(() => {
        dsfrEffect();
    }, []);

    useMemo(()=> {
        if (lang === undefined) {
            return;
        }

        setUseLang({ "useLang": () => lang });

    }, [lang]);

    if (isBrowser) {
        return (
            <GdprStoreProvider>{children}</GdprStoreProvider>
        );
    }

    const defaultColorScheme = getDefaultColorSchemeClientSide();

    const isDark = defaultColorScheme === "dark" ? true : false;

    return <SsrIsDarkProvider value={isDark}>{children}</SsrIsDarkProvider>;
}
