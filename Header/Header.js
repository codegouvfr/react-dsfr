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
import { fr } from "../fr";
import { createComponentI18nApi } from "../i18n";
import { symToStr } from "tsafe/symToStr";
import { cx } from "../tools/cx";
import { getLink } from "../link";
import { assert } from "tsafe/assert";
import { MainNavigation } from "../MainNavigation";
import { Display } from "../Display/Display";
import { setBrandTopAndHomeLinkProps } from "../zz_internal/brandTopAndHomeLinkProps";
import { typeGuard } from "tsafe/typeGuard";
import { SearchButton } from "../SearchBar/SearchButton";
import { useTranslation as useSearchBarTranslation } from "../SearchBar/SearchBar";
export const headerMenuModalId = "header-menu-modal";
/** @see <https://components.react-dsfr.fr/?path=/docs/components-header> */
export const Header = memo(forwardRef((props, ref) => {
    const { className, brandTop, serviceTitle, serviceTagline, homeLinkProps, navigation = undefined, quickAccessItems = [], operatorLogo, renderSearchInput, onSearchButtonClick, classes = {}, style } = props, rest = __rest(props, ["className", "brandTop", "serviceTitle", "serviceTagline", "homeLinkProps", "navigation", "quickAccessItems", "operatorLogo", "renderSearchInput", "onSearchButtonClick", "classes", "style"]);
    assert();
    const isSearchBarEnabled = renderSearchInput !== undefined || onSearchButtonClick !== undefined;
    setBrandTopAndHomeLinkProps({ brandTop, homeLinkProps });
    const { menuButtonId, searchModalId, searchInputId } = (function useClosure() {
        const id = useId();
        const menuButtonId = `button-${id}`;
        const searchModalId = `modal-${id}`;
        const searchInputId = `search-${id}-input`;
        return {
            menuButtonId,
            searchModalId,
            searchInputId
        };
    })();
    const { t } = useTranslation();
    const { t: tSearchBar } = useSearchBarTranslation();
    const { Link } = getLink();
    const quickAccessNode = (React.createElement("ul", { className: fr.cx("fr-btns-group") }, quickAccessItems.map((quickAccessItem, i) => (React.createElement("li", { key: i }, !typeGuard(quickAccessItem, quickAccessItem instanceof Object && "text" in quickAccessItem) ? (quickAccessItem) : (React.createElement(HeaderQuickAccessItem, { quickAccessItem: quickAccessItem })))))));
    return (React.createElement(React.Fragment, null,
        React.createElement(Display, null),
        React.createElement("header", Object.assign({ role: "banner", className: cx(fr.cx("fr-header"), classes.root, className), ref: ref, style: style }, rest),
            React.createElement("div", { className: cx(fr.cx("fr-header__body"), classes.body) },
                React.createElement("div", { className: fr.cx("fr-container") },
                    React.createElement("div", { className: cx(fr.cx("fr-header__body-row"), classes.bodyRow) },
                        React.createElement("div", { className: cx(fr.cx("fr-header__brand", "fr-enlarge-link"), classes.brand) },
                            React.createElement("div", { className: cx(fr.cx("fr-header__brand-top"), classes.brandTop) },
                                React.createElement("div", { className: cx(fr.cx("fr-header__logo"), classes.logo) }, (() => {
                                    const children = (React.createElement("p", { className: fr.cx("fr-logo") }, brandTop));
                                    return serviceTitle !== undefined ? (children) : (React.createElement(Link, Object.assign({}, homeLinkProps), children));
                                })()),
                                operatorLogo !== undefined && (React.createElement("div", { className: cx(fr.cx("fr-header__operator"), classes.operator) },
                                    React.createElement(Link, Object.assign({}, homeLinkProps),
                                        React.createElement("img", { className: cx(fr.cx("fr-responsive-img"), classes.operator), style: (() => {
                                                switch (operatorLogo.orientation) {
                                                    case "vertical":
                                                        return { "width": "3.5rem" };
                                                    case "horizontal":
                                                        return {
                                                            "maxWidth": "9.0625rem"
                                                        };
                                                }
                                            })(), src: operatorLogo.imgUrl, alt: operatorLogo.alt })))),
                                (quickAccessItems.length > 0 ||
                                    navigation !== undefined ||
                                    isSearchBarEnabled) && (React.createElement("div", { className: cx(fr.cx("fr-header__navbar"), classes.navbar) },
                                    isSearchBarEnabled && (React.createElement("button", { className: fr.cx("fr-btn--search", "fr-btn"), "data-fr-opened": false, "aria-controls": searchModalId, title: tSearchBar("label") }, tSearchBar("label"))),
                                    React.createElement("button", { className: fr.cx("fr-btn--menu", "fr-btn"), "data-fr-opened": "false", "aria-controls": headerMenuModalId, "aria-haspopup": "menu", id: menuButtonId, title: t("menu") }, t("menu"))))),
                            serviceTitle !== undefined && (React.createElement("div", { className: cx(fr.cx("fr-header__service"), classes.service) },
                                React.createElement(Link, Object.assign({}, homeLinkProps),
                                    React.createElement("p", { className: cx(fr.cx("fr-header__service-title"), classes.serviceTitle) }, serviceTitle)),
                                serviceTagline !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-header__service-tagline"), classes.serviceTagline) }, serviceTagline))))),
                        (quickAccessItems.length > 0 || isSearchBarEnabled) && (React.createElement("div", { className: fr.cx("fr-header__tools") },
                            quickAccessItems.length > 0 && (React.createElement("div", { className: cx(fr.cx("fr-header__tools-links"), classes.toolsLinks) }, quickAccessNode)),
                            isSearchBarEnabled && (React.createElement("div", { className: fr.cx("fr-header__search", "fr-modal"), id: searchModalId },
                                React.createElement("div", { className: fr.cx("fr-container", "fr-container-lg--fluid") },
                                    React.createElement("button", { className: fr.cx("fr-btn--close", "fr-btn"), "aria-controls": searchModalId, title: t("close") }, t("close")),
                                    React.createElement("div", { className: fr.cx("fr-search-bar"), role: "search" },
                                        React.createElement("label", { className: fr.cx("fr-label"), htmlFor: searchInputId }, tSearchBar("label")),
                                        (renderSearchInput !== null && renderSearchInput !== void 0 ? renderSearchInput : (({ className, id, placeholder, type }) => (React.createElement("input", { className: className, id: id, placeholder: placeholder, type: type }))))({
                                            "className": fr.cx("fr-input"),
                                            "id": searchInputId,
                                            "placeholder": tSearchBar("label"),
                                            "type": "search"
                                        }),
                                        React.createElement(SearchButton, { searchInputId: searchInputId, onClick: onSearchButtonClick })))))))))),
            (navigation !== undefined || quickAccessItems.length !== 0) && (React.createElement("div", { className: cx(fr.cx("fr-header__menu", "fr-modal"), classes.menu), id: headerMenuModalId, "aria-labelledby": menuButtonId },
                React.createElement("div", { className: fr.cx("fr-container") },
                    React.createElement("button", { className: fr.cx("fr-btn--close", "fr-btn"), "aria-controls": headerMenuModalId, title: t("close") }, t("close")),
                    React.createElement("div", { className: cx(fr.cx("fr-header__menu-links"), classes.menuLinks) }, quickAccessNode),
                    navigation !== undefined &&
                        (navigation instanceof Array ? (React.createElement(MainNavigation, { items: navigation })) : (navigation))))))));
}));
Header.displayName = symToStr({ Header });
export default Header;
export const { useTranslation, addHeaderTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Header }),
    "frMessages": {
        /* spell-checker: disable */
        "menu": "Menu",
        "close": "Fermer"
        /* spell-checker: enable */
    }
});
addHeaderTranslations({
    "lang": "en",
    "messages": {
        "close": "Close"
    }
});
export function HeaderQuickAccessItem(props) {
    const { className, quickAccessItem } = props;
    const { Link } = getLink();
    return quickAccessItem.linkProps !== undefined ? (React.createElement(Link, Object.assign({}, quickAccessItem.linkProps, { className: cx(fr.cx("fr-btn", quickAccessItem.iconId), quickAccessItem.linkProps.className, className) }), quickAccessItem.text)) : (React.createElement("button", Object.assign({}, quickAccessItem.buttonProps, { className: cx(fr.cx("fr-btn", quickAccessItem.iconId), quickAccessItem.buttonProps.className, className) }), quickAccessItem.text));
}
//# sourceMappingURL=Header.js.map