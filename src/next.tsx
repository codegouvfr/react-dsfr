import React from "react";
import Head from "next/head";
import type { NextComponentType } from "next";
import DefaultApp from "next/app";
import type { AppProps, AppContext } from "next/app";
import type { DocumentProps, DocumentContext } from "next/document";
import { startDsfrReact } from "./lib/start";
import type { Params as startDsfrReactParams } from "./lib/start";
import { isBrowser } from "./lib/tools/isBrowser";
import { objectKeys } from "tsafe/objectKeys";
import marianneLightWoff2Url from "./dsfr/fonts/Marianne-Light.woff2";
import marianneItalicWoff2Url from "./dsfr/fonts/Marianne-Light_Italic.woff2";
import marianneRegularWoff2Url from "./dsfr/fonts/Marianne-Regular.woff2";
import marianneRegularItalicWoff2Url from "./dsfr/fonts/Marianne-Regular_Italic.woff2";
import marianneMediumWoff2Url from "./dsfr/fonts/Marianne-Medium.woff2";
import marianneMediumItalicWoff2Url from "./dsfr/fonts/Marianne-Medium_Italic.woff2";
import marianneBoldWoff2Url from "./dsfr/fonts/Marianne-Bold.woff2";
import marianneBoldItalicWoff2Url from "./dsfr/fonts/Marianne-Bold_Italic.woff2";
import spectralRegularWoff2Url from "./dsfr/fonts/Spectral-Regular.woff2";
import spectralExtraBoldWoff2Url from "./dsfr/fonts/Spectral-ExtraBold.woff2";
import appleTouchIcon from "./dsfr/favicon/apple-touch-icon.png";
import faviconSvg from "./dsfr/favicon/favicon.svg";
import faviconIco from "./dsfr/favicon/favicon.ico";
import faviconWebmanifestUrl from "./dsfr/favicon/manifest.webmanifest";
import { data_fr_scheme, data_fr_theme, isDarkContext } from "./lib/darkMode";
import type { ColorScheme } from "./lib/darkMode";
import DefaultDocument from "next/document";
import { assert } from "tsafe/assert";

const fontUrlByFileBasename = {
    "Marianne-Light": marianneLightWoff2Url,
    "Marianne-Light_Italic": marianneItalicWoff2Url,
    "Marianne-Regular": marianneRegularWoff2Url,
    "Marianne-Regular_Italic": marianneRegularItalicWoff2Url,
    "Marianne-Medium": marianneMediumWoff2Url,
    "Marianne-Medium_Italic": marianneMediumItalicWoff2Url,
    "Marianne-Bold": marianneBoldWoff2Url,
    "Marianne-Bold_Italic": marianneBoldItalicWoff2Url,
    "Spectral-Regular": spectralRegularWoff2Url,
    "Spectral-ExtraBold": spectralExtraBoldWoff2Url
} as const;

export type Params = startDsfrReactParams & {
    /** If not provided no fonts are preloaded.
     * Preloading of fonts is only enabled in production.
     */
    preloadFonts?: (keyof typeof fontUrlByFileBasename)[];
    /** Default false */
    doPersistDarkModePreferenceWithCookie?: boolean;
};

/*
const $overwriteGetInitialProps = createStatefulObservable<(() => void) | undefined>(
    () => undefined
);
*/

let defaultColorScheme: ColorScheme | "system";

function readColorSchemeInCookie(cookie: string) {
    const parsedCookies = Object.fromEntries(
        cookie
            .split(/; */)
            .map(line => line.split("="))
            .map(([key, value]) => [key, decodeURIComponent(value)])
    );

    if (!(data_fr_theme in parsedCookies)) {
        return undefined;
    }

    const colorScheme = parsedCookies[data_fr_theme];

    return (() => {
        switch (colorScheme) {
            case "light":
            case "dark":
                return colorScheme;
            default:
                return undefined;
        }
    })();
}

