import React, { useEffect } from "react";
import Head from "next/head";
import type { NextComponentType } from "next";
import DefaultApp from "next/app";
import type { AppProps, AppContext } from "next/app";
import type { DocumentProps, DocumentContext } from "next/document";
import { rootColorSchemeStyleTagId, data_fr_scheme, data_fr_theme } from "./useIsDark/constants";
import { getScriptToRunAsap } from "./useIsDark/scriptToRunAsap";
import { SsrIsDarkProvider } from "./useIsDark/server";
import type { ColorScheme } from "./useIsDark";
import { isBrowser } from "./tools/isBrowser";
import { objectKeys } from "tsafe/objectKeys";
import { fontUrlByFileBasename } from "./next-appdir/zz_internal/fontUrlByFileBasename";
import AppleTouchIcon from "./dsfr/favicon/apple-touch-icon.png";
import FaviconSvg from "./dsfr/favicon/favicon.svg";
import FaviconIco from "./dsfr/favicon/favicon.ico";
import { getAssetUrl } from "./tools/getAssetUrl";
import { fr } from "./fr";
import { start } from "./start";
import type { RegisterLink, RegisteredLinkProps } from "./link";
import { setLink } from "./link";
import { setUseLang } from "./i18n";
import { assert } from "tsafe/assert";
import "./assets/dsfr_plus_icons.css";

const isProduction = process.env.NODE_ENV !== "development";

export type { RegisterLink, RegisteredLinkProps };

export type CreateNextDsfrIntegrationApiParams = {
    defaultColorScheme: ColorScheme | "system";
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: Function;
    /** If not provided no fonts are preloaded.
     * Preloading of fonts is only enabled in production.
     */
    preloadFonts?: (keyof typeof fontUrlByFileBasename)[];
    /** Default false */
    doPersistDarkModePreferenceWithCookie?: boolean;
    /** Default: ()=> "fr" */
    useLang?: () => string;
    /**
     * Enable Trusted Types with a custom policy name.
     *
     * `<trustedTypesPolicyName>` and `<trustedTypesPolicyName>-asap` should be set in your Content-Security-Policy header.
     *
     * For example:
     * ```txt
     * With a policy name of "react-dsfr":
     * Content-Security-Policy:
     *  require-trusted-types-for 'script';
     *  trusted-types react-dsfr react-dsfr-asap nextjs nextjs#bundler;
     * ```
     *
     * @see https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types
     * @default "react-dsfr"
     */
    trustedTypesPolicyName?: string;
    /**
     * Disable Marianne favicon import.
     * Enable this option if you want to use your own favicon.
     *
     * @default false
     */
    doDisableFavicon?: boolean;
};

