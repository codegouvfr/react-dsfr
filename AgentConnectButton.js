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
import "./assets/agentconnect.css";
import { cx } from "./tools/cx";
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
export const AgentConnectButton = memo(forwardRef((props, ref) => {
    const { className, url: href, style, onClick } = props, rest = __rest(props, ["className", "url", "style", "onClick"]);
    assert();
    const { t } = useTranslation();
    const Inner = onClick !== undefined ? "button" : "a";
    return (React.createElement("div", { className: className, style: style, ref: ref },
        React.createElement("span", { className: "agentconnect-button__preload-hover" }),
        React.createElement(Inner, Object.assign({ className: "agentconnect-button__link" }, (onClick !== undefined ? { onClick } : { href }))),
        React.createElement("p", null,
            React.createElement("a", { className: cx("agentconnect-button__hint", fr.cx("fr-text--sm", "fr-mt-1v")), href: "https://agentconnect.gouv.fr/", target: "_blank" }, t("what is AgentConnect ?")))));
}));
AgentConnectButton.displayName = symToStr({ AgentConnectButton });
export default AgentConnectButton;
const { useTranslation, addAgentConnectButtonTranslations } = createComponentI18nApi({
    "componentName": symToStr({ AgentConnectButton }),
    "frMessages": {
        /* spell-checker: disable */
        "what is AgentConnect ?": "Qu’est-ce que AgentConnect ?"
        /* spell-checker: enable */
    }
});
addAgentConnectButtonTranslations({
    "lang": "en",
    "messages": {
        "what is AgentConnect ?": "What's AgentConnect ?"
    }
});
export { addAgentConnectButtonTranslations };
//# sourceMappingURL=AgentConnectButton.js.map