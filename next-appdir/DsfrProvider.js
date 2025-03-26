"use client";
import React, { useMemo, useEffect } from "react";
import { isBrowser } from "../tools/isBrowser";
import { SsrIsDarkProvider } from "../useIsDark/server";
import { dsfrEffect } from "./zz_internal/start";
import { setUseLang } from "../i18n";
import { setLink } from "../link";
export function DsfrProvider(props) {
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
        setLink({ "Link": Link });
    }, [Link]);
    if (isBrowser) {
        return React.createElement(React.Fragment, null, children);
    }
    const isDark = defaultColorScheme === "dark" ? true : false;
    return React.createElement(SsrIsDarkProvider, { value: isDark }, children);
}
//# sourceMappingURL=DsfrProvider.js.map