import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in doc
import { type FooterProps } from "../Footer";
import { fr } from "../fr";
import { type RegisteredLinkProps } from "../link";
import { ConsentBannerActions, type ConsentBannerActionsProps } from "./ConsentBannerActions";
import { useTranslation } from "./i18n";

export interface ConsentBannerContentProps extends ConsentBannerActionsProps {
    /** Usually the same as {@link FooterProps.personalDataLinkProps} */
    gdprLinkProps: RegisteredLinkProps;
    /** Current website name */
    siteName: string;
}

export function ConsentBannerContent({
    gdprLinkProps,
    siteName,
    services,
    consentModalButtonProps
}: ConsentBannerContentProps) {
    const { t } = useTranslation();
    return (
        <div className={fr.cx("fr-consent-banner")}>
            <h2 className={fr.cx("fr-h6")}>{t("about cookies", { siteName })}</h2>
            <div className="fr-consent-banner__content">
                <p className="fr-text--sm">
                    {t("welcome message", {
                        gdprLinkProps
                    })}
                </p>
            </div>
            <ConsentBannerActions
                services={services}
                consentModalButtonProps={consentModalButtonProps}
            />
        </div>
    );
}
