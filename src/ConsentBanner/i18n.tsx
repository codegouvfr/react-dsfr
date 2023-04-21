import { createComponentI18nApi } from "../i18n";
import React from "react";
import { getLink, type RegisteredLinkProps } from "../link";

export const { useTranslation, addConsentBannerTranslations } = createComponentI18nApi({
    componentName: "ConsentBanner",
    frMessages: {
        "all services pref": "Préférences pour tous les services.",
        "personal data cookies": "Données personnelles et cookies",
        "accept all": "Tout accepter",
        "accept all - title": "Autoriser tous les cookies",
        "refuse all": "Tout refuser",
        "refuse all - title": "Refuser tous les cookies",
        "accept": "Accepter",
        "refuse": "Refuser",
        "confirm choices": "Confirmer mes choix",
        "about cookies": (p: { siteName: string }) => `À propos des cookies sur ${p.siteName}`,
        "welcome message": (p: { gdprLinkProps: RegisteredLinkProps }) => {
            const { Link } = getLink();
            return (
                <>
                    Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les
                    services disponibles sur ce site. Pour en savoir plus, visitez la page{" "}
                    <Link {...p.gdprLinkProps}>Données personnelles et cookies</Link>. Vous pouvez,
                    à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer.
                </>
            );
        },
        "customize cookies": "Personnaliser",
        "customize cookies - title": "Personnaliser les cookies",
        "consent modal title": "Panneau de gestion des cookies"
    }
});

addConsentBannerTranslations({
    lang: "en",
    messages: {
        "all services pref": "Preferences for all services.",
        "personal data cookies": "Personal data and cookies",
        "accept all": "Accept all",
        "accept all - title": "Accept all cookies",
        "refuse all": "Refuse all",
        "refuse all - title": "Refuse all cookies",
        "accept": "Accept",
        "refuse": "Refuse",
        "confirm choices": "Confirm my choices",
        "about cookies": p => `About cookies on ${p.siteName}`,
        "welcome message": p => {
            const { Link } = getLink();
            return (
                <>
                    Welcome to our website! We use cookies to improve your experience and the
                    services available services available on this site. To learn more, visit the{" "}
                    <Link {...p.gdprLinkProps}>"Personal Data and Cookies"</Link> page. You can, at
                    any time, have control over which cookies you wish to enable at any time.
                </>
            );
        },
        "customize cookies": "Customize",
        "customize cookies - title": "Customize cookies",
        "consent modal title": "Cookie management panel"
    }
});
