import React, { type ReactNode } from "react";
import type { NextComponentType } from "next";
import type { DocumentProps } from "next/document";
import { data_fr_scheme, data_fr_theme } from "./useIsDark/constants";
import type { ColorScheme } from "./useIsDark";
import { fontUrlByFileBasename } from "./next-appdir/fontUrlByFileBasename";
import type { RegisterLink, RegisteredLinkProps } from "./link";
import "./assets/dsfr_plus_icons.css";
export type { RegisterLink, RegisteredLinkProps };
export type CreateNextDsfrIntegrationApiParams = {
    defaultColorScheme: ColorScheme | "system";
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: (props: RegisteredLinkProps & {
        children: ReactNode;
    }) => ReturnType<React.FC>;
    /** If not provided no fonts are preloaded.
     * Preloading of fonts is only enabled in production.
     */
    preloadFonts?: (keyof typeof fontUrlByFileBasename)[];
    /** Default false */
    doPersistDarkModePreferenceWithCookie?: boolean;
    /** Default: ()=> "fr" */
    useLang?: () => string;
};
export type NextDsfrIntegrationApi = {
    withDsfr: <AppComponent extends NextComponentType<any, any, any>>(App: AppComponent) => AppComponent;
    dsfrDocumentApi: {
        augmentDocumentForDsfr: (Document: NextComponentType<any, any, any>) => void;
        getColorSchemeHtmlAttributes: (props: DocumentProps) => Record<never, unknown> | Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme>;
    };
};
export declare function createNextDsfrIntegrationApi(params: CreateNextDsfrIntegrationApiParams): NextDsfrIntegrationApi;
