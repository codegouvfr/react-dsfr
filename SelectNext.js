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
import { createComponentI18nApi } from "./i18n";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import { exclude } from "tsafe/exclude";
/**
 * @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-select>
 * */
function NonMemoizedNonForwardedSelect(props, ref) {
    var _a;
    const { id: id_props, className, label, hint, nativeSelectProps, disabled = (_a = nativeSelectProps === null || nativeSelectProps === void 0 ? void 0 : nativeSelectProps.disabled) !== null && _a !== void 0 ? _a : false, options, state = "default", stateRelatedMessage, placeholder, style } = props, rest = __rest(props, ["id", "className", "label", "hint", "nativeSelectProps", "disabled", "options", "state", "stateRelatedMessage", "placeholder", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-select-group",
        "explicitlyProvidedId": id_props
    });
    const { selectId, stateDescriptionId } = (function useClosure() {
        const selectIdExplicitlyProvided = nativeSelectProps === null || nativeSelectProps === void 0 ? void 0 : nativeSelectProps.id;
        const elementId = useId();
        const selectId = selectIdExplicitlyProvided !== null && selectIdExplicitlyProvided !== void 0 ? selectIdExplicitlyProvided : `select-${elementId}`;
        const stateDescriptionId = selectIdExplicitlyProvided !== undefined
            ? `${selectIdExplicitlyProvided}-desc`
            : `select-${elementId}-desc`;
        return { selectId, stateDescriptionId };
    })();
    const { t } = useTranslation();
    return (React.createElement("div", Object.assign({ id: id, className: cx(fr.cx("fr-select-group", disabled && "fr-select-group--disabled", state !== "default" && `fr-select-group--${state}`), className), ref: ref, style: style }, rest),
        Boolean(label || hint) && (React.createElement("label", { className: fr.cx("fr-label"), htmlFor: selectId },
            label,
            hint !== undefined && React.createElement("span", { className: fr.cx("fr-hint-text") }, hint))),
        React.createElement("select", Object.assign({}, nativeSelectProps, (() => {
            const isControlled = nativeSelectProps !== undefined && "value" in nativeSelectProps;
            const isEmptyValueSelected = isControlled
                ? nativeSelectProps.value === undefined
                : options.find(option => option.selected) === undefined;
            if (isControlled) {
                return isEmptyValueSelected ? { "value": "" } : {};
            }
            return {
                "defaultValue": isEmptyValueSelected
                    ? ""
                    : (() => {
                        const selectedOption = options.find(option => option.selected);
                        assert(selectedOption !== undefined);
                        return selectedOption.value;
                    })()
            };
        })(), { className: cx(fr.cx("fr-select"), nativeSelectProps === null || nativeSelectProps === void 0 ? void 0 : nativeSelectProps.className), id: selectId, "aria-describedby": stateDescriptionId, disabled: disabled }), [
            options.find(option => option.value === "") !== undefined
                ? undefined
                : {
                    "label": placeholder === undefined ? t("select an option") : placeholder,
                    "value": "",
                    "disabled": true
                },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ...options.map((_a) => {
                var { selected } = _a, option = __rest(_a, ["selected"]);
                return option;
            })
        ]
            .filter(exclude(undefined))
            .map((_a, index) => {
            var { label } = _a, option = __rest(_a, ["label"]);
            return (React.createElement("option", Object.assign({}, option, { key: `${option.value}-${index}` }), label));
        })),
        state !== "default" && (React.createElement("p", { id: stateDescriptionId, className: fr.cx(`fr-${state}-text`) }, stateRelatedMessage))));
}
export const Select = memo(forwardRef(NonMemoizedNonForwardedSelect));
Select.displayName = symToStr({ Select });
export default Select;
const { useTranslation, addSelectTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Select }),
    "frMessages": {
        "select an option": "Sélectionner une option"
    }
});
addSelectTranslations({
    "lang": "en",
    "messages": {
        "select an option": "Select an option"
    }
});
export { addSelectTranslations };
//# sourceMappingURL=SelectNext.js.map