import React from "react";
import Head from "next/head";
import type { NextComponentType } from "next";
import DefaultApp from "next/app";
import type { AppProps, AppContext } from "next/app";
import { startDsfrReact } from "./start";
import type { Params as startDsfrReactParams } from "./start";
import { isBrowser } from "./tools/isBrowser";
import { objectKeys } from "tsafe/objectKeys";
import marianneLightWoff2Url from "../dsfr/fonts/Marianne-Light.woff2";
import marianneItalicWoff2Url from "../dsfr/fonts/Marianne-Light_Italic.woff2";
import marianneRegularWoff2Url from "../dsfr/fonts/Marianne-Regular.woff2";
import marianneRegularItalicWoff2Url from "../dsfr/fonts/Marianne-Regular_Italic.woff2";
import marianneMediumWoff2Url from "../dsfr/fonts/Marianne-Medium.woff2";
import marianneMediumItalicWoff2Url from "../dsfr/fonts/Marianne-Medium_Italic.woff2";
import marianneBoldWoff2Url from "../dsfr/fonts/Marianne-Bold.woff2";
import marianneBoldItalicWoff2Url from "../dsfr/fonts/Marianne-Bold_Italic.woff2";
import spectralRegularWoff2Url from "../dsfr/fonts/Spectral-Regular.woff2";
import spectralExtraBoldWoff2Url from "../dsfr/fonts/Spectral-ExtraBold.woff2";
import appleTouchIcon from "../dsfr/favicon/apple-touch-icon.png";
import faviconSvg from "../dsfr/favicon/favicon.svg";
import faviconIco from "../dsfr/favicon/favicon.ico";
import faviconWebmanifestUrl from "../dsfr/favicon/manifest.webmanifest";
import type { DocumentContext } from "next/document";
import { data_fr_scheme, data_fr_theme, $colorScheme } from "./colorScheme";
import type { ColorScheme } from "./colorScheme";
import { createStatefulObservable } from "./tools/StatefulObservable";
import { symToStr } from "tsafe/symToStr";

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
};

const $overwriteGetInitialProps = createStatefulObservable<(() => void) | undefined>(
    () => undefined
);

let defaultColorScheme: ColorScheme | "system";

export function getColorSchemeSsrUtils() {
    $overwriteGetInitialProps.current?.();

    $overwriteGetInitialProps.subscribe(overwriteGetInitialProps => overwriteGetInitialProps?.());

    let colorScheme: ColorScheme | undefined = undefined;

    let isNextTickCleared = false;

    function readColorSchemeFromCookie(ctx: DocumentContext) {
        const cookie = ctx.req?.headers.cookie;

        colorScheme =
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

        isNextTickCleared = false;

        process.nextTick(() => {
            if (!isNextTickCleared) {
                console.error(
                    [
                        `WARNING: ${symToStr({
                            getColorSchemeHtmlAttributes
                        })} should be called just after`,
                        `${symToStr({ getColorSchemeSsrUtils })}, in the same event loop tick!`
                    ].join(" ")
                );
            }
        });
    }

    function getColorSchemeHtmlAttributes() {
        isNextTickCleared = true;

        if (colorScheme === undefined) {
            return {};
        }

        $colorScheme.current = colorScheme;

        return {
            [data_fr_scheme]: colorScheme,
            [data_fr_theme]: colorScheme
        };
    }

    return { readColorSchemeFromCookie, getColorSchemeHtmlAttributes };
}

export function withAppDsfr<AppComponent extends NextComponentType<any, any, any>>(
    App: AppComponent,
    params: Params
): AppComponent {
    const { preloadFonts = [], ...startDsfrReactParams } = params;

    if (isBrowser) {
        startDsfrReact(startDsfrReactParams);
    } else {
        defaultColorScheme = startDsfrReactParams.defaultColorScheme;
    }

    function AppWithDsfr(props: AppProps) {
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
                    <style>{`:root { color-scheme: ${$colorScheme.current}; }`}</style>
                </Head>
                <App {...(props as any)} />
            </>
        );
    }

    Object.keys(App).forEach(
        staticMethod => ((AppWithDsfr as any)[staticMethod] = (App as any)[staticMethod])
    );

    $overwriteGetInitialProps.current = () => {
        (AppWithDsfr as any).getInitialProps = async (appContext: AppContext) => {
            const initialProps = await (App.getInitialProps ?? DefaultApp.getInitialProps)(
                appContext
            );

            if (!isBrowser) {
                $colorScheme.current =
                    (() => {
                        const cookie = appContext.ctx.req?.headers.cookie;

                        return cookie === undefined ? undefined : readColorSchemeInCookie(cookie);
                    })() ??
                    (() => {
                        switch (startDsfrReactParams.defaultColorScheme) {
                            case "dark":
                            case "light":
                                return startDsfrReactParams.defaultColorScheme;
                            case "system":
                                return "light";
                        }
                    })();
            }

            return { ...initialProps };
        };
    };

    AppWithDsfr.displayName = AppWithDsfr.name;

    return AppWithDsfr as any;
}

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
