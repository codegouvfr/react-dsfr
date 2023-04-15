import React, { ElementType, PropsWithChildren } from "react";
import { fr } from "../fr";
import { ConsentBannerActions, ConsentBannerActionsProps } from "./ConsentBannerActions";

export interface ConsentBannerContentProps extends ConsentBannerActionsProps {
    gdprPageLink: string;
    gdprPageLinkAs?: ElementType<PropsWithChildren<{ href: any }>> | string;
    siteName: string;
}

export const ConsentBannerContent = ({
    gdprPageLink,
    gdprPageLinkAs: GdprPageLinkAs = "a",
    siteName,
    services,
    consentModalButtonProps
}: ConsentBannerContentProps) => {
    return (
        <div className={fr.cx("fr-consent-banner")}>
            <h2 className={fr.cx("fr-h6")}>À propos des cookies sur {siteName}</h2>
            <div className="fr-consent-banner__content">
                <p className="fr-text--sm">
                    Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les
                    services disponibles sur ce site. Pour en savoir plus, visitez la page{" "}
                    <GdprPageLinkAs href={gdprPageLink}>
                        Données personnelles et cookies
                    </GdprPageLinkAs>
                    . Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous
                    souhaitez activer.
                </p>
            </div>
            <ConsentBannerActions
                services={services}
                consentModalButtonProps={consentModalButtonProps}
            />
        </div>
    );
};
