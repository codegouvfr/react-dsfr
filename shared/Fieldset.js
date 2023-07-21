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
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": `fr-fieldset-${type}${name_props === undefined ? "" : `-${name_props}`}`,
        "explicitlyProvidedId": id_props
    });
    const getInputId = (i) => `${id}-${i}`;
    const legendId = `${id}-legend`;
    const errorDescId = `${id}-desc-error`;
    const successDescId = `${id}-desc-valid`;
    const messagesWrapperId = `${id}-messages`;
    const radioName = (function useClosure() {
        const id = useId();
        return name_props !== null && name_props !== void 0 ? name_props : `radio-name-${id}`;
    })();
    return (React.createElement("fieldset", Object.assign({ id: id, className: cx(fr.cx("fr-fieldset", orientation === "horizontal" && "fr-fieldset--inline", (() => {
            switch (state) {
                case "default":
                    return undefined;
                case "error":
                    return "fr-fieldset--error";
                case "success":
                    return "fr-fieldset--valid";
            }
        })()), classes.root, className), disabled: disabled, style: style, "aria-labelledby": cx(legend !== undefined && legendId, messagesWrapperId), role: state === "default" ? undefined : "group" }, rest, { ref: ref }),
        legend !== undefined && (React.createElement("legend", { id: legendId, className: cx(fr.cx("fr-fieldset__legend", "fr-text--regular"), classes.legend) },
            legend,
            hintText !== undefined && (React.createElement("span", { className: fr.cx("fr-hint-text") }, hintText)))),
        React.createElement("div", { className: cx(fr.cx("fr-fieldset__content"), classes.content) }, options.map(({ label, hintText, nativeInputProps }, i) => (React.createElement("div", { className: fr.cx(`fr-${type}-group`, small && `fr-${type}-group--sm`), key: i },
            React.createElement("input", Object.assign({ type: type, id: getInputId(i), name: radioName }, nativeInputProps)),
            React.createElement("label", { className: fr.cx("fr-label"), htmlFor: getInputId(i) },
                label,
                hintText !== undefined && (React.createElement("span", { className: fr.cx("fr-hint-text") }, hintText))))))),
        React.createElement("div", { className: fr.cx("fr-messages-group"), id: messagesWrapperId, "aria-live": "assertive" }, stateRelatedMessage !== undefined && (React.createElement("p", { id: (() => {
                switch (state) {
                    case "error":
                        return errorDescId;
                    case "success":
                        return successDescId;
                }
            })(), className: fr.cx((() => {
                switch (state) {
                    case "error":
                        return "fr-error-text";
                    case "success":
                        return "fr-valid-text";
                }
            })(), "fr-message") }, stateRelatedMessage)))));
}));
Fieldset.displayName = symToStr({ Fieldset });
export default Fieldset;
//# sourceMappingURL=Fieldset.js.map