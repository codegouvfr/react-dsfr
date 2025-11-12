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
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { assert } from "tsafe/assert";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import "./assets/proconnect-btn.css";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-proconnectbutton> */
export const ProConnectButton = memo(forwardRef((props, ref) => {
    const { classes = {}, className, url: href, style, onClick, id: id_props } = props, rest = __rest(props, ["classes", "className", "url", "style", "onClick", "id"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-proconnect-button",
        "explicitlyProvidedId": id_props
    });
    const { t } = useTranslation();
    const Inner = onClick !== undefined ? "button" : "a";
    const innerProps = (onClick !== undefined ? { onClick } : { href });
    return (React.createElement("div", { id: id, className: cx(fr.cx("fr-connect-group"), classes.root, className), style: style, ref: ref },
        React.createElement(Inner, Object.assign({ id: `${id}-button`, className: cx(fr.cx("fr-btn", "fr-connect"), "pro-connect") }, innerProps),
            React.createElement("span", { className: cx(fr.cx("fr-connect__login"), classes.login) }, "S\u2019identifier avec"),
            React.createElement("span", { className: cx(fr.cx("fr-connect__brand"), classes.brand) }, "ProConnect")),
        React.createElement("p", null,
            React.createElement("a", { href: "https://www.proconnect.gouv.fr/", target: "_blank", rel: "noopener", title: `${t("what is service")} - ${t("new window")}` }, t("what is service")))));
}));
ProConnectButton.displayName = symToStr({ ProConnectButton });
export default ProConnectButton;
const { useTranslation, addProConnectButtonTranslations } = createComponentI18nApi({
    "componentName": symToStr({ ProConnectButton }),
    "frMessages": {
        /* spell-checker: disable */
        "what is service": "Qu’est-ce que ProConnect ?",
        "new window": "nouvelle fenêtre"
        /* spell-checker: enable */
    }
});
addProConnectButtonTranslations({
    "lang": "en",
    "messages": {
        "what is service": "What's ProConnect?",
        "new window": "new window"
    }
});
export { addProConnectButtonTranslations };
//# sourceMappingURL=ProConnectButton.js.map