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
import React, { memo } from "react";
import { assert } from "tsafe/assert";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { ToggleSwitch } from "./ToggleSwitch";
/** @see <https://components.react-dsfr.fr/?path=/docs/components-toggleswitchgroup> */
export const ToggleSwitchGroup = memo(props => {
    const { className, toggles, showCheckedHint = true, labelPosition = "right", classes = {}, style } = props, rest = __rest(props, ["className", "toggles", "showCheckedHint", "labelPosition", "classes", "style"]);
    assert();
    return (React.createElement("ul", Object.assign({ className: cx(fr.cx("fr-toggle__list"), classes.root, className), style: style }, rest), toggles.map((toggleSwitchProps, i) => (React.createElement("li", { key: i, className: classes.li },
        React.createElement(ToggleSwitch, Object.assign({}, toggleSwitchProps, { showCheckedHint: showCheckedHint, labelPosition: labelPosition })))))));
});
export default ToggleSwitchGroup;
//# sourceMappingURL=ToggleSwitchGroup.js.map