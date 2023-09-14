import React, { useMemo, type ReactNode } from "react";
import { objectKeys } from "tsafe/objectKeys";
import { getAssetUrl } from "../tools/getAssetUrl";
import AppleTouchIcon from "../dsfr/favicon/apple-touch-icon.png";
import FaviconSvg from "../dsfr/favicon/favicon.svg";
import FaviconIco from "../dsfr/favicon/favicon.ico";
import { getScriptToRunAsap } from "../useIsDark/scriptToRunAsap";
import { fontUrlByFileBasename } from "./zz_internal/fontUrlByFileBasename";
import { getDefaultColorSchemeServerSide } from "./zz_internal/defaultColorScheme";
import { setLink, type RegisteredLinkProps } from "../link";
//NOTE: As of now there is no way to enforce ordering in Next Appdir
//See: https://github.com/vercel/next.js/issues/16630
// @import url(...) doesn't work. Using Sass and @use is our last resort.
import "../assets/dsfr_plus_icons.scss";

export type DsfrHeadProps = {
    /** If not provided no fonts are preloaded.
     * Preloading of fonts is only enabled in production.
     */
    preloadFonts?: (keyof typeof fontUrlByFileBasename)[];
    /** Default: <a /> */
    Link?: (props: RegisteredLinkProps & { children: ReactNode }) => ReturnType<React.FC>;
    nonce?: string;
    trustedTypesPolicyName?: string;
};

const isProduction = process.env.NODE_ENV !== "development";

export function DsfrHead(props: DsfrHeadProps) {
    const { preloadFonts = [], Link, nonce, trustedTypesPolicyName } = props;

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
            {isProduction && (
                <script
                    nonce={nonce}
                    dangerouslySetInnerHTML={{
                        "__html": getScriptToRunAsap({
                            defaultColorScheme,
                            nonce,
                            trustedTypesPolicyName
                        })
                    }}
                />
            )}
        </>
    );
}