export function createDsfrNextIntegrationApi(params: Params) {
    const {
        preloadFonts = [],
        doPersistDarkModePreferenceWithCookie = false,
        ...startDsfrReactParams
    } = params;

    assert(doPersistDarkModePreferenceWithCookie, "TODO: Support without this mode");

    if (isBrowser) {
        startDsfrReact(startDsfrReactParams);
    } else {
        defaultColorScheme = startDsfrReactParams.defaultColorScheme;
    }

    const colorSchemeKey = "dsfrColorScheme";

    /** the App returned by witAppDsfr should be directly exported default as is */
    function withAppDsfr<AppComponent extends NextComponentType<any, any, any>>(
        App: AppComponent
    ): AppComponent {
        //function AppWithDsfr({ [colorSchemeKey]: colorScheme = "light", ...props }: AppProps & Record<typeof colorSchemeKey, ColorScheme | undefined>) {
        function AppWithDsfr({
            [colorSchemeKey]: colorScheme,
            ...props
        }: AppProps & Record<typeof colorSchemeKey, ColorScheme | undefined>) {
            console.log(`AppWithDsfr: ${colorScheme}`);

            if (colorScheme === undefined) {
                colorScheme = "light";
            }

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
                        <link rel="apple-touch-icon" href={appleTouchIcon.src} />
                        <link rel="icon" href={faviconSvg.src} type="image/svg+xml" />
                        <link rel="shortcut icon" href={faviconIco.src} type="image/x-icon" />
                        <link
                            rel="manifest"
                            href={faviconWebmanifestUrl}
                            crossOrigin="use-credentials"
                        />
                        <style>{`:root { color-scheme: ${colorScheme}; }`}</style>
                    </Head>
                    {isBrowser ? (
                        <App {...(props as any)} />
                    ) : (
                        <isDarkContext.Provider
                            value={(() => {
                                switch (colorScheme) {
                                    case "dark":
                                        return true;
                                    case "light":
                                        return false;
                                }
                            })()}
                        >
                            <App {...(props as any)} />
                        </isDarkContext.Provider>
                    )}
                </>
            );
        }

        Object.keys(App).forEach(
            staticMethod => ((AppWithDsfr as any)[staticMethod] = (App as any)[staticMethod])
        );

        {
            const super_getInitialProps =
                App.getInitialProps?.bind(App) ?? DefaultApp.getInitialProps.bind(DefaultApp);

            (AppWithDsfr as any).getInitialProps = async (appContext: AppContext) => {
                const initialProps = await super_getInitialProps(appContext);

                let colorScheme: ColorScheme | undefined = undefined;

                if (!isBrowser) {
                    colorScheme =
                        (() => {
                            const cookie = appContext.ctx.req?.headers.cookie;

                            return cookie === undefined
                                ? undefined
                                : readColorSchemeInCookie(cookie);
                        })() ??
                        (() => {
                            switch (startDsfrReactParams.defaultColorScheme) {
                                case "dark":
                                case "light":
                                    return startDsfrReactParams.defaultColorScheme;
                                case "system":
                                    return undefined;
                            }
                        })();
                }

                console.log(`AppWithDsfr.getInitialProps ${colorScheme}`);

                return { ...initialProps, colorScheme };
            };
        }

        AppWithDsfr.displayName = AppWithDsfr.name;

        return AppWithDsfr as any;
    }

    function augmentDocumentByReadingColorSchemeFromCookie(
        Document: NextComponentType<any, any, any>
    ): void {
        const super_getInitialProps =
            Document.getInitialProps?.bind(Document) ??
            DefaultDocument.getInitialProps.bind(DefaultDocument);

        (Document as any).getInitialProps = async (documentContext: DocumentContext) => {
            const { colorScheme } = (() => {
                const cookie = documentContext.req?.headers.cookie;

                const colorScheme =
                    (cookie === undefined ? undefined : readColorSchemeInCookie(cookie)) ??
                    (() => {
                        switch (defaultColorScheme) {
                            case "light":
                            case "dark":
                                return defaultColorScheme;
                            case "system":
                                return undefined;
                        }
                    })();

                return { colorScheme };
            })();

            {
                const originalRenderPage = documentContext.renderPage;

                documentContext.renderPage = ({ enhanceApp, ...params }: any) =>
                    originalRenderPage({
                        ...params,
                        "enhanceApp": (App: any) => {
                            const EnhancedApp = enhanceApp?.(App) ?? App;

                            return function EnhanceApp(props) {
                                return (
                                    <EnhancedApp {...{ ...props, [colorSchemeKey]: colorScheme }} />
                                );
                            };
                        }
                    });
            }

            const initialProps = await super_getInitialProps(documentContext);

            console.log(`Document.getInitialProps ${colorScheme}`);

            return { ...initialProps, [colorSchemeKey]: colorScheme };
        };
    }

    function getColorSchemeHtmlAttributes(props: DocumentProps) {
        const { [colorSchemeKey]: colorScheme } = props as DocumentProps &
            Record<typeof colorSchemeKey, ColorScheme | undefined>;

        console.log(`getColorSchemeHtmlAttributes ${colorScheme}`);

        if (colorScheme === undefined) {
            return {};
        }

        return {
            [data_fr_scheme]: colorScheme,
            [data_fr_theme]: colorScheme
        };
    }

    return {
        withAppDsfr,
        "dsfrDocumentApi": {
            augmentDocumentByReadingColorSchemeFromCookie,
            getColorSchemeHtmlAttributes
        }
    };
}
