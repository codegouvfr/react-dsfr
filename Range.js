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
import React, { forwardRef, memo } from "react";
import { assert } from "tsafe";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
// const DoubleRange = (props: Pick<RangeProps, "min" | "max" | "nativeInputProps" | "step">) => {};
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-segmented-control> */
export const Range = memo(forwardRef((props, ref) => {
    const { id: props_id, className, classes = {}, disabled = false, double, hideMinMax = false, hintText, label, max, min, nativeInputProps, prefix, small = false, state = "default", stateRelatedMessage, step, style, suffix } = props, rest = __rest(props, ["id", "className", "classes", "disabled", "double", "hideMinMax", "hintText", "label", "max", "min", "nativeInputProps", "prefix", "small", "state", "stateRelatedMessage", "step", "style", "suffix"]);
    assert();
    if (min > max) {
        throw new Error(`min must be lower than max`);
    }
    const id = useAnalyticsId({
        "defaultIdPrefix": `fr-range`,
        "explicitlyProvidedId": props_id
    });
    const labelId = `${id}-label`;
    const errorMessageId = `${id}-message-error`;
    const successMessageId = `${id}-message-valid`;
    const messagesWrapperId = `${id}-messages`;
    return (React.createElement("div", Object.assign({ className: cx(fr.cx("fr-range-group", disabled && "fr-range-group--disabled", state === "error" && "fr-range-group--error", state === "success" && "fr-range-group--valid"), classes.root, className), style: style, ref: ref, id: `${id}-group` }, rest),
        React.createElement("label", { className: cx(fr.cx("fr-label"), classes.label), id: labelId },
            label,
            hintText !== undefined && (React.createElement("span", { className: cx(fr.cx("fr-hint-text"), classes.hintText) }, hintText))),
        React.createElement("div", { className: cx(fr.cx("fr-range", small && "fr-range--sm", double && "fr-range--double", step !== undefined && "fr-range--step"), classes.rangeWrapper), "data-fr-prefix": prefix, "data-fr-suffix": suffix },
            React.createElement("span", { className: cx(fr.cx("fr-range__output"), classes.output) }),
            (() => {
                var _a, _b;
                const partialInputProps = {
                    type: "range",
                    id,
                    name: id,
                    min,
                    max,
                    step,
                    disabled,
                    "aria-labelledby": labelId,
                    "aria-describedby": messagesWrapperId,
                    "aria-invalid": state === "error"
                };
                if (double) {
                    const inputProps1 = (_a = nativeInputProps === null || nativeInputProps === void 0 ? void 0 : nativeInputProps[0]) !== null && _a !== void 0 ? _a : {};
                    const inputProps2 = (_b = nativeInputProps === null || nativeInputProps === void 0 ? void 0 : nativeInputProps[1]) !== null && _b !== void 0 ? _b : {};
                    return (React.createElement(React.Fragment, null,
                        React.createElement("input", Object.assign({}, inputProps1, partialInputProps)),
                        React.createElement("input", Object.assign({}, inputProps2, partialInputProps, { id: `${id}-2`, name: `${id}-2` }))));
                }
                const inputProps = nativeInputProps !== null && nativeInputProps !== void 0 ? nativeInputProps : {};
                return React.createElement("input", Object.assign({}, inputProps, partialInputProps));
            })(),
            !hideMinMax && (React.createElement(React.Fragment, null,
                React.createElement("span", { className: cx(fr.cx("fr-range__min"), classes.min), "aria-hidden": true }, min),
                React.createElement("span", { className: cx(fr.cx("fr-range__max"), classes.max), "aria-hidden": true }, max)))),
        React.createElement("div", { className: cx(fr.cx("fr-messages-group"), classes.messagesGroup), id: messagesWrapperId, "aria-live": "polite" },
            React.createElement("p", { id: cx({
                    [errorMessageId]: state === "error",
                    [successMessageId]: state === "success"
                }), className: cx(fr.cx("fr-message", {
                    "fr-message--error": state === "error",
                    "fr-message--valid": state === "success"
                }), classes.message) }, stateRelatedMessage))));
}));
Range.displayName = symToStr({ Range });
export default Range;
//# sourceMappingURL=Range.js.map