import React from "react";
import Head from "next/head";
import type { NextComponentType } from "next";
import type { AppProps } from "next/app";
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

export function withDsfr<AppComponent extends NextComponentType<any, any, any>>(
    App: AppComponent,
    params: Params
): AppComponent {
    const { preloadFonts = [], ...startDsfrReactParams } = params;

    if (isBrowser) {
        startDsfrReact(startDsfrReactParams);
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
                </Head>
                <App {...(props as any)} />
            </>
        );
    }

    Object.keys(App).forEach(
        staticMethod => ((AppWithDsfr as any)[staticMethod] = (App as any)[staticMethod])
    );

    AppWithDsfr.displayName = AppWithDsfr.name;

    return AppWithDsfr as any;
}
