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
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tag> */
export const Tag = memo(forwardRef(
// -- (lint hack) to keep same indent as before
(props, ref) => {
    var _a, _b, _c;
    const { id: id_props, className: prop_className, children, title, iconId, small = false, pressed, dismissible = false, linkProps, nativeButtonProps, nativeParagraphProps, nativeSpanProps, style, onClick, as: AsTag = "p" } = props, rest = __rest(props, ["id", "className", "children", "title", "iconId", "small", "pressed", "dismissible", "linkProps", "nativeButtonProps", "nativeParagraphProps", "nativeSpanProps", "style", "onClick", "as"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-tag",
        "explicitlyProvidedId": id_props
    });
    const { Link } = getLink();
    const className = cx(fr.cx("fr-tag", small && `fr-tag--sm`, iconId, iconId && "fr-tag--icon-left", // actually, it's always left but we need it in order to have the icon rendering
    dismissible && "fr-tag--dismiss"), linkProps !== undefined && linkProps.className, prop_className);
    // to support old usage
    const nativeParagraphOrSpanProps = nativeParagraphProps !== null && nativeParagraphProps !== void 0 ? nativeParagraphProps : nativeSpanProps;
    return (React.createElement(React.Fragment, null,
        linkProps !== undefined && (React.createElement(Link, Object.assign({}, linkProps, { id: (_a = id_props !== null && id_props !== void 0 ? id_props : linkProps.id) !== null && _a !== void 0 ? _a : id, title: title !== null && title !== void 0 ? title : linkProps.title, className: cx(linkProps === null || linkProps === void 0 ? void 0 : linkProps.className, className), style: Object.assign(Object.assign({}, linkProps === null || linkProps === void 0 ? void 0 : linkProps.style), style), ref: ref }, rest), children)),
        nativeButtonProps !== undefined && (React.createElement("button", Object.assign({}, nativeButtonProps, { id: (_b = id_props !== null && id_props !== void 0 ? id_props : nativeButtonProps.id) !== null && _b !== void 0 ? _b : id, className: cx(nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.className, className), style: Object.assign(Object.assign({}, nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.style), style), title: title !== null && title !== void 0 ? title : nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.title, onClick: onClick !== null && onClick !== void 0 ? onClick : nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.onClick, disabled: nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.disabled, ref: ref, "aria-pressed": pressed }, rest), children)),
        linkProps === undefined &&
            nativeButtonProps === undefined &&
            (AsTag === "span" || AsTag === "p") && (React.createElement(AsTag, Object.assign({}, nativeParagraphOrSpanProps, { id: (_c = id_props !== null && id_props !== void 0 ? id_props : nativeParagraphOrSpanProps === null || nativeParagraphOrSpanProps === void 0 ? void 0 : nativeParagraphOrSpanProps.id) !== null && _c !== void 0 ? _c : id, className: cx(nativeParagraphOrSpanProps === null || nativeParagraphOrSpanProps === void 0 ? void 0 : nativeParagraphOrSpanProps.className, className), style: Object.assign(Object.assign({}, nativeParagraphOrSpanProps === null || nativeParagraphOrSpanProps === void 0 ? void 0 : nativeParagraphOrSpanProps.style), style), title: title !== null && title !== void 0 ? title : nativeParagraphOrSpanProps === null || nativeParagraphOrSpanProps === void 0 ? void 0 : nativeParagraphOrSpanProps.title, ref: ref }, rest), children))));
}));
Tag.displayName = symToStr({ Tag });
export default Tag;
//# sourceMappingURL=Tag.js.map