function readIsDarkInCookie(cookie: string) {
    const parsedCookies = Object.fromEntries(
        cookie
            .split(/; */)
            .map(line => line.split("="))
            .map(([key, value]) => [key, decodeURIComponent(value)])
    );

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

export type NextDsfrIntegrationApi = {
    withDsfr: <AppComponent extends NextComponentType<any, any, any>>(
        App: AppComponent
    ) => AppComponent;
    dsfrDocumentApi: {
        augmentDocumentForDsfr: (Document: NextComponentType<any, any, any>) => void;
        getColorSchemeHtmlAttributes: (
            props: DocumentProps
        ) =>
            | Record<never, unknown>
            | Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme>;
    };
};

export function createNextDsfrIntegrationApi(
    params: CreateNextDsfrIntegrationApiParams
): NextDsfrIntegrationApi {
    const {
        defaultColorScheme,
        verbose = false,
        Link,
        preloadFonts = [],
        doPersistDarkModePreferenceWithCookie = false,
        useLang,
        trustedTypesPolicyName = "react-dsfr",
        doDisableFavicon = false
    } = params;

    let isAfterFirstEffect = false;
    const actions: (() => void)[] = [];

    if (Link !== undefined) {
        setLink({ "Link": Link as any });
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
                    } else {
                        actions.push(action);
                    }
                }
            }
        });
    }

    const isDarkPropKey = "dsfrIsDark";

    function withDsfr<AppComponent extends NextComponentType<any, any, any>>(
        App: AppComponent
    ): AppComponent {
        function AppWithDsfr({
            [isDarkPropKey]: isDark,
            ...props
        }: AppProps & Record<typeof isDarkPropKey, boolean | undefined>) {
            if (isDark === undefined) {
                isDark = isBrowser ? /*we do not use it*/ (null as any as boolean) : false;
            }

            useEffect(() => {
                if (isAfterFirstEffect) {
                    return;
                }
                isAfterFirstEffect = true;
                actions.forEach(action => action());
            }, []);

            return (
                <>
                    <Head>
                        {process.env.NODE_ENV !== "development" &&
                            objectKeys(fontUrlByFileBasename)
                                .filter(fileBasename => preloadFonts.includes(fileBasename))
                                .map(fileBasename => fontUrlByFileBasename[fileBasename])
                                .map(url => (
                                    <link
                                        key={url}
                                        rel="preload"
                                        href={url}
                                        as="font"
                                        crossOrigin="anonymous"
                                    />
                                ))}
                        {!doDisableFavicon && (
                            <>
                                <link rel="apple-touch-icon" href={getAssetUrl(AppleTouchIcon)} />
                                <link
                                    rel="icon"
                                    href={getAssetUrl(FaviconSvg)}
                                    type="image/svg+xml"
                                />
                                <link
                                    rel="shortcut icon"
                                    href={getAssetUrl(FaviconIco)}
                                    type="image/x-icon"
                                />
                            </>
                        )}
                        {defaultColorScheme !== "light" && (
                            <>
                                {!isBrowser && ( //NOTE: On browser we handle this manually
                                    <>
                                        <style
                                            id={rootColorSchemeStyleTagId}
                                        >{`:root { color-scheme: ${
                                            isDark ? "dark" : "light"
                                        }; }`}</style>
                                        <meta
                                            name="theme-color"
                                            content={
                                                fr.colors.getHex({ isDark }).decisions.background
                                                    .default.grey.default
                                            }
                                        />
                                    </>
                                )}
                                {isProduction && !isBrowser && (
                                    <script
                                        dangerouslySetInnerHTML={{
                                            "__html": getScriptToRunAsap({
                                                defaultColorScheme,
                                                trustedTypesPolicyName,
                                                "nonce": undefined
                                            })
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </Head>
                    {isBrowser ? (
                        <App {...(props as any)} />
                    ) : (
                        <SsrIsDarkProvider value={isDark}>
                            <App {...(props as any)} />
                        </SsrIsDarkProvider>
                    )}
                </>
            );
        }

        Object.keys(App).forEach(key => ((AppWithDsfr as any)[key] = (App as any)[key]));

        if (doPersistDarkModePreferenceWithCookie) {
            const super_getInitialProps =
                App.getInitialProps?.bind(App) ?? DefaultApp.getInitialProps.bind(DefaultApp);

            (AppWithDsfr as any).getInitialProps = async (appContext: AppContext) => {
                const initialProps = await super_getInitialProps(appContext);

                let isDark: boolean | undefined = undefined;

                if (!isBrowser) {
                    isDark =
                        (() => {
                            const cookie = appContext.ctx.req?.headers.cookie;

                            return cookie === undefined ? undefined : readIsDarkInCookie(cookie);
                        })() ??
                        (() => {
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

                return { ...initialProps, [isDarkPropKey]: isDark };
            };
        }

        AppWithDsfr.displayName = AppWithDsfr.name;

        return AppWithDsfr as any;
    }

    function augmentDocumentForDsfr(Document: NextComponentType<any, any, any>): void {
        let super_getInitialProps = Document.getInitialProps?.bind(Document);

        if (super_getInitialProps === undefined) {
            import("next/document").then(
                ({ default: DefaultDocument }) =>
                    (super_getInitialProps = DefaultDocument.getInitialProps.bind(DefaultDocument))
            );
        }

        (Document as any).getInitialProps = async (documentContext: DocumentContext) => {
            const { isDark } = (() => {
                const cookie = !readIsDarkInCookie
                    ? undefined
                    : documentContext.req?.headers.cookie;

                const isDark =
                    (cookie === undefined ? undefined : readIsDarkInCookie(cookie)) ??
                    (() => {
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

                documentContext.renderPage = ({ enhanceApp, ...params }: any) =>
                    originalRenderPage({
                        ...params,
                        "enhanceApp": (App: any) => {
                            const EnhancedApp = enhanceApp?.(App) ?? App;

                            return function EnhanceApp(props) {
                                return <EnhancedApp {...{ ...props, [isDarkPropKey]: isDark }} />;
                            };
                        }
                    });
            }

            assert(
                super_getInitialProps !== undefined,
                "Default document not yet loaded. Please submit an issue to the tss-react repo"
            );

            const initialProps = await super_getInitialProps(documentContext);

            return { ...initialProps, [isDarkPropKey]: isDark };
        };
    }

    function getColorSchemeHtmlAttributes(
        props: DocumentProps
    ): Record<never, unknown> | Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme> {
        const { [isDarkPropKey]: isDark } = props as DocumentProps &
            Record<typeof isDarkPropKey, boolean | undefined>;

        if (isDark === undefined) {
            return {};
        }

        const colorScheme: ColorScheme = isDark ? "dark" : "light";

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
