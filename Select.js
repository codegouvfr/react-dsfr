"use client";
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
import React, { memo, forwardRef, useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/**
 * @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-select>
 * */
export const Select = memo(forwardRef((props, ref) => {
    const { id: id_props, className, label, hint, nativeSelectProps, disabled = false, children, state = "default", stateRelatedMessage, style } = props, rest = __rest(props, ["id", "className", "label", "hint", "nativeSelectProps", "disabled", "children", "state", "stateRelatedMessage", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-select-group",
        "explicitlyProvidedId": id_props
    });
    const selectId = (function useClosure() {
        const id = useId();
        if (nativeSelectProps.id !== undefined) {
            return nativeSelectProps.id;
        }
        return `select-${id}`;
    })();
    const messagesGroupId = `${selectId}-messages-group`;
    const stateDescriptionId = (function useClosure() {
        const id = useId();
        return state === "default" ? undefined : `select-${id}-desc`;
    })();
    return (React.createElement("div", Object.assign({ id: id, className: cx(fr.cx("fr-select-group", disabled && "fr-select-group--disabled", (() => {
            switch (state) {
                case "error":
                    return "fr-select-group--error";
                case "success":
                    return "fr-select-group--valid";
                case "default":
                case "info":
                    return undefined;
            }
            assert(false);
        })()), className), ref: ref, style: style }, rest),
        Boolean(label || hint) && (React.createElement("label", { className: fr.cx("fr-label"), htmlFor: selectId },
            label,
            hint !== undefined && (React.createElement("span", { className: fr.cx("fr-hint-text") }, hint)))),
        React.createElement("select", Object.assign({}, nativeSelectProps, { className: cx(fr.cx("fr-select"), nativeSelectProps.className), id: selectId, "aria-describedby": cx(stateDescriptionId, nativeSelectProps["aria-describedby"]), disabled: disabled }), children),
        React.createElement("div", { id: messagesGroupId, className: fr.cx("fr-messages-group"), "aria-live": "polite" }, state !== "default" && (React.createElement("p", { id: stateDescriptionId, className: fr.cx((() => {
                switch (state) {
                    case "error":
                        return "fr-error-text";
                    case "success":
                        return "fr-valid-text";
                    case "info":
                        return "fr-info-text";
                }
                assert(false);
            })()) }, stateRelatedMessage)))));
}));
Select.displayName = symToStr({ Select });
export default Select;
//# sourceMappingURL=Select.js.map