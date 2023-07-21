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
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-quote> */
export const Quote = memo(forwardRef((props, ref) => {
    const { id: id_props, className, text, author, source, sourceUrl, imageUrl, size = "xlarge", accentColor, classes = {}, style } = props, rest = __rest(props, ["id", "className", "text", "author", "source", "sourceUrl", "imageUrl", "size", "accentColor", "classes", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-quote",
        "explicitlyProvidedId": id_props
    });
    return (React.createElement("figure", { id: id, className: cx(fr.cx("fr-quote"), imageUrl && fr.cx("fr-quote--column"), accentColor && `fr-quote--${accentColor}`, classes.root, className), style: style, ref: ref },
        React.createElement("blockquote", { cite: sourceUrl },
            React.createElement("p", { className: cx(size === "large" && fr.cx("fr-text--lg"), size === "medium" && fr.cx("fr-text--md"), classes.text) },
                "\u00AB ",
                text,
                " \u00BB")),
        React.createElement("figcaption", null,
            author !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-quote__author"), classes.author) }, author)),
            source !== undefined && (React.createElement("ul", { className: cx(fr.cx("fr-quote__source"), classes.source) }, source)),
            imageUrl !== undefined && (React.createElement("div", { className: cx("fr-quote__image", classes.image) },
                React.createElement("img", { src: imageUrl, className: cx(fr.cx("fr-responsive-img"), classes.imageTag), alt: "" }))))));
}));
Quote.displayName = symToStr({ Quote });
export default Quote;
//# sourceMappingURL=Quote.js.map