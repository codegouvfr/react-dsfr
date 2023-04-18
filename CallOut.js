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
import { Button } from "./Button";
import { cx } from "./tools/cx";
import { fr } from "./fr";
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-callout> */
export const CallOut = memo(forwardRef((props, ref) => {
    const { className, iconId, title, buttonProps, colorVariant, classes = {}, children, style } = props, rest = __rest(props, ["className", "iconId", "title", "buttonProps", "colorVariant", "classes", "children", "style"]);
    assert();
    return (React.createElement("div", Object.assign({ className: cx(fr.cx("fr-callout", iconId, colorVariant !== undefined && `fr-callout--${colorVariant}`), classes.root, className), ref: ref, style: style }, rest),
        title !== undefined && (React.createElement("h3", { className: cx(fr.cx("fr-callout__title"), classes.title) }, title)),
        React.createElement("p", { className: cx(fr.cx("fr-callout__text"), classes.text) },
            " ",
            children,
            " "),
        buttonProps !== undefined && (React.createElement(Button, Object.assign({}, buttonProps, { className: cx(classes.button, buttonProps.className) })))));
}));
CallOut.displayName = symToStr({ CallOut });
export default CallOut;
//# sourceMappingURL=CallOut.js.map