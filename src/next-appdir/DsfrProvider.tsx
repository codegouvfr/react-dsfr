"use client";

import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { isBrowser } from "../lib/tools/isBrowser";
import type { ColorScheme } from "../lib/darkMode";
import { SsrIsDarkProvider } from "../lib/darkMode";

export type DsfrProviderProps = {
    defaultColorScheme: ColorScheme | "system";
    effect: () => void;
    children: ReactNode;
};

export default function NextAppDirDsfrProvider(props: DsfrProviderProps) {
    const { defaultColorScheme, effect, children } = props;

    useEffect(() => {
        effect();
    }, []);

    if (isBrowser) {
        return <>{children}</>;
    }

    const isDark = defaultColorScheme === "dark" ? true : false;

    return <SsrIsDarkProvider value={isDark}>{children}</SsrIsDarkProvider>;
}
