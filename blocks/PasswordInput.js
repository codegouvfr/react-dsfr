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
import React, { forwardRef, memo, useId } from "react";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { fr } from "../fr";
import { createComponentI18nApi } from "../i18n";
import { cx } from "../tools/cx";
/**
 * @see <https://react-dsfr-components.etalab.studio/?path=/docs/blocks-passwordinput
 * */
export const PasswordInput = memo(forwardRef((props, ref) => {
    const { t } = useTranslation();
    const { className, label, hintText, hideLabel, disabled = false, classes = {}, style, messages = [], nativeInputProps, messagesHint = t("your password must contain") } = props, rest = __rest(props, ["className", "label", "hintText", "hideLabel", "disabled", "classes", "style", "messages", "nativeInputProps", "messagesHint"]);
    assert();
    const inputId = (function useClosure() {
        var _a;
        const id = useId();
        return (_a = nativeInputProps === null || nativeInputProps === void 0 ? void 0 : nativeInputProps.id) !== null && _a !== void 0 ? _a : `password-${id}`;
    })();
    const containerId = `${inputId}-container`;
    const togglePasswordShowId = `${inputId}-toggle-show`;
    const messagesGroupId = `${inputId}-messages-group`;
    const messageGroupId = `${inputId}-message-group`;
    const hasError = messages.find(({ severity }) => severity === "error") !== undefined;
    const isSuccess = messages.length !== 0 &&
        messages.find(({ severity }) => severity !== "valid") === undefined;
    return (React.createElement("div", Object.assign({ className: cx(fr.cx("fr-password", disabled && "fr-input-group--disabled", hasError && "fr-input-group--error", isSuccess && "fr-input-group--valid"), classes.root, className), id: containerId, style: style, ref: ref }, rest),
        React.createElement("label", { className: cx(fr.cx("fr-label", hideLabel && "fr-sr-only"), classes.label), htmlFor: inputId },
            label,
            hintText !== undefined && React.createElement("span", { className: "fr-hint-text" }, hintText)),
        React.createElement("div", { className: fr.cx("fr-input-wrap") },
            React.createElement("input", Object.assign({}, nativeInputProps, { className: cx(fr.cx("fr-password__input", "fr-input"), classes.input), id: inputId, type: "password", disabled: disabled }, (messages.length !== 0 && { "aria-describedby": messagesGroupId })))),
        messages.length !== 0 && (React.createElement("div", { className: fr.cx("fr-messages-group"), id: messagesGroupId, "aria-live": "assertive" },
            messagesHint !== "" && (React.createElement("p", { className: fr.cx("fr-message"), id: messageGroupId }, messagesHint)),
            messages.map(({ severity, message }, index) => (React.createElement("p", { key: index, className: fr.cx("fr-message", `fr-message--${severity}`), id: `${messageGroupId}-${index}` }, message))))),
        React.createElement("div", { className: cx(fr.cx("fr-password__checkbox", "fr-checkbox-group", "fr-checkbox-group--sm"), classes.checkbox) },
            React.createElement("input", { "aria-label": t("show password"), id: togglePasswordShowId, type: "checkbox", disabled: disabled || undefined }),
            React.createElement("label", { className: cx(fr.cx("fr-password__checkbox", "fr-label"), classes.checkbox), htmlFor: togglePasswordShowId }, t("show")))));
}));
const { useTranslation, addPasswordInputTranslations } = createComponentI18nApi({
    "componentName": symToStr({ PasswordInput }),
    "frMessages": {
        /* spell-checker: disable */
        "show": "Afficher",
        "show password": "Afficher le mot de passe",
        "your password must contain": "Votre mot de passe doit contenir :"
        /* spell-checker: enable */
    }
});
addPasswordInputTranslations({
    "lang": "en",
    "messages": {
        "show": "Show",
        "show password": "Show password",
        "your password must contain": "Your password must contain:"
    }
});
addPasswordInputTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "show": "Mostrar",
        "show password": "Mostrar contraseña",
        "your password must contain": "Su contraseña debe contener:"
        /* spell-checker: enable */
    }
});
PasswordInput.displayName = symToStr({ PasswordInput });
export default PasswordInput;
//# sourceMappingURL=PasswordInput.js.map