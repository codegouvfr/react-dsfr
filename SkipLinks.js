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
import React, { forwardRef, memo } from "react";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.fr/?path=/docs/components-skiplinks> */
export const SkipLinks = memo(forwardRef((props, ref) => {
    const { className, classes = {}, links, style, id: id_props } = props, rest = __rest(props, ["className", "classes", "links", "style", "id"]);
    const { t } = useTranslation();
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-skiplinks",
        "explicitlyProvidedId": id_props
    });
    return (React.createElement("div", Object.assign({ id: id, className: cx(fr.cx("fr-skiplinks"), classes.root, className), ref: ref, style: style }, rest),
        React.createElement("nav", { className: fr.cx("fr-container"), role: "navigation", "aria-label": t("label") },
            React.createElement("ul", { className: cx(fr.cx("fr-skiplinks__list"), classes.list) }, links &&
                links.map(link => (React.createElement("li", { key: link.anchor },
                    React.createElement("a", { className: cx(fr.cx("fr-link"), classes.link), href: link.anchor }, link.label))))))));
}));
SkipLinks.displayName = symToStr({ SkipLinks });
const { useTranslation, addSkipLinksTranslations } = createComponentI18nApi({
    "componentName": symToStr({ SkipLinks }),
    "frMessages": {
        /* spell-checker: disable */
        "label": "Accès rapide"
        /* spell-checker: enable */
    }
});
addSkipLinksTranslations({
    "lang": "en",
    "messages": {
        "label": "Quick access"
    }
});
addSkipLinksTranslations({
    "lang": "es",
    "messages": {
        "label": "Acceso rapido"
    }
});
addSkipLinksTranslations({
    "lang": "de",
    "messages": {
        "label": "Schneller Zugang"
    }
});
export default SkipLinks;
//# sourceMappingURL=SkipLinks.js.map