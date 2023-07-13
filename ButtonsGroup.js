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
import { Button } from "./Button";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.fr/?path=/docs/components-buttonsgroup> */
export const ButtonsGroup = memo(forwardRef((props, ref) => {
    const { id: props_id, className, buttonsSize = "medium", buttonsIconPosition = "left", inlineLayoutWhen = "never", alignment = "left", buttonsEquisized = false, isReverseOrder = false, buttons, style } = props, rest = __rest(props, ["id", "className", "buttonsSize", "buttonsIconPosition", "inlineLayoutWhen", "alignment", "buttonsEquisized", "isReverseOrder", "buttons", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-btns-group",
        "explicitlyProvidedId": props_id
    });
    const buttonsGroupClassName = cx(fr.cx("fr-btns-group", buttonsSize !== "medium" &&
        `fr-btns-group--${(() => {
            switch (buttonsSize) {
                case "small":
                    return "sm";
                case "large":
                    return "lg";
            }
        })()}`, inlineLayoutWhen !== "never" &&
        `fr-btns-group--inline${(() => {
            switch (inlineLayoutWhen) {
                case "always":
                    return "";
                case "sm and up":
                    return "-sm";
                case "md and up":
                    return "-md";
                case "lg and up":
                    return "-lg";
            }
        })()}`, buttonsEquisized && `fr-btns-group--equisized`, `fr-btns-group--${alignment}`, isReverseOrder && "fr-btns-group--inline-reverse", `fr-btns-group--icon-${buttonsIconPosition}`), className);
    return (React.createElement("ul", Object.assign({ id: id, className: buttonsGroupClassName, style: style, ref: ref }, rest), buttons.map((buttonProps, i) => (React.createElement("li", { key: i },
        React.createElement(Button, Object.assign({}, buttonProps)))))));
}));
ButtonsGroup.displayName = symToStr({ ButtonsGroup });
export default ButtonsGroup;
//# sourceMappingURL=ButtonsGroup.js.map