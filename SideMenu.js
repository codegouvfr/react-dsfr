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
import { getLink } from "./link";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-sidemenu> */
export const SideMenu = memo(forwardRef((props, ref) => {
    const { id: id_props, title, items, style, sticky, className, fullHeight, classes = {}, align = "left", burgerMenuButtonText } = props, rest = __rest(props, ["id", "title", "items", "style", "sticky", "className", "fullHeight", "classes", "align", "burgerMenuButtonText"]);
    assert();
    const { Link } = getLink();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-sidemenu",
        "explicitlyProvidedId": id_props
    });
    const collapseId = `${id}-collapse`;
    const titleId = `${id}-title`;
    const getItemId = (params) => {
        const { level, key } = params;
        return `fr-sidemenu-item-${id}-${level}-${key}`;
    };
    return (React.createElement("nav", Object.assign({ id: id }, rest, { ref: ref, style: style, "aria-labelledby": titleId, className: cx(fr.cx("fr-sidemenu", {
            "fr-sidemenu--right": align === "right",
            "fr-sidemenu--sticky": sticky && !fullHeight,
            "fr-sidemenu--sticky-full-height": sticky && fullHeight
        }), classes.root, className) }),
        React.createElement("div", { className: cx(fr.cx("fr-sidemenu__inner"), classes.inner) },
            React.createElement("button", { hidden: true, "aria-expanded": "false", "aria-controls": collapseId, className: cx(fr.cx("fr-sidemenu__btn"), classes.button) }, burgerMenuButtonText),
            React.createElement("div", { className: fr.cx("fr-collapse"), id: collapseId },
                title !== undefined && (React.createElement("div", { className: cx(fr.cx("fr-sidemenu__title"), classes.title), id: titleId }, title)),
                React.createElement("ul", { className: cx(fr.cx("fr-sidemenu__list"), classes.list) }, items.map((item, i) => {
                    const getItemRec = (params) => {
                        var _a;
                        const { item, key, level } = params;
                        const itemId = getItemId({ key, level });
                        return (React.createElement("li", { key: key, className: cx(fr.cx("fr-sidemenu__item"), classes.item) }, "items" in item ? (React.createElement(React.Fragment, null,
                            (() => {
                                var _a;
                                const ComponentToUse = item.linkProps !== undefined
                                    ? Link
                                    : "button";
                                return (
                                // @ts-expect-error
                                React.createElement(ComponentToUse, Object.assign({ "aria-expanded": ((_a = item.expandedByDefault) !== null && _a !== void 0 ? _a : false)
                                        ? "true"
                                        : "false", "aria-controls": itemId }, (item.isActive && {
                                    ["aria-current"]: true
                                }), { className: cx(fr.cx("fr-sidemenu__btn"), classes.button) }, item.linkProps), item.text));
                            })(),
                            React.createElement("div", { className: fr.cx("fr-collapse"), id: itemId },
                                React.createElement("ul", { className: cx(fr.cx("fr-sidemenu__list"), classes.list) }, item.items.map((item, i) => getItemRec({
                                    item,
                                    "key": `${key}-${i}`,
                                    "level": level + 1
                                })))))) : (React.createElement(Link, Object.assign({ target: "_self" }, item.linkProps, (item.isActive && {
                            ["aria-current"]: "page"
                        }), { className: cx(fr.cx("fr-sidemenu__link"), classes.link, (_a = item.linkProps) === null || _a === void 0 ? void 0 : _a.className) }), item.text))));
                    };
                    return getItemRec({
                        "key": `${i}`,
                        item,
                        "level": 0
                    });
                }))))));
}));
SideMenu.displayName = symToStr({ SideMenu });
export default SideMenu;
//# sourceMappingURL=SideMenu.js.map