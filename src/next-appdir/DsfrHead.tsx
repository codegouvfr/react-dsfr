import React from "react";
import { objectKeys } from "tsafe/objectKeys";
import type { ColorScheme } from "../useIsDark";
import { getAssetUrl } from "../tools/getAssetUrl";
import AppleTouchIcon from "../dsfr/favicon/apple-touch-icon.png";
import FaviconSvg from "../dsfr/favicon/favicon.svg";
import FaviconIco from "../dsfr/favicon/favicon.ico";
import { getScriptToRunAsap } from "../useIsDark/scriptToRunAsap";
import { fontUrlByFileBasename } from "./fontUrlByFileBasename";
import "../dsfr/dsfr.css";
import "../dsfr/utility/icons/icons.css";

export type DsfrHeadProps = {
    defaultColorScheme: ColorScheme | "system";
    /** If not provided no fonts are preloaded.
     * Preloading of fonts is only enabled in production.
     */
    preloadFonts?: (keyof typeof fontUrlByFileBasename)[];
};

const isProduction = process.env.NODE_ENV !== "development";

export function DsfrHead(props: DsfrHeadProps) {
    const { defaultColorScheme, preloadFonts = [] } = props;

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
                    dangerouslySetInnerHTML={{ "__html": getScriptToRunAsap(defaultColorScheme) }}
                />
            )}
        </>
    );
}
