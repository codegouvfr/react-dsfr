import React from "react";
import { createComponentI18nApi } from "../../i18n";
import { getLink, type RegisteredLinkProps } from "../../link";

export const { useTranslation, addGdprTranslations } = createComponentI18nApi({
    "componentName": "Gdpr",
    "frMessages": {
        /** cspell: disable */
        "all services pref": "Préférences pour tous les services.",
        "personal data cookies": "Données personnelles et cookies",
        "accept all": "Tout accepter",
        "accept all - title": "Autoriser tous les cookies",
        "refuse all": "Tout refuser",
        "refuse all - title": "Refuser tous les cookies",
        "accept": "Accepter",
        "refuse": "Refuser",
        "confirm choices": "Confirmer mes choix",
        "about cookies": (p: { hostname: string }) => `À propos des cookies sur ${p.hostname}`,
        "welcome message": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => {
            const { Link } = getLink();
            return (
                <>
                    Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les
                    services disponibles sur ce site.
                    {p.personalDataPolicyLinkProps !== undefined && (
                        <>
                            {" "}
                            Pour en savoir plus, visitez la page{" "}
                            <Link {...p.personalDataPolicyLinkProps}>
                                Données personnelles et cookies
                            </Link>
                            .
                        </>
                    )}
                    &nbsp; Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous
                    souhaitez activer.
                </>
            );
        },
        "customize": "Personnaliser",
        "customize cookies - title": "Personnaliser les cookies",
        "consent modal title": "Panneau de gestion des cookies",
        "cookies management": "Gestion des cookies",
        "personal data": "Données personnelles",
        "preferences for all services": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => {
            const { Link } = getLink();
            return (
                <>
                    Préférences pour tous les services.
                    <br />
                    {p.personalDataPolicyLinkProps !== undefined && (
                        <Link {...p.personalDataPolicyLinkProps}>
                            Données personnelles et cookies
                        </Link>
                    )}
                </>
            );
        },
        "see more details": "Voir plus de détails",
        "hide details": "Cacher les détails",
        "mandatory cookies": "Cookies obligatoires",
        "mandatory cookies - description":
            "Ce site utilise des cookies nécessaires à son bon fonctionnement qui ne peuvent pas être désactivés.",
        "confirm my choices": "Confirmer mes choix"
        /** cspell: enable */
    }
});

addGdprTranslations({
    "lang": "en",
    "messages": {
        "all services pref": "Preferences for all services.",
        "personal data cookies": "Personal data and cookies",
        "accept all": "Accept all",
        "accept all - title": "Accept all cookies",
        "refuse all": "Refuse all",
        "refuse all - title": "Refuse all cookies",
        "accept": "Accept",
        "refuse": "Refuse",
        "confirm choices": "Confirm my choices",
        "about cookies": p => `About cookies on ${p.hostname}`,
        "welcome message": p => {
            const { Link } = getLink();
            return (
                <>
                    Welcome to our website! We use cookies to improve your experience and the
                    services available services available on this site.
                    {p.personalDataPolicyLinkProps !== undefined && (
                        <>
                            To learn more, visit the{" "}
                            <Link {...p.personalDataPolicyLinkProps}>
                                "Personal Data and Cookies"
                            </Link>{" "}
                            page.
                        </>
                    )}
                    &nbsp; You can, at any time, have control over which cookies you wish to enable
                    at any time.
                </>
            );
        },
        "customize": "Customize",
        "customize cookies - title": "Customize cookies",
        "consent modal title": "Cookie management panel",
        "cookies management": "Cookies management",
        "preferences for all services": (p: {
            personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        }) => {
            const { Link } = getLink();
            return (
                <>
                    Preferences for all services <br />
                    {p.personalDataPolicyLinkProps !== undefined && (
                        <Link {...p.personalDataPolicyLinkProps}>Personal data and cookies</Link>
                    )}
                </>
            );
        },
        "see more details": "See more details",
        "hide details": "Hide details",
        "mandatory cookies": "Mandatory cookies",
        "mandatory cookies - description":
            "This site uses cookies necessary for its proper functioning which cannot be deactivated.",
        "confirm my choices": "Confirm my choices"
    }
});
