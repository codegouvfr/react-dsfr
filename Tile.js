var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef, memo } from "react";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { getLink } from "./link";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tile> */
export const Tile = memo(forwardRef((props, ref) => {
    const { id: id_props, className, title, titleAs: HtmlTitleTag = "h3", linkProps, buttonProps, downloadButton, desc, detail, start, imageUrl, imageAlt, imageWidth, imageHeight, imageSvg = true, orientation = "vertical", small = false, noBorder = false, noIcon = false, noBackground = false, grey = false, classes = {}, enlargeLinkOrButton = true, disabled = false, style } = props, rest = __rest(props, ["id", "className", "title", "titleAs", "linkProps", "buttonProps", "downloadButton", "desc", "detail", "start", "imageUrl", "imageAlt", "imageWidth", "imageHeight", "imageSvg", "orientation", "small", "noBorder", "noIcon", "noBackground", "grey", "classes", "enlargeLinkOrButton", "disabled", "style"]);
    assert();
    const { Link } = getLink();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-tile",
        "explicitlyProvidedId": id_props
    });
    return (React.createElement("div", Object.assign({ id: id, className: cx(fr.cx("fr-tile", enlargeLinkOrButton &&
            (linkProps
                ? "fr-enlarge-link"
                : buttonProps
                    ? "fr-enlarge-button"
                    : null), orientation && `fr-tile--${orientation}`, noIcon && "fr-tile--no-icon", noBorder && "fr-tile--no-border", noBackground && "fr-tile--no-background", grey && "fr-tile--grey", small && "fr-tile--sm", buttonProps && downloadButton && "fr-tile--download"), classes.root, className), ref: ref, style: style }, rest),
        React.createElement("div", { className: cx(fr.cx("fr-tile__body"), classes.body) },
            React.createElement("div", { className: cx(fr.cx("fr-tile__content"), classes.content) },
                React.createElement(HtmlTitleTag, { className: cx(fr.cx("fr-tile__title"), classes.title) }, linkProps !== undefined ? (React.createElement(Link, Object.assign({}, linkProps, { href: disabled ? undefined : linkProps.href, className: cx(classes.link, linkProps.className), "aria-disabled": disabled }), title)) : buttonProps !== undefined ? (React.createElement("button", Object.assign({}, buttonProps, { className: cx(classes.button, buttonProps.className), disabled: disabled }), title)) : (title)),
                desc !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-tile__desc"), classes.desc) }, desc)),
                detail !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-tile__detail"), classes.detail) }, detail)),
                start !== undefined && (React.createElement("div", { className: cx(fr.cx("fr-tile__start"), classes.start) }, start)))),
        imageUrl !== undefined && imageUrl.length > 0 && (React.createElement("div", { className: cx(fr.cx("fr-tile__header"), classes.header) }, imageSvg ? (React.createElement("div", { className: cx(fr.cx("fr-tile__pictogram"), classes.img) },
            React.createElement("svg", { "aria-hidden": true, className: fr.cx("fr-artwork"), viewBox: "0 0 80 80", width: "80px", height: "80px", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, [
                "artwork-decorative",
                "artwork-minor",
                "artwork-major"
            ].map(label => (React.createElement("use", { key: label, className: fr.cx(`fr-${label}`), xlinkHref: `${imageUrl}#${label}` })))))) : (React.createElement("div", { className: cx(fr.cx("fr-tile__img"), classes.img) },
            React.createElement("img", { className: cx(fr.cx("fr-responsive-img"), classes.imgTag), src: imageUrl, alt: imageAlt, width: imageWidth, height: imageHeight })))))));
}));
Tile.displayName = symToStr({ Tile });
export default Tile;
//# sourceMappingURL=Tile.js.map