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
import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { getLink } from "./link";
import { fr } from "./fr";
import { cx } from "./tools/cx";
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-tile> */
export const Tile = memo(forwardRef((props, ref) => {
    const { className, title, linkProps, desc, imageUrl, imageAlt, imageWidth, imageHeight, horizontal = false, grey = false, classes = {}, enlargeLink = true, style } = props, rest = __rest(props, ["className", "title", "linkProps", "desc", "imageUrl", "imageAlt", "imageWidth", "imageHeight", "horizontal", "grey", "classes", "enlargeLink", "style"]);
    assert();
    const { Link } = getLink();
    return (React.createElement("div", Object.assign({ className: cx(fr.cx("fr-tile", enlargeLink && "fr-enlarge-link", horizontal && "fr-tile--horizontal", grey && "fr-tile--grey"), classes.root, className), ref: ref, style: style }, rest),
        React.createElement("div", { className: cx(fr.cx("fr-tile__body"), classes.body) },
            React.createElement("h3", { className: cx(fr.cx("fr-tile__title"), classes.title) },
                React.createElement(Link, Object.assign({}, linkProps, { className: cx(fr.cx("fr-tile__link"), classes.link, linkProps.className) }), title)),
            React.createElement("p", { className: cx(fr.cx("fr-tile__desc"), classes.desc) }, desc)),
        (imageUrl !== undefined && imageUrl.length && (React.createElement("div", { className: cx(fr.cx("fr-tile__img"), classes.img) },
            React.createElement("img", { className: cx(fr.cx("fr-responsive-img"), classes.imgTag), src: imageUrl, alt: imageAlt, width: imageWidth, height: imageHeight })))) ||
            null));
}));
Tile.displayName = symToStr({ Tile });
export default Tile;
//# sourceMappingURL=Tile.js.map