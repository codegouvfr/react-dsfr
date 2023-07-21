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
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { getLink } from "./link";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-breadcrumb> */
export const Breadcrumb = memo(forwardRef((props, ref) => {
    const { id: props_id, className, homeLinkProps, segments, currentPageLabel, classes = {}, style } = props, rest = __rest(props, ["id", "className", "homeLinkProps", "segments", "currentPageLabel", "classes", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-breadcrumb",
        "explicitlyProvidedId": props_id
    });
    const { t } = useTranslation();
    const { Link } = getLink();
    const breadcrumbId = `breadcrumb-${useId()}`;
    return (React.createElement("nav", Object.assign({ id: id, ref: ref, role: "navigation", className: cx(fr.cx("fr-breadcrumb"), classes.root, className), style: style, "aria-label": `${t("navigation label")} :` }, rest),
        React.createElement("button", { className: cx(fr.cx("fr-breadcrumb__button"), classes.button), "aria-expanded": "false", "aria-controls": breadcrumbId }, t("show breadcrumb")),
        React.createElement("div", { className: cx(fr.cx("fr-collapse"), classes.collapse), id: breadcrumbId },
            React.createElement("ol", { className: cx(fr.cx("fr-breadcrumb__list"), classes.list) },
                React.createElement(React.Fragment, null,
                    [
                        ...(homeLinkProps === undefined
                            ? []
                            : [{ "linkProps": homeLinkProps, "label": t("home") }]),
                        ...segments
                    ].map(({ linkProps, label }, i) => (React.createElement("li", { key: i },
                        React.createElement(Link, Object.assign({}, linkProps, { className: cx(fr.cx("fr-breadcrumb__link"), classes.link, linkProps.className) }), label)))),
                    React.createElement("li", null,
                        React.createElement("a", { className: fr.cx("fr-breadcrumb__link"), "aria-current": "page" }, currentPageLabel)))))));
}));
Breadcrumb.displayName = symToStr({ Breadcrumb });
const { useTranslation, addBreadcrumbTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Breadcrumb }),
    "frMessages": {
        /* spell-checker: disable */
        "show breadcrumb": "Voir le fil d’Ariane",
        "navigation label": "vous êtes ici",
        "home": "Accueil"
        /* spell-checker: enable */
    }
});
addBreadcrumbTranslations({
    "lang": "en",
    "messages": {
        "show breadcrumb": "Show navigation",
        "navigation label": "you are here",
        "home": "Home"
    }
});
export { addBreadcrumbTranslations };
export default Breadcrumb;
//# sourceMappingURL=Breadcrumb.js.map