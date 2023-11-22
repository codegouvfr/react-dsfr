import type { NextComponentType } from "next";
import type { DocumentProps } from "next/document";
import { data_fr_scheme, data_fr_theme } from "./useIsDark/constants";
import type { ColorScheme } from "./useIsDark";
import { fontUrlByFileBasename } from "./next-appdir/zz_internal/fontUrlByFileBasename";
import type { RegisterLink, RegisteredLinkProps } from "./link";
import "./assets/dsfr_plus_icons.css";
export type { RegisterLink, RegisteredLinkProps };
export type CreateNextDsfrIntegrationApiParams = {
    defaultColorScheme: ColorScheme | "system";
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: RegisterLink extends {
        Link: infer Link;
    } ? Link : undefined;
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
export type NextDsfrIntegrationApi = {
    withDsfr: <AppComponent extends NextComponentType<any, any, any>>(App: AppComponent) => AppComponent;
    dsfrDocumentApi: {
        augmentDocumentForDsfr: (Document: NextComponentType<any, any, any>) => void;
        getColorSchemeHtmlAttributes: (props: DocumentProps) => Record<never, unknown> | Record<typeof data_fr_scheme | typeof data_fr_theme, ColorScheme>;
    };
};
export declare function createNextDsfrIntegrationApi(params: CreateNextDsfrIntegrationApiParams): NextDsfrIntegrationApi;
