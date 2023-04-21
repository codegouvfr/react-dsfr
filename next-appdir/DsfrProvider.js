"use client";
import React, { useEffect } from "react";
import { isBrowser } from "../tools/isBrowser";
import { SsrIsDarkProvider } from "../useIsDark/server";
import { dsfrEffect } from "./start";
import { GdprStoreProvider } from "../gdpr/GdprStore";
export function DsfrProvider(props) {
    const { defaultColorScheme, children } = props;
    useEffect(() => {
        dsfrEffect();
    }, []);
    if (isBrowser) {
        return React.createElement(GdprStoreProvider, null, children);
    }
    const isDark = defaultColorScheme === "dark" ? true : false;
    return React.createElement(SsrIsDarkProvider, { value: isDark }, children);
}
//# sourceMappingURL=DsfrProvider.js.map