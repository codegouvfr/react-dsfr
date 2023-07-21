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
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { symToStr } from "tsafe/symToStr";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/tableau>  */
export const Table = memo(forwardRef((props, ref) => {
    const { id: id_props, data, headers, caption, bordered = false, noScroll = false, fixed = false, noCaption = false, bottomCaption = false, colorVariant, className, style } = props, rest = __rest(props, ["id", "data", "headers", "caption", "bordered", "noScroll", "fixed", "noCaption", "bottomCaption", "colorVariant", "className", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-table",
        "explicitlyProvidedId": id_props
    });
    return (React.createElement("div", { id: id, ref: ref, style: style, className: cx(fr.cx("fr-table", {
            "fr-table--bordered": bordered,
            "fr-table--no-scroll": noScroll,
            "fr-table--layout-fixed": fixed,
            "fr-table--no-caption": noCaption,
            "fr-table--caption-bottom": bottomCaption
        }, colorVariant !== undefined && `fr-table--${colorVariant}`), className) },
        React.createElement("table", null,
            caption !== undefined && React.createElement("caption", null, caption),
            headers !== undefined && (React.createElement("thead", null,
                React.createElement("tr", null, headers.map((header, i) => (React.createElement("th", { key: i, scope: "col" }, header)))))),
            React.createElement("tbody", null, data.map((row, i) => (React.createElement("tr", { key: i }, row.map((col, j) => (React.createElement("td", { key: j }, col))))))))));
}));
Table.displayName = symToStr({ Table });
export default Table;
//# sourceMappingURL=Table.js.map