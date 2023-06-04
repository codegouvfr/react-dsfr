"use client";
import React, { useMemo, useEffect } from "react";
import { isBrowser } from "../tools/isBrowser";
import { SsrIsDarkProvider } from "../useIsDark/server";
import { dsfrEffect } from "./zz_internal/start";
import { GdprStoreProvider } from "../gdpr/GdprStore";
import { getDefaultColorSchemeClientSide } from "./zz_internal/defaultColorScheme";
import { setUseLang } from "../i18n";
export function DsfrProvider(props) {
    const { children, lang } = props;
    useEffect(() => {
        dsfrEffect();
    }, []);
    useMemo(() => {
        if (lang === undefined) {
            return;
        }
        setUseLang({ "useLang": () => lang });
    }, [lang]);
    if (isBrowser) {
        return React.createElement(GdprStoreProvider, null, children);
    }
    const defaultColorScheme = getDefaultColorSchemeClientSide();
    const isDark = defaultColorScheme === "dark" ? true : false;
    return React.createElement(SsrIsDarkProvider, { value: isDark }, children);
}
//# sourceMappingURL=DsfrProvider.js.map