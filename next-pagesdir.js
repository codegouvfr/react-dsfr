var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect } from "react";
import Head from "next/head";
import DefaultApp from "next/app";
import { rootColorSchemeStyleTagId, data_fr_scheme, data_fr_theme } from "./useIsDark/constants";
import { getScriptToRunAsap } from "./useIsDark/scriptToRunAsap";
import { SsrIsDarkProvider } from "./useIsDark/server";
import { isBrowser } from "./tools/isBrowser";
import { objectKeys } from "tsafe/objectKeys";
import { fontUrlByFileBasename } from "./next-app-router/zz_internal/fontUrlByFileBasename";
import AppleTouchIcon from "./dsfr/favicon/apple-touch-icon.png";
import FaviconSvg from "./dsfr/favicon/favicon.svg";
import FaviconIco from "./dsfr/favicon/favicon.ico";
import { getAssetUrl } from "./tools/getAssetUrl";
import { fr } from "./fr";
import { start } from "./start";
import { setLink } from "./link";
import { setUseLang } from "./i18n";
import { assert } from "tsafe/assert";
import "./assets/dsfr_plus_icons.css";
const isProduction = process.env.NODE_ENV !== "development";
function readIsDarkInCookie(cookie) {
    const parsedCookies = Object.fromEntries(cookie
        .split(/; */)
        .map(line => line.split("="))
        .map(([key, value]) => [key, decodeURIComponent(value)]));
    if (!(data_fr_theme in parsedCookies)) {
        return undefined;
    }
    switch (parsedCookies[data_fr_theme]) {
        case "light":
            return false;
        case "dark":
            return true;
        default:
            return undefined;
    }
}
export function createNextDsfrIntegrationApi(params) {
    const { defaultColorScheme, verbose = false, Link, preloadFonts = [], doPersistDarkModePreferenceWithCookie = false, useLang, trustedTypesPolicyName = "react-dsfr", doDisableFavicon = false } = params;
    let isAfterFirstEffect = false;
    const actions = [];
    if (Link !== undefined) {
        setLink({ "Link": Link });
    }
    if (useLang !== undefined) {
        setUseLang({ useLang });
    }
    if (isBrowser) {
        start({
            defaultColorScheme,
            verbose,
            "doCheckNonce": false,
            trustedTypesPolicyName,
            "nextParams": {
                doPersistDarkModePreferenceWithCookie,
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
    }
    const isDarkPropKey = "dsfrIsDark";
    function withDsfr(App) {
        var _a, _b;
        function AppWithDsfr(_a) {
            var _b = isDarkPropKey, isDark = _a[_b], props = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            if (isDark === undefined) {
                isDark = isBrowser ? /*we do not use it*/ null : false;
            }
            useEffect(() => {
                if (isAfterFirstEffect) {
                    return;
                }
                isAfterFirstEffect = true;
                actions.forEach(action => action());
            }, []);
            return (React.createElement(React.Fragment, null,
                React.createElement(Head, null,
                    process.env.NODE_ENV !== "development" &&
                        objectKeys(fontUrlByFileBasename)
                            .filter(fileBasename => preloadFonts.includes(fileBasename))
                            .map(fileBasename => fontUrlByFileBasename[fileBasename])
                            .map(url => (React.createElement("link", { key: url, rel: "preload", href: url, as: "font", crossOrigin: "anonymous" }))),
                    !doDisableFavicon && (React.createElement(React.Fragment, null,
                        React.createElement("link", { rel: "apple-touch-icon", href: getAssetUrl(AppleTouchIcon) }),
                        React.createElement("link", { rel: "icon", href: getAssetUrl(FaviconSvg), type: "image/svg+xml" }),
                        React.createElement("link", { rel: "shortcut icon", href: getAssetUrl(FaviconIco), type: "image/x-icon" }))),
                    defaultColorScheme !== "light" && (React.createElement(React.Fragment, null,
                        !isBrowser && ( //NOTE: On browser we handle this manually
                        React.createElement(React.Fragment, null,
                            React.createElement("style", { id: rootColorSchemeStyleTagId }, `:root { color-scheme: ${isDark ? "dark" : "light"}; }`),
                            React.createElement("meta", { name: "theme-color", content: fr.colors.getHex({ isDark }).decisions.background
                                    .default.grey.default }))),
                        isProduction && !isBrowser && (React.createElement("script", { dangerouslySetInnerHTML: {
                                "__html": getScriptToRunAsap({
                                    defaultColorScheme,
                                    trustedTypesPolicyName,
                                    "nonce": undefined
                                })
                            } }))))),
                isBrowser ? (React.createElement(App, Object.assign({}, props))) : (React.createElement(SsrIsDarkProvider, { value: isDark },
                    React.createElement(App, Object.assign({}, props))))));
        }
        Object.keys(App).forEach(key => (AppWithDsfr[key] = App[key]));
        if (doPersistDarkModePreferenceWithCookie) {
            const super_getInitialProps = (_b = (_a = App.getInitialProps) === null || _a === void 0 ? void 0 : _a.bind(App)) !== null && _b !== void 0 ? _b : DefaultApp.getInitialProps.bind(DefaultApp);
            AppWithDsfr.getInitialProps = async (appContext) => {
                var _a;
                const initialProps = await super_getInitialProps(appContext);
                let isDark = undefined;
                if (!isBrowser) {
                    isDark =
                        (_a = (() => {
                            var _a;
                            const cookie = (_a = appContext.ctx.req) === null || _a === void 0 ? void 0 : _a.headers.cookie;
                            return cookie === undefined ? undefined : readIsDarkInCookie(cookie);
                        })()) !== null && _a !== void 0 ? _a : (() => {
                            switch (defaultColorScheme) {
                                case "dark":
                                    return true;
                                case "light":
                                    return false;
                                case "system":
                                    return undefined;
                            }
                        })();
                }
                return Object.assign(Object.assign({}, initialProps), { [isDarkPropKey]: isDark });
            };
        }
        AppWithDsfr.displayName = AppWithDsfr.name;
        return AppWithDsfr;
    }
    function augmentDocumentForDsfr(Document) {
        var _a;
        let super_getInitialProps = (_a = Document.getInitialProps) === null || _a === void 0 ? void 0 : _a.bind(Document);
        if (super_getInitialProps === undefined) {
            import("next/document").then(({ default: DefaultDocument }) => (super_getInitialProps = DefaultDocument.getInitialProps.bind(DefaultDocument)));
        }
        Document.getInitialProps = async (documentContext) => {
            const { isDark } = (() => {
                var _a, _b;
                const cookie = !readIsDarkInCookie
                    ? undefined
                    : (_a = documentContext.req) === null || _a === void 0 ? void 0 : _a.headers.cookie;
                const isDark = (_b = (cookie === undefined ? undefined : readIsDarkInCookie(cookie))) !== null && _b !== void 0 ? _b : (() => {
                    switch (defaultColorScheme) {
                        case "light":
                            return false;
                        case "dark":
                            return true;
                        case "system":
                            return undefined;
                    }
                })();
                return { isDark };
            })();
            {
                const originalRenderPage = documentContext.renderPage;
                documentContext.renderPage = (_a) => {
                    var { enhanceApp } = _a, params = __rest(_a, ["enhanceApp"]);
                    return originalRenderPage(Object.assign(Object.assign({}, params), { "enhanceApp": (App) => {
                            var _a;
                            const EnhancedApp = (_a = enhanceApp === null || enhanceApp === void 0 ? void 0 : enhanceApp(App)) !== null && _a !== void 0 ? _a : App;
                            return function EnhanceApp(props) {
                                return React.createElement(EnhancedApp, Object.assign({}, Object.assign(Object.assign({}, props), { [isDarkPropKey]: isDark })));
                            };
                        } }));
                };
            }
            assert(super_getInitialProps !== undefined, "Default document not yet loaded. Please submit an issue to the tss-react repo");
            const initialProps = await super_getInitialProps(documentContext);
            return Object.assign(Object.assign({}, initialProps), { [isDarkPropKey]: isDark });
        };
    }
    function getColorSchemeHtmlAttributes(props) {
        const { [isDarkPropKey]: isDark } = props;
        if (isDark === undefined) {
            return {};
        }
        const colorScheme = isDark ? "dark" : "light";
        return {
            [data_fr_scheme]: colorScheme,
            [data_fr_theme]: colorScheme
        };
    }
    return {
        withDsfr,
        "dsfrDocumentApi": {
            augmentDocumentForDsfr,
            getColorSchemeHtmlAttributes
        }
    };
}
//# sourceMappingURL=next-pagesdir.js.map