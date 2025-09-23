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
import { getBrandTopAndHomeLinkProps } from "./zz_internal/brandTopAndHomeLinkProps";
import { typeGuard } from "tsafe/typeGuard";
import { id } from "tsafe/id";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-footer> */
export const Footer = memo(forwardRef((props, ref) => {
    const { id: id_props, className, classes = {}, contentDescription, websiteMapLinkProps, accessibilityLinkProps, accessibility, termsLinkProps, bottomItems = [], partnersLogos, operatorLogo, license, brandTop: brandTop_prop, homeLinkProps: homeLinkProps_prop, style, linkList, linkListTitle, domains = [
        "info.gouv.fr",
        "service-public.gouv.fr",
        "legifrance.gouv.fr",
        "data.gouv.fr"
    ] } = props, rest = __rest(props, ["id", "className", "classes", "contentDescription", "websiteMapLinkProps", "accessibilityLinkProps", "accessibility", "termsLinkProps", "bottomItems", "partnersLogos", "operatorLogo", "license", "brandTop", "homeLinkProps", "style", "linkList", "linkListTitle", "domains"]);
    assert();
    const rootId = id_props !== null && id_props !== void 0 ? id_props : "fr-footer";
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
    return (React.createElement("footer", Object.assign({ id: rootId, className: cx(fr.cx("fr-footer"), classes.root, className), role: "contentinfo", ref: ref, style: style }, rest),
        linkList !== undefined && (React.createElement("div", { className: fr.cx("fr-footer__top") },
            React.createElement("div", { className: fr.cx("fr-container") },
                linkListTitle,
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
                        const children = (React.createElement("p", { className: cx(fr.cx("fr-logo"), classes.logo) }, brandTop));
                        return operatorLogo !== undefined ? (children) : (React.createElement(Link, Object.assign({}, homeLinkProps), children));
                    })(),
                    operatorLogo !== undefined && (React.createElement(Link, Object.assign({}, homeLinkProps, { className: cx(fr.cx("fr-footer__brand-link"), classes.brandLink, homeLinkProps.className) }),
                        React.createElement("img", { className: cx(fr.cx("fr-footer__logo"), classes.operatorLogo), style: (() => {
                                switch (operatorLogo.orientation) {
                                    case "vertical":
                                        return { "width": "3.5rem" };
                                    case "horizontal":
                                        return { "maxWidth": "9.0625rem" };
                                }
                            })(), src: operatorLogo.imgUrl, alt: operatorLogo.alt })))),
                React.createElement("div", { className: cx(fr.cx("fr-footer__content"), classes.content) },
                    contentDescription !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-footer__content-desc"), classes.contentDesc) }, contentDescription)),
                    React.createElement("ul", { className: cx(fr.cx("fr-footer__content-list"), classes.contentList) }, domains.map((domain, i) => (React.createElement("li", { className: cx(fr.cx("fr-footer__content-item"), classes.contentItem), key: i },
                        React.createElement("a", { className: cx(fr.cx("fr-footer__content-link"), classes.contentLink), target: "_blank", href: `https://${domain}`, title: `${domain} - ${t("open new window")}`, id: `footer-${domain.replace(/\./g, "-")}-link` }, domain))))))),
            partnersLogos !== undefined && (React.createElement("div", { className: cx(fr.cx("fr-footer__partners"), classes.partners) },
                React.createElement("h2", { className: cx(fr.cx("fr-footer__partners-title"), classes.partnersTitle) }, t("our partners")),
                React.createElement("div", { className: cx(fr.cx("fr-footer__partners-logos"), classes.partnersLogos) },
                    mainPartnersLogo !== undefined && (React.createElement("div", { className: cx(fr.cx("fr-footer__partners-main"), classes.partnersMain) }, (() => {
                        var _a, _b;
                        const children = (React.createElement("img", { alt: mainPartnersLogo.alt, style: { height: "5.625rem" }, src: mainPartnersLogo.imgUrl, className: cx(fr.cx("fr-footer__logo"), classes.logo) }));
                        const hasLinkProps = mainPartnersLogo.linkProps !== undefined ||
                            mainPartnersLogo.href !== undefined;
                        return hasLinkProps ? (React.createElement(Link, Object.assign({}, mainPartnersLogo.linkProps, { href: (_a = mainPartnersLogo.href) !== null && _a !== void 0 ? _a : (_b = mainPartnersLogo.linkProps) === null || _b === void 0 ? void 0 : _b.href, className: cx(fr.cx("fr-footer__partners-link", "fr-raw-link"), classes.partnersLink) }), children)) : (children);
                    })())),
                    subPartnersLogos.length !== 0 && (React.createElement("div", { className: cx(fr.cx("fr-footer__partners-sub"), classes.partnersSub) },
                        React.createElement("ul", null, subPartnersLogos.map((logo, i) => {
                            var _a, _b;
                            const children = (React.createElement("img", { alt: logo.alt, src: logo.imgUrl, style: { "height": "5.625rem" }, className: cx(fr.cx("fr-footer__logo"), classes.logo) }));
                            const hasLinkProps = logo.linkProps !== undefined ||
                                logo.href !== undefined;
                            return (React.createElement("li", { key: i }, hasLinkProps ? (React.createElement(Link, Object.assign({}, logo.linkProps, { href: (_a = logo.href) !== null && _a !== void 0 ? _a : (_b = logo.linkProps) === null || _b === void 0 ? void 0 : _b.href, className: cx(fr.cx("fr-footer__partners-link", "fr-raw-link"), classes.partnersLink) }), children)) : (children)));
                        }))))))),
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
                        "text": `${t("accessibility")} : ${t(accessibility)}`,
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
                    ...bottomItems
                ].map((bottomItem, i) => (React.createElement("li", { className: cx(fr.cx("fr-footer__bottom-item"), classes.bottomItem, className), key: i }, !typeGuard(bottomItem, bottomItem instanceof Object && "text" in bottomItem) ? (bottomItem) : (React.createElement(FooterBottomItem, { classes: {
                        "bottomLink": classes.bottomLink
                    }, bottomItem: bottomItem })))))),
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
        "cookies management": "Gestion des cookies",
        "license mention": (p) => (React.createElement(React.Fragment, null,
            "Sauf mention explicite de propri\u00E9t\u00E9 intellectuelle d\u00E9tenue par des tiers, les contenus de ce site sont propos\u00E9s sous",
            " ",
            React.createElement("a", { href: p.licenseUrl, target: "_blank", title: "licence etalab-2.0 - nouvelle fen\u00EAtre", id: "footer-etalab-licence-link" }, "licence etalab-2.0"))),
        "our partners": "Nos partenaires",
        "open new window": "nouvelle fenêtre"
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
            React.createElement("a", { href: p.licenseUrl, target: "_blank", title: "etalab-2.0 license - open a new window" }, "etalab-2.0 license"))),
        "open new window": "open new window"
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
    const { className: className_props, bottomItem, classes = {} } = props;
    const { Link } = getLink();
    const className = cx(fr.cx("fr-footer__bottom-link", ...(bottomItem.iconId !== undefined
        ? [bottomItem.iconId, "fr-link--icon-left"]
        : [])), classes.bottomLink, classes.root, className_props);
    return bottomItem.linkProps !== undefined ? (Object.keys(bottomItem.linkProps).length === 0 ? (React.createElement("span", { className: className }, bottomItem.text)) : (React.createElement(Link, Object.assign({}, bottomItem.linkProps, { className: cx(className, bottomItem.linkProps.className) }), bottomItem.text))) : (React.createElement("button", Object.assign({}, bottomItem.buttonProps, { className: cx(className, bottomItem.buttonProps.className) }), bottomItem.text));
}
//# sourceMappingURL=Footer.js.map