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
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tooltip> */
export const Tooltip = memo(forwardRef((props, ref) => {
    const { id: id_prop, className, description, kind, children } = props, rest = __rest(props, ["id", "className", "description", "kind", "children"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-tooltip",
        "explicitlyProvidedId": id_prop
    });
    const displayChildren = (children, id) => {
        if (children === undefined)
            return React.createElement(React.Fragment, null);
        return typeof children === "string" ? (React.createElement("span", { "aria-describedby": id, id: `tooltip-owner-${id}` }, children)) : (children &&
            React.cloneElement(children, {
                "aria-describedby": id,
                "id": `tooltip-owner-${id}`
            }));
    };
    return (React.createElement(React.Fragment, null, props.kind === "click" ? (React.createElement("span", { ref: ref },
        children === undefined ? (React.createElement("button", { className: "fr-btn--tooltip fr-btn", "aria-describedby": id, id: `tooltip-owner-${id}` }, "Information contextuelle")) : (displayChildren(children, id)),
        React.createElement("span", { className: `fr-tooltip fr-placement ${props.className}`, id: id, role: "tooltip", "aria-hidden": "true" }, props.description))) : (React.createElement("span", { ref: ref },
        displayChildren(children, id),
        React.createElement("span", { className: `fr-tooltip fr-placement ${props.className}`, id: id, role: "tooltip", "aria-hidden": "true" }, props.description)))));
}));
Tooltip.displayName = symToStr({ Tooltip });
export default Tooltip;
//# sourceMappingURL=Tooltip.js.map