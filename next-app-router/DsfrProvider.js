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
                    console.log("registerEffectAction", action);
                    if (isAfterFirstEffect) {
                        console.log("run now");
                        action();
                    }
                    else {
                        console.log("push");
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
        console.log("running action", action);
        action();
    });
}
export function StartDsfrOnHydration() {
    useEffect(() => {
        console.log("wesh hydratation!");
        dsfrEffect();
    }, []);
    return null;
}
//# sourceMappingURL=DsfrProvider.js.map