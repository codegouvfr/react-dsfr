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
/** @see <https://components.react-dsfr.fr/?path=/docs/components-highlight> */
export const Highlight = memo(forwardRef((props, ref) => {
    const { className, classes = {}, style, children, size } = props, rest = __rest(props, ["className", "classes", "style", "children", "size"]);
    assert();
    return (React.createElement("div", Object.assign({ className: cx(fr.cx("fr-highlight"), classes.root, className), ref: ref, style: style }, rest),
        React.createElement("p", { className: cx(fr.cx({ [`fr-text--${size}`]: size }), classes.content) }, children)));
}));
Highlight.displayName = symToStr({ Highlight });
export default Highlight;
//# sourceMappingURL=Highlight.js.map