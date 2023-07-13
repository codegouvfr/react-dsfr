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
import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.fr/?path=/docs/components-badge> */
export const Badge = memo(forwardRef((props, ref) => {
    const { id: props_id, className, style, severity, small: isSmall = false, noIcon = false, children } = props, rest = __rest(props, ["id", "className", "style", "severity", "small", "noIcon", "children"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-badge",
        "explicitlyProvidedId": props_id
    });
    return (React.createElement("p", Object.assign({ id: id, className: cx(fr.cx("fr-badge", severity !== undefined && `fr-badge--${severity}`, { "fr-badge--sm": isSmall }, { "fr-badge--no-icon": noIcon || severity === undefined }), className), style: style, ref: ref }, rest), children));
}));
Badge.displayName = symToStr({ Badge });
export default Badge;
//# sourceMappingURL=Badge.js.map