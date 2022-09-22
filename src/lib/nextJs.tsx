import React from "react";
import Head from "next/head";
import type { NextComponentType } from "next";
import type { AppProps } from "next/app";
import { startReactDsfr } from "./start";
import type { Params as StartReactDsfrParams } from "./start";
import { id } from "tsafe/id";
import { isBrowser } from "./tools/isBrowser";
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

export type Params = StartReactDsfrParams & {
    /** If not provided all fonts are preloaded */
    preloadFonts?: (keyof typeof fontUrlByFileBasename)[];
};

export function withDsfr<AppComponent extends NextComponentType<any, any, any>>(
    App: AppComponent,
    params: Params
): AppComponent {
    const { preloadFonts, ...startReactDsfrParams } = params;

    if (isBrowser) {
        startReactDsfr(startReactDsfrParams);
    }

    function AppWithDsfr(props: AppProps) {
        return (
            <>
                <Head>
                    {Object.entries(fontUrlByFileBasename)
                        .filter(([fileBasename]) =>
                            id<string[]>(
                                preloadFonts ?? Object.keys(fontUrlByFileBasename)
                            ).includes(fileBasename)
                        )
                        .map(([, url]) => url)
                        .map(url => (
                            <link
                                key={url}
                                rel="preload"
                                href={url}
                                as="font"
                                crossOrigin="anonymous"
                            />
                        ))}
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
