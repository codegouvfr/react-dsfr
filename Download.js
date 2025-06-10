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
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { getLink } from "./link";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-download> */
export const Download = memo(forwardRef((props, ref) => {
    const { className, style, details, label, linkProps, classes = {}, id: props_id } = props, rest = __rest(props, ["className", "style", "details", "label", "linkProps", "classes", "id"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-download",
        "explicitlyProvidedId": props_id
    });
    const { Link } = getLink();
    return (React.createElement("div", { id: id, className: cx(fr.cx("fr-download"), className, classes.root), style: style, ref: ref },
        React.createElement("p", { className: cx(classes.wrapper) },
            React.createElement(Link, Object.assign({}, linkProps, { download: true, className: cx(fr.cx("fr-download__link"), classes.link) }),
                label,
                React.createElement("span", { className: "fr-download__detail" }, details)))));
}));
Download.displayName = symToStr({ Download });
export default Download;
//# sourceMappingURL=Download.js.map