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
import { forwardRef, memo, useId } from "react";
import { assert } from "tsafe";
import { fr } from "./fr";
import React from "react";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-segmented-control> */
export const SegmentedControl = memo(forwardRef((props, ref) => {
    const { id: props_id, name: props_name, className, classes = {}, style, small = false, segments, hideLegend, inlineLegend, legend, hintText } = props, rest = __rest(props, ["id", "name", "className", "classes", "style", "small", "segments", "hideLegend", "inlineLegend", "legend", "hintText"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": `fr-segmented${props_name === undefined ? "" : `-${props_name}`}`,
        "explicitlyProvidedId": props_id
    });
    const getInputId = (i) => `${id}-${i}`;
    const segmentedName = (function useClosure() {
        const id = useId();
        return props_name !== null && props_name !== void 0 ? props_name : `segmented-name-${id}`;
    })();
    return (React.createElement("fieldset", Object.assign({ id: id, className: cx(fr.cx("fr-segmented", small && "fr-segmented--sm", hideLegend && "fr-segmented--no-legend"), classes.root, className), ref: ref, style: style }, rest),
        legend !== undefined && (React.createElement("legend", { className: cx(fr.cx("fr-segmented__legend", inlineLegend && "fr-segmented__legend--inline"), classes.legend) },
            legend,
            hintText !== undefined && (React.createElement("span", { className: cx(fr.cx("fr-hint-text"), classes.hintText) }, hintText)))),
        React.createElement("div", { className: cx(fr.cx("fr-segmented__elements"), classes.elements) }, segments.map((segment, index) => {
            if (!segment)
                return null;
            const segmentId = getInputId(index);
            return (React.createElement("div", { className: cx(fr.cx("fr-segmented__element"), classes["element-each"]), key: index },
                React.createElement("input", Object.assign({}, segment.nativeInputProps, { id: segmentId, name: segmentedName, type: "radio" })),
                React.createElement("label", { className: cx(fr.cx(segment.iconId !== undefined && segment.iconId, "fr-label"), classes["element-each__label"]), htmlFor: segmentId }, segment.label)));
        }))));
}));
//# sourceMappingURL=SegmentedControl.js.map