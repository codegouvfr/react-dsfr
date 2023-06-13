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
import { getLink } from "./link";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import { createComponentI18nApi } from "./i18n";
import { id } from "tsafe/id";
import { getBrandTopAndHomeLinkProps } from "./zz_internal/brandTopAndHomeLinkProps";
import { typeGuard } from "tsafe/typeGuard";
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-footer> */
export const Footer = memo(forwardRef((props, ref) => {
    const { className, classes = {}, contentDescription, websiteMapLinkProps, accessibilityLinkProps, accessibility, termsLinkProps, personalDataLinkProps, cookiesManagementLinkProps, cookiesManagementButtonProps, bottomItems = [], partnersLogos, operatorLogo, license, brandTop: brandTop_prop, homeLinkProps: homeLinkProps_prop, style, linkList } = props, rest = __rest(props, ["className", "classes", "contentDescription", "websiteMapLinkProps", "accessibilityLinkProps", "accessibility", "termsLinkProps", "personalDataLinkProps", "cookiesManagementLinkProps", "cookiesManagementButtonProps", "bottomItems", "partnersLogos", "operatorLogo", "license", "brandTop", "homeLinkProps", "style", "linkList"]);
    assert();
    const { brandTop, homeLinkProps } = (() => {
        const wrap = getBrandTopAndHomeLinkProps();
        const brandTop = brandTop_prop !== null && brandTop_prop !== void 0 ? brandTop_prop : wrap === null || wrap === void 0 ? void 0 : wrap.brandTop;
        const homeLinkProps = homeLinkProps_prop !== null && homeLinkProps_prop !== void 0 ? homeLinkProps_prop : wrap === null || wrap === void 0 ? void 0 : wrap.homeLinkProps;
        const exceptionMessage = " hasn't been provided to the Footer and we cannot retrieve it from the Header (it's probably client side)";
        if (brandTop === undefined) {
            throw new Error(symToStr({ brandTop }) + exceptionMessage);
        }
        if (homeLinkProps === undefined) {
            throw new Error(symToStr({ homeLinkProps }) + exceptionMessage);
        }
        return { brandTop, homeLinkProps };
    })();
    const { Link } = getLink();
    const { t } = useTranslation();
    const { main: mainPartnersLogo, sub: subPartnersLogos = [] } = partnersLogos !== null && partnersLogos !== void 0 ? partnersLogos : {};
    return (React.createElement("footer", Object.assign({ className: cx(fr.cx("fr-footer"), classes.root, className), role: "contentinfo", id: "footer", ref: ref, style: style }, rest),
        linkList !== undefined && (React.createElement("div", { className: fr.cx("fr-footer__top") },
            React.createElement("div", { className: fr.cx("fr-container") },
                React.createElement("div", { className: fr.cx("fr-grid-row", 
                    // "fr-grid-row--start", // why is this class used in dsfr doc?
                    "fr-grid-row--gutters") }, linkList.map((column, columnIndex) => column !== undefined && (React.createElement("div", { key: `fr-footer__top-cat-${columnIndex}`, className: fr.cx("fr-col-12", "fr-col-sm-3", "fr-col-md-2") },
                    (column === null || column === void 0 ? void 0 : column.categoryName) && (React.createElement("h3", { className: fr.cx("fr-footer__top-cat") }, column === null || column === void 0 ? void 0 : column.categoryName)),
                    React.createElement("ul", { className: fr.cx("fr-footer__top-list") }, column === null || column === void 0 ? void 0 : column.links.map((linkItem, linkItemIndex) => (React.createElement("li", { key: `fr-footer__top-link-${linkItemIndex}` },
                        React.createElement(Link, Object.assign({}, linkItem === null || linkItem === void 0 ? void 0 : linkItem.linkProps, { className: fr.cx("fr-footer__top-link") }), linkItem === null || linkItem === void 0 ? void 0 : linkItem.text)))))))))))),
        React.createElement("div", { className: fr.cx("fr-container") },
            React.createElement("div", { className: cx(fr.cx("fr-footer__body"), classes.body) },
                React.createElement("div", { className: cx(fr.cx("fr-footer__brand", "fr-enlarge-link"), classes.brand) },
                    (() => {
                        const children = React.createElement("p", { className: fr.cx("fr-logo") }, brandTop);
                        return operatorLogo !== undefined ? (children) : (React.createElement(Link, Object.assign({}, homeLinkProps), children));
                    })(),
                    operatorLogo !== undefined && (React.createElement(Link, Object.assign({}, homeLinkProps, { className: cx(fr.cx("fr-footer__brand-link"), classes.brandLink, homeLinkProps.className) }),
                        React.createElement("img", { className: cx(fr.cx("fr-footer__logo"), classes.logo), style: (() => {
                                switch (operatorLogo.orientation) {
                                    case "vertical":
                                        return { "width": "3.5rem" };
                                    case "horizontal":
                                        return { "maxWidth": "9.0625rem" };
                                }
                            })(), src: operatorLogo.imgUrl, alt: operatorLogo.alt })))),
                React.createElement("div", { className: cx(fr.cx("fr-footer__content"), classes.content) },
                    contentDescription !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-footer__content-desc"), classes.contentDesc) }, contentDescription)),
                    React.createElement("ul", { className: cx(fr.cx("fr-footer__content-list"), classes.contentList) }, [
                        "legifrance.gouv.fr",
                        "gouvernement.fr",
                        "service-public.fr",
                        "data.gouv.fr"
                    ].map((domain, i) => (React.createElement("li", { className: cx(fr.cx("fr-footer__content-item"), classes.contentItem), key: i },
                        React.createElement("a", { className: cx(fr.cx("fr-footer__content-link"), classes.contentLink), target: "_blank", href: `https://${domain}` }, domain))))))),
            partnersLogos !== undefined && (React.createElement("div", { className: cx(fr.cx("fr-footer__partners"), classes.partners) },
                React.createElement("h4", { className: cx(fr.cx("fr-footer__partners-title"), classes.partnersTitle) }, t("our partners")),
                React.createElement("div", { className: cx(fr.cx("fr-footer__partners-logos"), classes.partnersLogos) },
                    React.createElement("div", { className: cx(fr.cx("fr-footer__partners-main"), classes.partnersMain) }, mainPartnersLogo !== undefined && (React.createElement("a", { href: mainPartnersLogo.href, className: cx(fr.cx("fr-footer__partners-link"), classes.partnersLink) },
                        React.createElement("img", { alt: mainPartnersLogo.alt, style: { height: "5.625rem" }, src: mainPartnersLogo.imgUrl, className: cx(fr.cx("fr-footer__logo"), classes.logo) })))),
                    subPartnersLogos.length !== 0 && (React.createElement("div", { className: cx(fr.cx("fr-footer__partners-sub"), classes.partnersSub) },
                        React.createElement("ul", null, subPartnersLogos.map((logo, i) => (React.createElement("li", { key: i },
                            React.createElement("a", { href: logo.href, className: cx(fr.cx("fr-footer__partners-link"), classes.partnersLink) },
                                React.createElement("img", { alt: logo.alt, src: logo.imgUrl, style: { "height": "5.625rem" }, className: cx(fr.cx("fr-footer__logo"), classes.logo) }))))))))))),
            React.createElement("div", { className: cx(fr.cx("fr-footer__bottom"), classes.bottom) },
                React.createElement("ul", { className: cx(fr.cx("fr-footer__bottom-list"), classes.bottomList) }, [
                    ...(websiteMapLinkProps === undefined
                        ? []
                        : [
                            id({
                                "text": t("website map"),
                                "linkProps": websiteMapLinkProps
                            })
                        ]),
                    id({
                        "text": `${t("accessibility")}: ${t(accessibility)}`,
                        "linkProps": accessibilityLinkProps !== null && accessibilityLinkProps !== void 0 ? accessibilityLinkProps : {}
                    }),
                    ...(termsLinkProps === undefined
                        ? []
                        : [
                            id({
                                "text": t("terms"),
                                "linkProps": termsLinkProps
                            })
                        ]),
                    ...(personalDataLinkProps === undefined
                        ? []
                        : [
                            id({
                                "text": t("personal data"),
                                "linkProps": personalDataLinkProps
                            })
                        ]),
                    ...(cookiesManagementButtonProps === undefined
                        ? // one or the other, but not both. Priority to button for consent modal control.
                            cookiesManagementLinkProps === undefined
                                ? []
                                : [
                                    id({
                                        "text": t("cookies management"),
                                        "linkProps": cookiesManagementLinkProps
                                    })
                                ]
                        : [
                            id({
                                "text": t("cookies management"),
                                "buttonProps": cookiesManagementButtonProps.nativeButtonProps
                            })
                        ]),
                    ...bottomItems
                ].map((bottomItem, i) => !typeGuard(bottomItem, bottomItem instanceof Object && "text" in bottomItem) ? (bottomItem) : (React.createElement(FooterBottomItem, { classes: {
                        "root": classes.bottomItem,
                        "bottomLink": classes.bottomLink
                    }, bottomItem: bottomItem, key: `internally-rendered-${i}` })))),
                React.createElement("div", { className: cx(fr.cx("fr-footer__bottom-copy"), classes.bottomCopy) },
                    React.createElement("p", null, license === undefined
                        ? t("license mention", {
                            "licenseUrl": "https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                        })
                        : license))))));
}));
Footer.displayName = symToStr({ Footer });
export default Footer;
const { useTranslation, addFooterTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Footer }),
    "frMessages": {
        /* spell-checker: disable */
        "hide message": "Masquer le message",
        "website map": "Plan du site",
        "accessibility": "Accessibilité",
        "non compliant": "non conforme",
        "partially compliant": "partiellement conforme",
        "fully compliant": "totalement conforme",
        "terms": "Mentions légales",
        "personal data": "Données personnelles",
        "cookies management": "Gestion des cookies",
        "license mention": (p) => (React.createElement(React.Fragment, null,
            "Sauf mention contraire, tous les contenus de ce site sont sous",
            " ",
            React.createElement("a", { href: p.licenseUrl, target: "_blank" }, "licence etalab-2.0"))),
        "our partners": "Nos partenaires"
        /* spell-checker: enable */
    }
});
addFooterTranslations({
    "lang": "en",
    "messages": {
        "hide message": "Hide the message",
        "website map": "Website map",
        "accessibility": "Accessibility",
        "non compliant": "non compliant",
        "partially compliant": "partially compliant",
        "fully compliant": "fully compliant",
        "license mention": p => (React.createElement(React.Fragment, null,
            "Unless stated otherwise, all content of this website is under the",
            " ",
            React.createElement("a", { href: p.licenseUrl, target: "_blank" }, "etalab-2.0 license")))
    }
});
addFooterTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "hide message": "Occultar el mesage"
        /* spell-checker: enable */
    }
});
export { addFooterTranslations };
export function FooterBottomItem(props) {
    const { className, bottomItem, classes = {} } = props;
    const { Link } = getLink();
    return (React.createElement("li", { className: cx(fr.cx("fr-footer__bottom-item"), classes.root, className) }, (() => {
        const className = cx(fr.cx("fr-footer__bottom-link", ...(bottomItem.iconId !== undefined
            ? [bottomItem.iconId, "fr-link--icon-left"]
            : [])), classes.bottomLink);
        return bottomItem.linkProps !== undefined ? (Object.keys(bottomItem.linkProps).length === 0 ? (React.createElement("span", { className: className }, bottomItem.text)) : (React.createElement(Link, Object.assign({}, bottomItem.linkProps, { className: cx(className, bottomItem.linkProps.className) }), bottomItem.text))) : (React.createElement("button", Object.assign({}, bottomItem.buttonProps, { className: cx(className, bottomItem.buttonProps.className) }), bottomItem.text));
    })()));
}
//# sourceMappingURL=Footer.js.map