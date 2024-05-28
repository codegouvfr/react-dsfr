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
import React, { forwardRef, memo, useState, useEffect } from "react";
import { assert } from "tsafe/assert";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { symToStr } from "tsafe/symToStr";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-accordion>  */
export const Accordion = memo(forwardRef((props, ref) => {
    const { className, id: id_props, titleAs: HtmlTitleTag = "h3", label, classes = {}, style, children, expanded: expanded_props, defaultExpanded = false, onExpandedChange } = props, rest = __rest(props, ["className", "id", "titleAs", "label", "classes", "style", "children", "expanded", "defaultExpanded", "onExpandedChange"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-accordion",
        "explicitlyProvidedId": id_props
    });
    const collapseElementId = `${id}-collapse`;
    const [isExpanded, setIsExpanded] = useState(expanded_props !== null && expanded_props !== void 0 ? expanded_props : defaultExpanded);
    useEffect(() => {
        if (expanded_props === undefined) {
            return;
        }
        setIsExpanded(expanded_props);
    }, [expanded_props]);
    const onExtendButtonClick = useConstCallback((event) => {
        const isExpended_newValue = !isExpanded;
        onExpandedChange === null || onExpandedChange === void 0 ? void 0 : onExpandedChange(isExpended_newValue, event);
        if (expanded_props === undefined) {
            setIsExpanded(isExpended_newValue);
        }
    });
    return (React.createElement("section", Object.assign({ className: cx(fr.cx("fr-accordion"), className), style: style, ref: ref }, rest),
        React.createElement(HtmlTitleTag, { className: cx(fr.cx("fr-accordion__title"), classes.title) },
            React.createElement("button", { className: fr.cx("fr-accordion__btn"), "aria-expanded": isExpanded, "aria-controls": collapseElementId, onClick: onExtendButtonClick, type: "button", id: `${id}__toggle-btn` }, label)),
        React.createElement("div", { className: cx(fr.cx("fr-collapse"), classes.collapse), id: collapseElementId }, children)));
}));
Accordion.displayName = symToStr({ Accordion });
export default Accordion;
//# sourceMappingURL=Accordion.js.map