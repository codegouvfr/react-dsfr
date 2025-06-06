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
const getSize = (size) => {
    switch (size) {
        case "small":
            return "1.25em";
        case "medium":
            return "1.5em";
        case "large":
            return "2.5em";
        case "inherit":
            return "inherit";
        default:
            return size;
    }
};
export const IconWrapper = memo((_a) => {
    var { children, fontSize = "medium" } = _a, props = __rest(_a, ["children", "fontSize"]);
    return (React.createElement("svg", Object.assign({ width: "1em", height: "1em", fill: "none", viewBox: "0 0 80 80", xmlns: "http://www.w3.org/2000/svg", focusable: "false", "aria-hidden": "true", fontSize: getSize(fontSize) }, props), children));
});
export function createIcon(SvgPath, displayName) {
    const IconComponent = props => (React.createElement(IconWrapper, Object.assign({}, props), SvgPath));
    IconComponent.displayName = displayName;
    return IconComponent;
}
//# sourceMappingURL=IconWrapper.js.map