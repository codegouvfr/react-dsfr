import React, { forwardRef, memo } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { getLink } from "./link";
export var Service;
(function (Service) {
    Service[Service["AGENT_CONNECT"] = 0] = "AGENT_CONNECT";
    Service[Service["FRANCE_CONNECT"] = 1] = "FRANCE_CONNECT";
    Service[Service["FRANCE_CONNECT_PLUS"] = 2] = "FRANCE_CONNECT_PLUS";
    Service[Service["MON_COMPTE_PRO"] = 3] = "MON_COMPTE_PRO";
})(Service || (Service = {}));
const services = {
    [Service.AGENT_CONNECT]: {
        name: "AgentConnect",
        url: "https://agentconnect.gouv.fr/",
        class: "fr-agentconnect"
    },
    [Service.FRANCE_CONNECT]: {
        name: "FranceConnect",
        url: "https://franceconnect.gouv.fr/",
        class: ""
    },
    [Service.FRANCE_CONNECT_PLUS]: {
        name: "FranceConnect+",
        url: "https://franceconnect.gouv.fr/france-connect-plus",
        class: "fr-connect--plus"
    },
    [Service.MON_COMPTE_PRO]: {
        name: "MonComptePro",
        url: "https://moncomptepro.beta.gouv.fr/",
        class: "fr-moncomptepro"
    }
};
const ConnectButton = memo(forwardRef((props, ref) => {
    const { classes = {}, className, loginUrl, service } = props;
    const { t } = useTranslation();
    const { Link } = getLink();
    const _service = services[service];
    return (React.createElement("div", { className: cx(fr.cx("fr-connect-group"), className, classes === null || classes === void 0 ? void 0 : classes.root), ref: ref },
        React.createElement("form", { action: loginUrl, method: "post", className: "fr-m-0" },
            React.createElement("button", { className: cx(fr.cx("fr-connect"), _service.class) },
                React.createElement("span", { className: "fr-connect__login" }, t("identify with")),
                React.createElement("span", { className: "fr-connect__brand" }, _service.name))),
        React.createElement("p", null,
            React.createElement(Link, { href: _service.url, target: "_blank", rel: "noopener noreferrer", title: `${t("what is", _service.name)} - nouvelle fenêtre` }, t("what is", _service.name)))));
}));
ConnectButton.displayName = symToStr({ ConnectButton });
export default ConnectButton;
const { useTranslation } = createComponentI18nApi({
    "componentName": symToStr({ ConnectButton }),
    "frMessages": {
        /* spell-checker: disable */
        "identify with": "S’identifier avec",
        "what is": (service) => `Qu’est-ce que ${service} ?`
        /* spell-checker: enable */
    }
});
//# sourceMappingURL=ConnectButton.js.map