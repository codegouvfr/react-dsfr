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
import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { fr } from "../fr";
import { cx } from "../tools/cx";
import { assert } from "tsafe/assert";
import { getLink } from "../link";
import { generateValidHtmlId } from "../tools/generateValidHtmlId";
export const Menu = memo(forwardRef((props, ref) => {
    const { id, classes = {}, style, links } = props, rest = __rest(props, ["id", "classes", "style", "links"]);
    assert();
    const { Link } = getLink();
    return (React.createElement("div", Object.assign({ className: cx(fr.cx("fr-menu"), classes.root), style: style, id: id, ref: ref }, rest),
        React.createElement("ul", { className: cx(fr.cx("fr-menu__list"), classes.list) }, links.map(({ text, linkProps, isActive = false }, i) => {
            var _a;
            return (React.createElement("li", { key: i },
                React.createElement(Link, Object.assign({}, linkProps, { id: (_a = linkProps.id) !== null && _a !== void 0 ? _a : `${id}-link${generateValidHtmlId({
                        text
                    })}-${i}`, className: cx(fr.cx("fr-nav__link"), linkProps.className) }, (isActive && { ["aria-current"]: "page" })), text)));
        }))));
}));
Menu.displayName = symToStr({ Menu });
export default Menu;
//# sourceMappingURL=Menu.js.map