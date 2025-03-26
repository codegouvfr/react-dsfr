"use client";

import React, { useMemo, useEffect } from "react";
import type { ReactNode } from "react";
import { isBrowser } from "../tools/isBrowser";
import { SsrIsDarkProvider } from "../useIsDark/server";
import { dsfrEffect } from "./zz_internal/start";
import type { DefaultColorScheme } from "./zz_internal/defaultColorScheme";
import { setUseLang } from "../i18n";
import { setLink } from "../link";

export type DsfrProviderProps = {
    children: ReactNode;
    lang: string | undefined;
    Link: Function;
    defaultColorScheme: DefaultColorScheme;
};

export function DsfrProvider(props: DsfrProviderProps) {
    const { children, lang, Link, defaultColorScheme } = props;

    useEffect(() => {
        dsfrEffect();
    }, []);

    useMemo(() => {
        if (lang === undefined) {
            return;
        }

        setUseLang({ "useLang": () => lang });
    }, [lang]);

    useMemo(() => {
        setLink({ "Link": Link as any });
    }, [Link]);

    if (isBrowser) {
        return <>{children}</>;
    }

    const isDark = defaultColorScheme === "dark" ? true : false;

    return <SsrIsDarkProvider value={isDark}>{children}</SsrIsDarkProvider>;
}
