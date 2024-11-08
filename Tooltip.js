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
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { cx } from "./tools/cx";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tooltip> */
export const Tooltip = memo(forwardRef((props, ref) => {
    const { id: id_prop, className, title, kind, style, children } = props, rest = __rest(props, ["id", "className", "title", "kind", "style", "children"]);
    assert();
    const { t } = useTranslation();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-tooltip",
        "explicitlyProvidedId": id_prop
    });
    const TooltipSpan = () => (React.createElement("span", { className: cx(fr.cx("fr-tooltip", "fr-placement"), className), id: id, ref: ref, style: style, role: "tooltip", "aria-hidden": "true" }, title));
    return (React.createElement(React.Fragment, null,
        kind === "click" ? (React.createElement("button", { className: fr.cx("fr-btn--tooltip", "fr-btn"), "aria-describedby": id, id: `tooltip-owner-${id}`, type: "button" }, t("tooltip-button-text"))) : typeof children === "undefined" ? (
        // mimic default tooltip style
        React.createElement("i", { className: fr.cx("fr-icon--sm", "fr-icon-question-line"), style: { color: fr.colors.decisions.text.actionHigh.blueFrance.default }, "aria-describedby": id, id: `tooltip-owner-${id}` })) : (React.createElement("span", { "aria-describedby": id, id: `tooltip-owner-${id}` }, children)),
        React.createElement(TooltipSpan, null)));
}));
Tooltip.displayName = symToStr({ Tooltip });
const { useTranslation, addTooltipTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Tooltip }),
    "frMessages": {
        "tooltip-button-text": "Information contextuelle"
    }
});
addTooltipTranslations({
    "lang": "en",
    "messages": {
        "tooltip-button-text": "Contextual information"
    }
});
export { addTooltipTranslations };
export default Tooltip;
//# sourceMappingURL=Tooltip.js.map