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
import React, { memo, forwardRef, useId } from "react";
import { createComponentI18nApi } from "../i18n";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { getLink } from "../link";
import { fr } from "../fr";
import { cx } from "../tools/cx";
import { Menu } from "./Menu";
import { MegaMenu } from "./MegaMenu";
import { useAnalyticsId } from "../tools/useAnalyticsId";
export const MainNavigation = memo(forwardRef((props, ref) => {
    const { className, items, classes = {}, style, id: id_props } = props, rest = __rest(props, ["className", "items", "classes", "style", "id"]);
    assert();
    const { t } = useTranslation();
    const { Link } = getLink();
    const { getMenuId } = (function useClosure() {
        const id = useId();
        const getMenuId = (i) => `menu-${id}-${i}`;
        return { getMenuId };
    })();
    const id = useAnalyticsId({
        "explicitlyProvidedId": id_props,
        "defaultIdPrefix": "main-navigation"
    });
    return (React.createElement("nav", Object.assign({ id: id, className: cx(fr.cx("fr-nav"), classes.root, className), style: style, role: "navigation", "aria-label": t("main menu"), ref: ref }, rest),
        React.createElement("ul", { className: cx(fr.cx("fr-nav__list"), classes.list) }, items.map(({ className, text, isActive = false, linkProps, menuLinks = [], megaMenu, buttonProps = {} }, i) => (React.createElement("li", { key: i, className: cx(fr.cx("fr-nav__item"), classes.item, className) }, linkProps !== undefined ? (React.createElement(Link, Object.assign({}, linkProps, { className: cx(fr.cx("fr-nav__link"), classes.link, linkProps.className) }, (isActive && { ["aria-current"]: "page" })), text)) : (React.createElement(React.Fragment, null,
            React.createElement("button", Object.assign({}, buttonProps, { className: cx(fr.cx("fr-nav__btn"), buttonProps.className, classes.btn), "aria-expanded": false, "aria-controls": getMenuId(i) }, (isActive && { ["aria-current"]: true })), text),
            menuLinks.length !== 0 && (React.createElement(Menu, { classes: {
                    "root": cx(fr.cx("fr-collapse"), classes.root),
                    "list": classes.menuList
                }, links: menuLinks, id: getMenuId(i) })),
            megaMenu !== undefined && (React.createElement(MegaMenu, { classes: {
                    "root": cx(fr.cx("fr-collapse"), classes.megaMenu),
                    "leader": classes.megaMenuLeader,
                    "category": classes.megaMenuCategory,
                    "list": classes.menuList
                }, id: getMenuId(i), leader: megaMenu.leader, categories: megaMenu.categories }))))))))));
}));
MainNavigation.displayName = symToStr({ MainNavigation });
export default MainNavigation;
const { useTranslation, addMainNavigationTranslations } = createComponentI18nApi({
    "componentName": symToStr({ MainNavigation }),
    "frMessages": {
        /* spell-checker: disable */
        "main menu": "Menu principal"
        /* spell-checker: enable */
    }
});
addMainNavigationTranslations({
    "lang": "en",
    "messages": {
        "main menu": "Main menu"
    }
});
export { addMainNavigationTranslations };
//# sourceMappingURL=MainNavigation.js.map