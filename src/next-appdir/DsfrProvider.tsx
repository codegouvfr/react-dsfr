"use client";

import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { isBrowser } from "../tools/isBrowser";
import { SsrIsDarkProvider } from "../useIsDark/server";
import { dsfrEffect } from "./start";
import { GdprStoreProvider } from "../gdpr/GdprStore";
import { getDefaultColorSchemeClientSide } from "./zz_internal/defaultColorScheme";

export type DsfrProviderProps = {
    children: ReactNode;
};

export function DsfrProvider(props: DsfrProviderProps) {
    const { children } = props;

    useEffect(() => {
        dsfrEffect();
    }, []);

    if (isBrowser) {
        return <GdprStoreProvider>{children}</GdprStoreProvider>;
    }

    const defaultColorScheme = getDefaultColorSchemeClientSide();

    const isDark = defaultColorScheme === "dark" ? true : false;

    return <SsrIsDarkProvider value={isDark}>{children}</SsrIsDarkProvider>;
}
