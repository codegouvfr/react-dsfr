import React, { useEffect, useState } from "react";
import { fr } from "../../fr";
import { isBrowser } from "../../tools/isBrowser";
import { useTranslation } from "./translation";
export function createConsentBanner(params) {
    const { personalDataPolicyLinkProps, processConsentChanges, consentModalButtonProps } = params;
    function ConsentBanner() {
        const { t } = useTranslation();
        const [hostname, setHostname] = useState("");
        const [isProcessingChanges, setIsProcessingChanges] = useState(false);
        useEffect(() => {
            if (!isBrowser) {
                return;
            }
            setHostname(location.host);
        }, []);
        const id = "fr-consent-banner";
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { id: id, className: fr.cx("fr-consent-banner") },
                React.createElement("h2", { className: fr.cx("fr-h6") }, t("about cookies", { hostname })),
                React.createElement("div", null,
                    React.createElement("p", { className: fr.cx("fr-text--sm") }, t("welcome message", { personalDataPolicyLinkProps }))),
                React.createElement("ul", { className: fr.cx("fr-consent-banner__buttons", "fr-btns-group", "fr-btns-group--right", "fr-btns-group--inline-reverse", "fr-btns-group--inline-sm") },
                    React.createElement("li", null,
                        React.createElement("button", { id: `${id}-button-accept-all`, className: fr.cx("fr-btn"), title: t("accept all - title"), onClick: async () => {
                                setIsProcessingChanges(true);
                                await processConsentChanges({ "type": "grantAll" });
                                setIsProcessingChanges(false);
                            }, disabled: isProcessingChanges }, t("accept all"))),
                    React.createElement("li", null,
                        React.createElement("button", { id: `${id}-button-refuse-app`, className: fr.cx("fr-btn"), title: t("refuse all - title"), onClick: () => {
                                setIsProcessingChanges(true);
                                processConsentChanges({ "type": "denyAll" });
                                setIsProcessingChanges(false);
                            }, disabled: isProcessingChanges }, t("refuse all"))),
                    React.createElement("li", null,
                        React.createElement("button", Object.assign({ id: `${id}-button-customize`, className: fr.cx("fr-btn", "fr-btn--secondary"), title: t("customize cookies - title"), disabled: isProcessingChanges }, consentModalButtonProps), t("customize")))))));
    }
    return { ConsentBanner };
}
//# sourceMappingURL=ConsentBanner.js.map