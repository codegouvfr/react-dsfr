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
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-button> */
export const Button = memo(forwardRef((props, ref) => {
    const { className: prop_className, children, title, iconId, iconPosition = "left", priority = "primary", size = "medium", linkProps, onClick, nativeButtonProps, disabled, type, style } = props, rest = __rest(props, ["className", "children", "title", "iconId", "iconPosition", "priority", "size", "linkProps", "onClick", "nativeButtonProps", "disabled", "type", "style"]);
    assert();
    const { Link } = getLink();
    const className = cx(fr.cx("fr-btn", priority !== "primary" &&
        `fr-btn--${priority === "tertiary no outline" ? "tertiary-no-outline" : priority}`, size !== "medium" &&
        `fr-btn--${(() => {
            switch (size) {
                case "small":
                    return "sm";
                case "large":
                    return "lg";
            }
        })()}`, ...(iconId === undefined
        ? []
        : [iconId, children !== undefined && `fr-btn--icon-${iconPosition}`])), linkProps !== undefined && linkProps.className, prop_className);
    return linkProps !== undefined ? (React.createElement(Link, Object.assign({}, linkProps, { title: title !== null && title !== void 0 ? title : linkProps.title, className: cx(linkProps === null || linkProps === void 0 ? void 0 : linkProps.className, className), style: Object.assign(Object.assign({}, linkProps === null || linkProps === void 0 ? void 0 : linkProps.style), style), ref: ref }, rest), children)) : (React.createElement("button", Object.assign({}, nativeButtonProps, { className: cx(nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.className, className), style: Object.assign(Object.assign({}, nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.style), style), type: type !== null && type !== void 0 ? type : nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.type, title: title !== null && title !== void 0 ? title : nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.title, onClick: onClick !== null && onClick !== void 0 ? onClick : nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.onClick, disabled: disabled !== null && disabled !== void 0 ? disabled : nativeButtonProps === null || nativeButtonProps === void 0 ? void 0 : nativeButtonProps.disabled, ref: ref }, rest), children));
}));
Button.displayName = symToStr({ Button });
export default Button;
//# sourceMappingURL=Button.js.map