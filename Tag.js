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
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { getLink } from "./link";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
/** @see <https://components.react-dsfr.fr/?path=/docs/components-tag> */
export const Tag = memo(forwardRef((props, ref) => {
    const { className: prop_className, children, title, iconId, small = false, pressed, dismissible = false, linkProps, nativeButtonProps, nativeSpanProps, style, onClick } = props, rest = __rest(props, ["className", "children", "title", "iconId", "small", "pressed", "dismissible", "linkProps", "nativeButtonProps", "nativeSpanProps", "style", "onClick"]);
    assert();
    const { Link } = getLink();
    const className = cx(fr.cx("fr-tag", small && `fr-tag--sm`, iconId, iconId && "fr-tag--icon-left", // actually, it's always left but we need it in order to have the icon rendering
    dismissible && "fr-tag--dismiss"), linkProps !== undefined && linkProps.className, prop_className);
    return (React.createElement(React.Fragment, null,
        linkProps !== undefined && (React.createElement(Link, Object.assign({}, linkProps, { title: title !== null && title !== void 0 ? title : linkProps.title, className: cx(linkProps === null || linkProps === void 0 ? void 0 : linkProps.className, className), style: Object.assign(Object.assign({}, linkProps === null || linkProps === void 0 ? void 0 : linkProps.style), style), ref: ref }, rest), children)),
        nativeButtonProps !== undefined && (React.createElement("button", Object.assign({}, nativeButtonProps, { className: cx(nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.className, className), style: Object.assign(Object.assign({}, nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.style), style), title: title !== null && title !== void 0 ? title : nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.title, onClick: onClick !== null && onClick !== void 0 ? onClick : nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.onClick, disabled: nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.disabled, ref: ref, "aria-pressed": pressed }, rest), children)),
        linkProps === undefined && nativeButtonProps === undefined && (React.createElement("span", Object.assign({}, nativeSpanProps, { className: cx(nativeSpanProps === null || nativeSpanProps === void 0 ? void 0 : nativeSpanProps.className, className), style: Object.assign(Object.assign({}, nativeSpanProps === null || nativeSpanProps === void 0 ? void 0 : nativeSpanProps.style), style), title: title !== null && title !== void 0 ? title : nativeSpanProps === null || nativeSpanProps === void 0 ? void 0 : nativeSpanProps.title, ref: ref }, rest), children))));
}));
Tag.displayName = symToStr({ Tag });
export default Tag;
//# sourceMappingURL=Tag.js.map