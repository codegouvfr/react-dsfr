import React, { useMemo } from "react";
import { objectKeys } from "tsafe/objectKeys";
import { getAssetUrl } from "../tools/getAssetUrl";
import AppleTouchIcon from "../dsfr/favicon/apple-touch-icon.png";
import FaviconSvg from "../dsfr/favicon/favicon.svg";
import FaviconIco from "../dsfr/favicon/favicon.ico";
import { getScriptToRunAsap } from "../useIsDark/scriptToRunAsap";
import { fontUrlByFileBasename } from "./zz_internal/fontUrlByFileBasename";
import { getDefaultColorSchemeServerSide } from "./zz_internal/defaultColorScheme";
import { setLink } from "../link";
import { assert } from "tsafe/assert";
//NOTE: As of now there is no way to enforce ordering in Next Appdir
//See: https://github.com/vercel/next.js/issues/16630
// @import url(...) doesn't work. Using Sass and @use is our last resort.
import "../assets/dsfr_plus_icons.scss";
const isProduction = process.env.NODE_ENV !== "development";
export function DsfrHead(props) {
    const { preloadFonts = [], Link, nonce, trustedTypesPolicyName = "react-dsfr", doDisableFavicon = false } = props;
    assert(nonce !== "", "nonce cannot be an empty string");
    const defaultColorScheme = getDefaultColorSchemeServerSide();
    useMemo(() => {
        if (Link !== undefined) {
            setLink({ Link });
        }
    }, [Link]);
    return (React.createElement(React.Fragment, null,
        isProduction &&
            objectKeys(fontUrlByFileBasename)
                .filter(fileBasename => preloadFonts.includes(fileBasename))
                .map(fileBasename => fontUrlByFileBasename[fileBasename])
                .map(url => (React.createElement("link", { key: url, rel: "preload", href: url, as: "font", crossOrigin: "anonymous" }))),
        !doDisableFavicon && (React.createElement(React.Fragment, null,
            React.createElement("link", { rel: "apple-touch-icon", href: getAssetUrl(AppleTouchIcon) }),
            React.createElement("link", { rel: "icon", href: getAssetUrl(FaviconSvg), type: "image/svg+xml" }),
            React.createElement("link", { rel: "shortcut icon", href: getAssetUrl(FaviconIco), type: "image/x-icon" }))),
        React.createElement("script", { suppressHydrationWarning: true, nonce: nonce, dangerouslySetInnerHTML: {
                "__html": getScriptToRunAsap({
                    defaultColorScheme,
                    nonce,
                    trustedTypesPolicyName
                })
            } }),
        nonce !== undefined && (React.createElement("script", { suppressHydrationWarning: true, key: "nonce-setter", nonce: nonce, dangerouslySetInnerHTML: {
                __html: `window.ssrNonce = "${nonce}";`
            } }))));
}
//# sourceMappingURL=DsfrHead.js.map