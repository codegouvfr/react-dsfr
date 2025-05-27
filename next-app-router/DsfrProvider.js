"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useEffect } from "react";
import { isBrowser } from "../tools/isBrowser";
import { SsrIsDarkProvider } from "../useIsDark/server";
import { setUseLang } from "../i18n";
import { setLink } from "../link";
import { start } from "../start";
export function DsfrProviderBase(props) {
    const { children, lang, Link, defaultColorScheme, verbose = false, doCheckNonce = false, trustedTypesPolicyName = "react-dsfr" } = props;
    /*
    useEffect(() => {
        dsfrEffect();
    }, []);
    */
    useMemo(() => {
        if (!isBrowser) {
            return;
        }
        start({
            defaultColorScheme,
            verbose,
            doCheckNonce,
            trustedTypesPolicyName,
            "nextParams": {
                "doPersistDarkModePreferenceWithCookie": false,
                "registerEffectAction": action => {
                    if (isAfterFirstEffect) {
                        action();
                    }
                    else {
                        actions.push(action);
                    }
                }
            }
        });
    }, []);
    useMemo(() => {
        if (lang === undefined) {
            return;
        }
        setUseLang({ useLang: () => lang });
    }, [lang]);
    useMemo(() => {
        setLink({ Link: Link });
    }, [Link]);
    if (isBrowser) {
        return React.createElement(React.Fragment, null, children);
    }
    const isDark = defaultColorScheme === "dark" ? true : false;
    return React.createElement(SsrIsDarkProvider, { value: isDark }, children);
}
let isAfterFirstEffect = false;
const actions = [];
function dsfrEffect() {
    if (isAfterFirstEffect) {
        return;
    }
    isAfterFirstEffect = true;
    actions.forEach(action => {
        action();
    });
}
export function StartDsfrOnHydration() {
    useEffect(() => {
        dsfrEffect();
    }, []);
    return null;
}
//# sourceMappingURL=DsfrProvider.js.map