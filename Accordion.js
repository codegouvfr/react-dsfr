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
import React, { forwardRef, memo, useState } from "react";
import { assert } from "tsafe/assert";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { symToStr } from "tsafe/symToStr";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-accordion>  */
export const Accordion = memo(forwardRef((props, ref) => {
    const { className, id: id_props, titleAs: HtmlTitleTag = "h3", label, classes = {}, style, children, expanded: expandedProp, defaultExpanded = false, onExpandedChange } = props, rest = __rest(props, ["className", "id", "titleAs", "label", "classes", "style", "children", "expanded", "defaultExpanded", "onExpandedChange"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-accordion",
        "explicitlyProvidedId": id_props
    });
    const collapseElementId = `${id}-collapse`;
    const [expandedState, setExpandedState] = useState(defaultExpanded);
    const value = expandedProp ? expandedProp : expandedState;
    const onExtendButtonClick = useConstCallback((event) => {
        setExpandedState(!value);
        onExpandedChange === null || onExpandedChange === void 0 ? void 0 : onExpandedChange(!value, event);
    });
    return (React.createElement("section", Object.assign({ className: cx(fr.cx("fr-accordion"), className), style: style, ref: ref }, rest),
        React.createElement(HtmlTitleTag, { className: cx(fr.cx("fr-accordion__title"), classes.title) },
            React.createElement("button", { className: fr.cx("fr-accordion__btn"), "aria-expanded": value, "aria-controls": collapseElementId, onClick: onExtendButtonClick, type: "button" }, label)),
        React.createElement("div", { className: cx(fr.cx("fr-collapse"), classes.collapse), id: collapseElementId }, children)));
}));
Accordion.displayName = symToStr({ Accordion });
export default Accordion;
//# sourceMappingURL=Accordion.js.map