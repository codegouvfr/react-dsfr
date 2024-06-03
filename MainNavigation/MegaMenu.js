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
import { createComponentI18nApi } from "../i18n";
import { fr } from "../fr";
import { cx } from "../tools/cx";
import { assert } from "tsafe/assert";
import { getLink } from "../link";
import { generateValidHtmlId } from "../tools/generateValidHtmlId";
export const MegaMenu = memo(forwardRef((props, ref) => {
    var _a;
    const { id, classes = {}, style, leader, categories } = props, rest = __rest(props, ["id", "classes", "style", "leader", "categories"]);
    assert();
    const { t } = useTranslation();
    const { Link } = getLink();
    return (React.createElement("div", Object.assign({ className: cx(fr.cx("fr-mega-menu"), classes.root), style: style, tabIndex: -1, id: id, ref: ref }, rest),
        React.createElement("div", { className: fr.cx("fr-container", "fr-container--fluid", "fr-container-lg") },
            React.createElement("button", { className: fr.cx("fr-link--close", "fr-link"), "aria-controls": id }, t("close")),
            React.createElement("div", { className: fr.cx("fr-grid-row", "fr-grid-row-lg--gutters") },
                leader !== undefined && (React.createElement("div", { className: fr.cx("fr-col-12", "fr-col-lg-8", "fr-col-offset-lg-4--right", "fr-mb-4v") },
                    React.createElement("div", { className: cx(fr.cx("fr-mega-menu__leader"), classes.leader) },
                        React.createElement("h4", { className: fr.cx("fr-h4", "fr-mb-2v") }, leader.title),
                        React.createElement("p", { className: fr.cx("fr-hidden", "fr-displayed-lg") }, leader.paragraph),
                        leader.link !== undefined && (React.createElement(Link, Object.assign({}, leader.link.linkProps, { id: (_a = leader.link.linkProps.id) !== null && _a !== void 0 ? _a : `${id}-leader-link${generateValidHtmlId({
                                "text": leader.link.text
                            })}`, className: cx(fr.cx("fr-link", "fr-icon-arrow-right-line", "fr-link--icon-right", "fr-link--align-on-content"), leader.link.linkProps.className) }), leader.link.text))))),
                categories.map(({ categoryMainLink, links }, i) => {
                    var _a;
                    return (React.createElement("div", { className: fr.cx("fr-col-12", "fr-col-lg-3"), key: i },
                        React.createElement("h5", { className: cx(fr.cx("fr-mega-menu__category"), classes.category) },
                            React.createElement(Link, Object.assign({}, categoryMainLink.linkProps, { id: (_a = categoryMainLink.linkProps.id) !== null && _a !== void 0 ? _a : `${id}-category-link${generateValidHtmlId({
                                    "text": categoryMainLink.text
                                })}-${i}`, className: cx(fr.cx("fr-nav__link"), categoryMainLink.linkProps.className) }), categoryMainLink.text)),
                        React.createElement("ul", { className: cx(fr.cx("fr-mega-menu__list"), classes.list) }, links.map(({ linkProps, text, isActive }, j) => {
                            var _a;
                            return (React.createElement("li", { key: j },
                                React.createElement(Link, Object.assign({}, linkProps, { id: (_a = linkProps.id) !== null && _a !== void 0 ? _a : `${id}-link${generateValidHtmlId({
                                        "text": text
                                    })}-${i}-${j}`, className: cx(fr.cx("fr-nav__link"), linkProps.className) }, (!isActive ? {} : { "aria-current": "page" })), text)));
                        }))));
                })))));
}));
MegaMenu.displayName = symToStr({ MegaMenu });
const { useTranslation, addMegaMenuTranslations } = createComponentI18nApi({
    "componentName": symToStr({ MegaMenu }),
    "frMessages": {
        /* spell-checker: disable */
        "close": "Fermer"
        /* spell-checker: enable */
    }
});
addMegaMenuTranslations({
    "lang": "en",
    "messages": {
        "close": "Close"
    }
});
export { addMegaMenuTranslations };
export default MegaMenu;
//# sourceMappingURL=MegaMenu.js.map