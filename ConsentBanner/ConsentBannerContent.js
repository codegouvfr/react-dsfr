import React from "react";
import { fr } from "../fr";
import { ConsentBannerActions } from "./ConsentBannerActions";
import { useTranslation } from "./i18n";
export function ConsentBannerContent({ gdprLinkProps, siteName, services, consentModalButtonProps }) {
    const { t } = useTranslation();
    return (React.createElement("div", { className: fr.cx("fr-consent-banner") },
        React.createElement("h2", { className: fr.cx("fr-h6") }, t("about cookies", { siteName })),
        React.createElement("div", { className: "fr-consent-banner__content" },
            React.createElement("p", { className: "fr-text--sm" }, t("welcome message", {
                gdprLinkProps
            }))),
        React.createElement(ConsentBannerActions, { services: services, consentModalButtonProps: consentModalButtonProps })));
}
//# sourceMappingURL=ConsentBannerContent.js.map