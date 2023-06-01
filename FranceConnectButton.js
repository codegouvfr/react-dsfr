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
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
export const FranceConnectButton = memo(forwardRef((props, ref) => {
    const { classes = {}, className, url: href, plus = false, style, onClick } = props, rest = __rest(props, ["classes", "className", "url", "plus", "style", "onClick"]);
    assert();
    const { t } = useTranslation();
    const Inner = onClick !== undefined ? "button" : "a";
    const innerProps = (onClick !== undefined ? { onClick } : { href });
    return (React.createElement("div", { className: cx(fr.cx("fr-connect-group"), classes.root, className), style: style, ref: ref },
        React.createElement(Inner, Object.assign({ className: fr.cx("fr-btn", "fr-connect") }, innerProps),
            React.createElement("span", { className: cx(fr.cx("fr-connect__login"), classes.login) }, "S\u2019identifier avec"),
            React.createElement("span", { className: cx(fr.cx("fr-connect__brand"), classes.brand) },
                "FranceConnect",
                plus ? "+" : "")),
        React.createElement("p", null,
            React.createElement("a", { href: plus
                    ? "https://franceconnect.gouv.fr/france-connect-plus"
                    : "https://franceconnect.gouv.fr/", target: "_blank", rel: "noopener", title: `${t("what is service", { plus })} - ${t("new window")}` }, t("what is service", { plus })))));
}));
FranceConnectButton.displayName = symToStr({ FranceConnectButton });
export default FranceConnectButton;
const { useTranslation, addFranceConnectButtonTranslations } = createComponentI18nApi({
    "componentName": symToStr({ FranceConnectButton }),
    "frMessages": {
        /* spell-checker: disable */
        "what is service": (params) => `Qu’est-ce que FranceConnect${params.plus ? "+" : ""} ?`,
        "new window": "nouvelle fenêtre"
        /* spell-checker: enable */
    }
});
addFranceConnectButtonTranslations({
    "lang": "en",
    "messages": {
        "what is service": ({ plus }) => `What's FranceConnect${plus ? "+" : ""} ?`,
        "new window": "new window"
    }
});
export { addFranceConnectButtonTranslations };
//# sourceMappingURL=FranceConnectButton.js.map