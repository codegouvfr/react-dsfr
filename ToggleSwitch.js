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
import React, { memo, forwardRef, useState, useEffect } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { createComponentI18nApi } from "./i18n";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.fr/?path=/docs/components-toggleswitch> */
export const ToggleSwitch = memo(forwardRef((props, ref) => {
    const { id: id_props, className, label, helperText, defaultChecked = false, checked: props_checked, showCheckedHint = true, disabled = false, labelPosition = "right", classes = {}, onChange, inputTitle, style, name } = props, rest = __rest(props, ["id", "className", "label", "helperText", "defaultChecked", "checked", "showCheckedHint", "disabled", "labelPosition", "classes", "onChange", "inputTitle", "style", "name"]);
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-toggle",
        "explicitlyProvidedId": id_props
    });
    const inputId = `${id}-input`;
    const hintId = `${id}-hint-text`;
    const [checked, setChecked] = useState(defaultChecked);
    useEffect(() => {
        if (defaultChecked === undefined) {
            return;
        }
        setChecked(defaultChecked);
    }, [defaultChecked]);
    assert();
    const { t } = useTranslation();
    const onInputChange = useConstCallback((e) => {
        const checked = e.currentTarget.checked;
        if (props_checked === undefined) {
            setChecked(checked);
            onChange === null || onChange === void 0 ? void 0 : onChange(checked, e);
        }
        else {
            onChange(checked, e);
        }
    });
    return (React.createElement("div", { id: id, className: cx(fr.cx("fr-toggle", labelPosition === "left" && "fr-toggle--label-left"), classes.root, className), ref: ref, style: style },
        React.createElement("input", { onChange: onInputChange, type: "checkbox", disabled: disabled || undefined, className: cx(fr.cx("fr-toggle__input"), classes.input), "aria-describedby": hintId, id: inputId, title: inputTitle, checked: props_checked !== null && props_checked !== void 0 ? props_checked : checked, name: name }),
        React.createElement("label", Object.assign({ className: cx(fr.cx("fr-toggle__label"), classes.label), htmlFor: inputId }, (showCheckedHint && {
            "data-fr-checked-label": t("checked"),
            "data-fr-unchecked-label": t("unchecked")
        })), label),
        helperText && (React.createElement("p", { className: cx(fr.cx("fr-hint-text"), classes.hint), id: hintId }, helperText))));
}));
ToggleSwitch.displayName = symToStr({ ToggleSwitch });
const { useTranslation, addToggleSwitchTranslations } = createComponentI18nApi({
    "componentName": symToStr({ ToggleSwitch }),
    "frMessages": {
        /* spell-checker: disable */
        "checked": "Activé",
        "unchecked": "Désactivé"
        /* spell-checker: enable */
    }
});
addToggleSwitchTranslations({
    "lang": "en",
    "messages": {
        "checked": "Active",
        "unchecked": "Inactive"
    }
});
export { addToggleSwitchTranslations };
export default ToggleSwitch;
//# sourceMappingURL=ToggleSwitch.js.map