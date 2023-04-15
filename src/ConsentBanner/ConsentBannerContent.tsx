import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in doc
import { FooterProps } from "../Footer";
import { fr } from "../fr";
import { ConsentBannerActions, ConsentBannerActionsProps } from "./ConsentBannerActions";
import { useTranslation } from "./i18n";

export interface ConsentBannerContentProps extends ConsentBannerActionsProps {
    /** Usually the same as {@link FooterProps.personalDataLinkProps} */
    gdprPageLink: string;
    /** Current website name */
    siteName: string;
}

export const ConsentBannerContent = ({
    gdprPageLink,
    siteName,
    services,
    consentModalButtonProps
}: ConsentBannerContentProps) => {
    const { t } = useTranslation();
    return (
        <div className={fr.cx("fr-consent-banner")}>
            <h2 className={fr.cx("fr-h6")}>{t("about cookies", { siteName })}</h2>
            <div className="fr-consent-banner__content">
                <p className="fr-text--sm">
                    {t("welcome message", {
                        gdprPageLink
                    })}
                </p>
            </div>
            <ConsentBannerActions
                services={services}
                consentModalButtonProps={consentModalButtonProps}
            />
        </div>
    );
};
