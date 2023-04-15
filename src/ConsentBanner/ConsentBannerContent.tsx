import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in doc
import { FooterProps } from "../Footer";
import { fr } from "../fr";
import { getLink } from "../link";
import { ConsentBannerActions, ConsentBannerActionsProps } from "./ConsentBannerActions";

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
    const { Link } = getLink();
    return (
        <div className={fr.cx("fr-consent-banner")}>
            <h2 className={fr.cx("fr-h6")}>À propos des cookies sur {siteName}</h2>
            <div className="fr-consent-banner__content">
                <p className="fr-text--sm">
                    Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les
                    services disponibles sur ce site. Pour en savoir plus, visitez la page{" "}
                    <Link href={gdprPageLink}>Données personnelles et cookies</Link>. Vous pouvez, à
                    tout moment, avoir le contrôle sur les cookies que vous souhaitez activer.
                </p>
            </div>
            <ConsentBannerActions
                services={services}
                consentModalButtonProps={consentModalButtonProps}
            />
        </div>
    );
};
