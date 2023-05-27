"use client";
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
import React, { forwardRef, memo, useState } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { assert } from "tsafe/assert";
import agentconnectBtnPrincipalSvgUrl from "./assets/agentconnect-btn-principal.svg";
import agentconnectBtnPrincipalHoverSvgUrl from "./assets/agentconnect-btn-principal-hover.svg";
import agentconnectBtnAlternatifSvgUrl from "./assets/agentconnect-btn-alternatif.svg";
import agentconnectBtnAlternatifHoverSvgUrl from "./assets/agentconnect-btn-alternatif-hover.svg";
import { useIsDark } from "./useIsDark";
import { useColors } from "./useColors";
import { getAssetUrl } from "./tools/getAssetUrl";
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
export const AgentConnectButton = memo(forwardRef((props, ref) => {
    const { className, url, style } = props, rest = __rest(props, ["className", "url", "style"]);
    assert();
    const { t } = useTranslation();
    const [isMouseHover, setIsMouseHover] = useState(false);
    const { isDark } = useIsDark();
    const theme = useColors();
    return (React.createElement("div", { className: className, style: style, ref: ref },
        React.createElement("a", { href: url, style: {
                "display": "block",
                "backgroundImage": "unset"
            }, onMouseEnter: () => setIsMouseHover(true), onMouseLeave: () => setIsMouseHover(false) },
            React.createElement("img", { src: getAssetUrl(isDark
                    ? isMouseHover
                        ? agentconnectBtnAlternatifHoverSvgUrl
                        : agentconnectBtnAlternatifSvgUrl
                    : isMouseHover
                        ? agentconnectBtnPrincipalHoverSvgUrl
                        : agentconnectBtnPrincipalSvgUrl) })),
        React.createElement("a", { style: {
                "display": "inline-block",
                "marginTop": fr.spacing("1v"),
                "color": theme.decisions.text.actionHigh.blueFrance.default
            }, className: fr.cx("fr-text--sm"), href: "https://agentconnect.gouv.fr/", target: "_blank" }, t("what is AgentConnect ?"))));
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