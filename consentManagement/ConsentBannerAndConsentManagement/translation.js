import React from "react";
import { createComponentI18nApi } from "../../i18n";
import { getLink } from "../../link";
export const { useTranslation, addConsentManagementTranslations } = createComponentI18nApi({
    "componentName": "ConsentManagement",
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
        "about cookies": (p) => `À propos des cookies sur ${p.hostname}`,
        "welcome message": (p) => {
            const { Link } = getLink();
            return (React.createElement(React.Fragment, null,
                "Bienvenue ! Nous utilisons des cookies pour am\u00E9liorer votre exp\u00E9rience et les services disponibles sur ce site.",
                p.personalDataPolicyLinkProps !== undefined && (React.createElement(React.Fragment, null,
                    " ",
                    "Pour en savoir plus, visitez la page",
                    " ",
                    React.createElement(Link, Object.assign({}, p.personalDataPolicyLinkProps), "Donn\u00E9es personnelles et cookies"),
                    ".")),
                "\u00A0 Vous pouvez, \u00E0 tout moment, avoir le contr\u00F4le sur les cookies que vous souhaitez activer."));
        },
        "customize": "Personnaliser",
        "customize cookies - title": "Personnaliser les cookies",
        "consent modal title": "Panneau de gestion des cookies",
        "cookies management": "Gestion des cookies",
        "personal data": "Données personnelles",
        "preferences for all services": (p) => {
            const { Link } = getLink();
            return (React.createElement(React.Fragment, null,
                "Pr\u00E9f\u00E9rences pour tous les services.",
                React.createElement("br", null),
                p.personalDataPolicyLinkProps !== undefined && (React.createElement(Link, Object.assign({}, p.personalDataPolicyLinkProps), "Donn\u00E9es personnelles et cookies"))));
        },
        "see more details": "Voir plus de détails",
        "hide details": "Cacher les détails",
        "mandatory cookies": "Cookies obligatoires",
        "mandatory cookies - description": "Ce site utilise des cookies nécessaires à son bon fonctionnement qui ne peuvent pas être désactivés.",
        "confirm my choices": "Confirmer mes choix"
        /** cspell: enable */
    }
});
addConsentManagementTranslations({
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
            return (React.createElement(React.Fragment, null,
                "Welcome to our website! We use cookies to improve your experience and the services available services available on this site.",
                p.personalDataPolicyLinkProps !== undefined && (React.createElement(React.Fragment, null,
                    "To learn more, visit the",
                    " ",
                    React.createElement(Link, Object.assign({}, p.personalDataPolicyLinkProps), "\"Personal Data and Cookies\""),
                    " ",
                    "page.")),
                "\u00A0 You can, at any time, have control over which cookies you wish to enable at any time."));
        },
        "customize": "Customize",
        "customize cookies - title": "Customize cookies",
        "consent modal title": "Cookie management panel",
        "cookies management": "Cookies management",
        "preferences for all services": (p) => {
            const { Link } = getLink();
            return (React.createElement(React.Fragment, null,
                "Preferences for all services ",
                React.createElement("br", null),
                p.personalDataPolicyLinkProps !== undefined && (React.createElement(Link, Object.assign({}, p.personalDataPolicyLinkProps), "Personal data and cookies"))));
        },
        "see more details": "See more details",
        "hide details": "Hide details",
        "mandatory cookies": "Mandatory cookies",
        "mandatory cookies - description": "This site uses cookies necessary for its proper functioning which cannot be deactivated.",
        "confirm my choices": "Confirm my choices"
    }
});
//# sourceMappingURL=translation.js.map