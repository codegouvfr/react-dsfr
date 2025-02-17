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
import React, { memo, forwardRef, useEffect, useState } from "react";
import { prDsfrLoaded } from "../start";
import { useAnalyticsId } from "../tools/useAnalyticsId";
import { cx } from "../tools/cx";
const typeSafeObjectFromEntries = (entries) => {
    return Object.fromEntries(entries);
};
const typeSafeObjectEntries = (obj) => {
    return Object.entries(obj);
};
export const stringifyObjectValue = (obj) => typeSafeObjectFromEntries(typeSafeObjectEntries(obj).map(([k, v]) => [
    k,
    typeof v === "string" ? v : JSON.stringify(v)
]));
export const chartWrapper = (ChartComponent, idPrefix) => {
    return memo(forwardRef((props, ref) => {
        const [isDsfrLoaded, setIsDsfrLoaded] = useState(false);
        const { className, style, classes = {}, id: props_id } = props, rest = __rest(props, ["className", "style", "classes", "id"]);
        const graphProps = rest;
        useEffect(() => {
            prDsfrLoaded.then(() => setIsDsfrLoaded(true));
        });
        const id = useAnalyticsId({
            "defaultIdPrefix": `fr-chart-${idPrefix}`,
            "explicitlyProvidedId": props_id
        });
        if (!isDsfrLoaded) {
            return null;
        }
        return (React.createElement("div", { id: id, className: cx(className, classes.root), style: style, ref: ref },
            React.createElement(ChartComponent, Object.assign({}, graphProps))));
    }));
};
//# sourceMappingURL=chartWrapper.js.map