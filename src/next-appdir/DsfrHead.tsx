import React, { useMemo } from "react";
import { objectKeys } from "tsafe/objectKeys";
import { getAssetUrl } from "../tools/getAssetUrl";
import AppleTouchIcon from "../dsfr/favicon/apple-touch-icon.png";
import FaviconSvg from "../dsfr/favicon/favicon.svg";
import FaviconIco from "../dsfr/favicon/favicon.ico";
import { getScriptToRunAsap } from "../useIsDark/scriptToRunAsap";
import { fontUrlByFileBasename } from "./zz_internal/fontUrlByFileBasename";
import { getDefaultColorSchemeServerSide } from "./zz_internal/defaultColorScheme";
import { setLink, type RegisterLink } from "../link";
import { assert } from "tsafe/assert";
//NOTE: As of now there is no way to enforce ordering in Next Appdir
//See: https://github.com/vercel/next.js/issues/16630
// @import url(...) doesn't work. Using Sass and @use is our last resort.
import "../assets/dsfr_plus_icons.scss";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in doc
import { type startReactDsfr } from "./zz_internal/start";

export type DsfrHeadProps = {
    /** If not provided no fonts are preloaded.
     * Preloading of fonts is only enabled in production.
     */
    preloadFonts?: (keyof typeof fontUrlByFileBasename)[];
    /** Default: <a /> */
    Link?: RegisterLink extends { Link: infer Link } ? Link : undefined;
    /**
     * When set, the value will be used as the nonce attribute of subsequent script tags.
     *
     * Don't forget to add `doCheckNonce: true` in {@link startReactDsfr} options.
     *
     * @see https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/nonce
     */
    nonce?: string;
    /**
     * Enable Trusted Types with a custom policy name.
     *
     * Don't forget to add `trustedTypesPolicyName` in {@link startReactDsfr} options.
     *
     * @see https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types
     * @see {@link DEFAULT_TRUSTED_TYPES_POLICY_NAME}
     * @default "react-dsfr"
     */
    trustedTypesPolicyName?: string;
};

const isProduction = process.env.NODE_ENV !== "development";

export function DsfrHead(props: DsfrHeadProps) {
    const { preloadFonts = [], Link, nonce, trustedTypesPolicyName = "react-dsfr" } = props;

    assert(nonce !== "", "nonce cannot be an empty string");

    const defaultColorScheme = getDefaultColorSchemeServerSide();

    useMemo(() => {
        if (Link !== undefined) {
            setLink({ Link });
        }
    }, [Link]);

    return (
        <>
            {isProduction &&
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
            <link rel="apple-touch-icon" href={getAssetUrl(AppleTouchIcon)} />
            <link rel="icon" href={getAssetUrl(FaviconSvg)} type="image/svg+xml" />
            <link rel="shortcut icon" href={getAssetUrl(FaviconIco)} type="image/x-icon" />
            <script
                suppressHydrationWarning
                nonce={nonce}
                dangerouslySetInnerHTML={{
                    "__html": getScriptToRunAsap({
                        defaultColorScheme,
                        nonce,
                        trustedTypesPolicyName
                    })
                }}
            />
            {nonce !== undefined && (
                <script
                    suppressHydrationWarning
                    key="nonce-setter"
                    nonce={nonce}
                    dangerouslySetInnerHTML={{
                        __html: `window.ssrNonce = "${nonce}";`
                    }}
                />
            )}
        </>
    );
}
