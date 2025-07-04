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
import React, { useId, memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { cx } from "../tools/cx";
import { fr } from "../fr";
import { useAnalyticsId } from "../tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-radiobutton> */
export const Fieldset = memo(forwardRef((props, ref) => {
    const { className, id: id_props, classes = {}, style, legend, hintText, options, orientation = "vertical", state = "default", stateRelatedMessage, disabled = false, type, name: name_props, small = false } = props, rest = __rest(props, ["className", "id", "classes", "style", "legend", "hintText", "options", "orientation", "state", "stateRelatedMessage", "disabled", "type", "name", "small"]);
    const isRichRadio = type === "radio" &&
        options.find(options => options.illustration !== undefined) !== undefined;
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": `fr-fieldset-${type}${name_props === undefined ? "" : `-${name_props}`}`,
        "explicitlyProvidedId": id_props
    });
    const getInputId = (i) => `${id}-${i}`;
    const legendId = `${id}-legend`;
    const errorDescId = `${id}-desc-error`;
    const successDescId = `${id}-desc-valid`;
    const infoDescId = `${id}-desc-info`;
    const messagesWrapperId = `${id}-messages`;
    const radioName = (function useClosure() {
        const id = useId();
        return name_props !== null && name_props !== void 0 ? name_props : `radio-name-${id}`;
    })();
    const renderOption = (params) => {
        const { option, i } = params;
        const { label, hintText, nativeInputProps } = option, rest = __rest(option, ["label", "hintText", "nativeInputProps"]);
        const isRoot = i === undefined;
        const inputId = getInputId(i !== null && i !== void 0 ? i : 0);
        return (React.createElement("div", { className: cx(fr.cx(`fr-${type}-group`, isRichRadio && "fr-radio-rich", small && `fr-${type}-group--sm`), isRoot ? className : undefined, classes.inputGroup), key: i },
            React.createElement("input", Object.assign({ type: type, id: inputId, name: radioName }, nativeInputProps)),
            React.createElement("label", { className: fr.cx("fr-label"), htmlFor: inputId },
                label,
                hintText !== undefined && (React.createElement("span", { className: fr.cx("fr-hint-text") }, hintText))),
            "illustration" in rest && (React.createElement("div", { className: fr.cx("fr-radio-rich__img") }, rest.illustration))));
    };
    if (legend === undefined && stateRelatedMessage === undefined && options.length === 1) {
        return renderOption({ option: options[0], i: undefined });
    }
    const messageId = (() => {
        switch (state) {
            case "error":
                return errorDescId;
            case "success":
                return successDescId;
            case "info":
                return infoDescId;
        }
    })();
    return (React.createElement("fieldset", Object.assign({ id: id, className: cx(fr.cx("fr-fieldset", orientation === "horizontal" && "fr-fieldset--inline", (() => {
            switch (state) {
                case "default":
                case "info":
                    return undefined;
                case "error":
                    return "fr-fieldset--error";
                case "success":
                    return "fr-fieldset--valid";
            }
        })()), classes.root, className), disabled: disabled, style: style, "aria-labelledby": cx(legend !== undefined && legendId, messagesWrapperId), role: state === "default" ? undefined : "group" }, rest, { ref: ref }),
        legend !== undefined && (React.createElement("legend", { id: legendId, className: cx(fr.cx("fr-fieldset__legend", "fr-text--regular"), classes.legend), "aria-describedby": messageId },
            legend,
            hintText !== undefined && (React.createElement("span", { className: fr.cx("fr-hint-text") }, hintText)))),
        React.createElement("div", { className: cx(fr.cx("fr-fieldset__content"), classes.content) }, options.map((option, i) => renderOption({ option, i }))),
        React.createElement("div", { className: fr.cx("fr-messages-group"), id: messagesWrapperId, "aria-live": state === "error" ? "assertive" : undefined }, stateRelatedMessage !== undefined && (React.createElement("p", { id: messageId, className: fr.cx("fr-message", (() => {
                switch (state) {
                    case "error":
                        return "fr-message--error";
                    case "success":
                        return "fr-message--valid";
                    case "info":
                        return "fr-message--info";
                }
            })()) }, stateRelatedMessage)))));
}));
Fieldset.displayName = symToStr({ Fieldset });
export default Fieldset;
//# sourceMappingURL=Fieldset.js.map