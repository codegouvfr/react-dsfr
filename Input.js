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
/**
 * @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-input>
 * */
export const Input = memo(forwardRef((props, ref) => {
    var _a;
    const { className, id, label, hintText, hideLabel, disabled = false, iconId, classes = {}, style, state = "default", stateRelatedMessage, textArea = false, nativeTextAreaProps, nativeInputProps, addon } = props, rest = __rest(props, ["className", "id", "label", "hintText", "hideLabel", "disabled", "iconId", "classes", "style", "state", "stateRelatedMessage", "textArea", "nativeTextAreaProps", "nativeInputProps", "addon"]);
    const nativeInputOrTextAreaProps = (_a = (textArea ? nativeTextAreaProps : nativeInputProps)) !== null && _a !== void 0 ? _a : {};
    const NativeInputOrTextArea = textArea ? "textarea" : "input";
    assert();
    const inputId = (function useClosure() {
        var _a;
        const id = useId();
        return (_a = nativeInputOrTextAreaProps.id) !== null && _a !== void 0 ? _a : `input-${id}`;
    })();
    const messageId = `${inputId}-desc-error`;
    return (React.createElement("div", Object.assign({ className: cx(fr.cx((nativeInputProps === null || nativeInputProps === void 0 ? void 0 : nativeInputProps.type) === "file" ? "fr-upload-group" : "fr-input-group", disabled && "fr-input-group--disabled", (() => {
            switch (state) {
                case "error":
                    return "fr-input-group--error";
                case "success":
                    return "fr-input-group--valid";
                case "default":
                    return undefined;
            }
        })()), classes.root, className), style: style, ref: ref, id: id }, rest),
        Boolean(label || hintText) && (React.createElement("label", { className: cx(fr.cx("fr-label", hideLabel && "fr-sr-only"), classes.label), htmlFor: inputId },
            label,
            hintText !== undefined && React.createElement("span", { className: "fr-hint-text" }, hintText))),
        (() => {
            var _a;
            const nativeInputOrTextArea = (React.createElement(NativeInputOrTextArea, Object.assign({}, nativeInputOrTextAreaProps, { className: cx(fr.cx("fr-input", (() => {
                    switch (state) {
                        case "error":
                            return "fr-input--error";
                        case "success":
                            return "fr-input--valid";
                        case "default":
                            return undefined;
                    }
                })()), classes.nativeInputOrTextArea), disabled: disabled || undefined, "aria-describedby": messageId, type: textArea ? undefined : (_a = nativeInputProps === null || nativeInputProps === void 0 ? void 0 : nativeInputProps.type) !== null && _a !== void 0 ? _a : "text", id: inputId })));
            const hasIcon = iconId !== undefined;
            const hasAddon = addon !== undefined;
            return hasIcon || hasAddon ? (React.createElement("div", { className: fr.cx("fr-input-wrap", hasIcon && iconId, hasAddon && "fr-input-wrap--addon") },
                nativeInputOrTextArea,
                hasAddon && addon)) : (nativeInputOrTextArea);
        })(),
        state !== "default" && (React.createElement("p", { id: messageId, className: cx(fr.cx((() => {
                switch (state) {
                    case "error":
                        return "fr-error-text";
                    case "success":
                        return "fr-valid-text";
                }
            })()), classes.message) }, stateRelatedMessage))));
}));
Input.displayName = symToStr({ Input });
export default Input;
//# sourceMappingURL=Input.js.map