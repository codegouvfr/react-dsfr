"use client";

import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { isBrowser } from "../tools/isBrowser";
import type { ColorScheme } from "../useIsDark";
import { SsrIsDarkProvider } from "../useIsDark/server";

export type DsfrProviderProps = {
    defaultColorScheme: ColorScheme | "system";
    effect: () => void;
    children: ReactNode;
};

export function DsfrProvider(props: DsfrProviderProps) {
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
