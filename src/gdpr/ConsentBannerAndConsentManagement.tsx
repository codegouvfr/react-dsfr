"use client";

import React, { useState, useReducer, useEffect } from "react";
import { fr } from "../fr";
import { createComponentI18nApi } from "../i18n";
import { getLink, type RegisteredLinkProps } from "../link";
import {
    createProcessBulkConsentChange,
    useOnConsentChange,
    getFinalitiesFromFinalityDescription,
    type ProcessBulkConsentChange,
    type OnConsentChange
} from "./utils";
import { modal } from "./modal";
import { $finalityConsent } from "./signal";
import { symToStr } from "tsafe/symToStr";
import type {
    FinalityToFinalityDescription,
    ExtractFinalityFromFinalityDescription
} from "./types";

export type ConsentBannerAndConsentManagementProps<
    FinalityDescription extends FinalityToFinalityDescription<string>
> = {
    finalityDescription: FinalityDescription;
    onConsentChange?: OnConsentChange;
    /** Optional: If you have a dedicated page that provides comprehensive information about your website's GDPR policies. */
    personalDataPolicyLinkProps?: RegisteredLinkProps;
};

const x = ConsentBannerAndConsentManagement2({
    "finalityDescription": {
        "xxx": {
            "title": "",
            "description": ""
        }
    }
});

export function ConsentBannerAndConsentManagement2<
    FinalityDescription extends FinalityToFinalityDescription<string>
>(
    props: ConsentBannerAndConsentManagementProps<FinalityDescription>
): ExtractFinalityFromFinalityDescription<FinalityDescription> {
    return null as any;
}

export function ConsentBannerAndConsentManagement<
    FinalityDescription extends FinalityToFinalityDescription<string>
>(props: ConsentBannerAndConsentManagementProps<FinalityDescription>) {
    const { personalDataPolicyLinkProps, finalityDescription, onConsentChange } = props;

    const { processBulkConsentChange } = createProcessBulkConsentChange({
        "finalities": getFinalitiesFromFinalityDescription({ finalityDescription }),
        "getFinalityConsent": () => $finalityConsent.current,
        "setFinalityConsent": ({ finalityConsent }) => ($finalityConsent.current = finalityConsent)
    });

    useOnConsentChange({ onConsentChange });

    const [isHydrated, setIsHydrated] = useReducer(() => true, true);

    useEffect(() => {
        setIsHydrated();
    }, []);

    if (!isHydrated) {
        return null;
    }

    return (
        <>
            <ConsentBanner
                processBulkConsentChange={processBulkConsentChange}
                personalDataPolicyLinkProps={personalDataPolicyLinkProps}
            />
            <ConsentManagement personalDataPolicyLinkProps={personalDataPolicyLinkProps} />
        </>
    );
}

export default ConsentBannerAndConsentManagement;

const { ConsentBanner } = (() => {
    type Props = {
        personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        processBulkConsentChange: ProcessBulkConsentChange;
        /** Optional: If you have a dedicated page that provides comprehensive information about your website's GDPR policies. */
    };

    function ConsentBanner(props: Props) {
        const { personalDataPolicyLinkProps, processBulkConsentChange } = props;

        const { t } = useTranslation();

        const [isBannerVisible, setIsBannerVisible] = useState(false);

        if (!isBannerVisible) {
            return null;
        }

        return (
            <>
                <div className={fr.cx("fr-consent-banner")}>
                    <h2 className={fr.cx("fr-h6")}>
                        {t("about cookies", { "hostname": location.host })}
                    </h2>
                    <div /*className={fr.cx("fr-consent-banner__content")}*/>
                        <p className={fr.cx("fr-text--sm")}>
                            {t("welcome message", { personalDataPolicyLinkProps })}
                        </p>
                    </div>
                    <ul
                        className={fr.cx(
                            "fr-consent-banner__buttons",
                            "fr-btns-group",
                            "fr-btns-group--right",
                            "fr-btns-group--inline-reverse",
                            "fr-btns-group--inline-sm"
                        )}
                    >
                        <li>
                            <button
                                className={fr.cx("fr-btn")}
                                title={t("accept all - title")}
                                onClick={() => {
                                    processBulkConsentChange({ "type": "grantAll" });
                                    setIsBannerVisible(false);
                                }}
                            >
                                {t("accept all")}
                            </button>
                        </li>
                        <li>
                            <button
                                className={fr.cx("fr-btn")}
                                title={t("refuse all - title")}
                                onClick={() => {
                                    processBulkConsentChange({ "type": "denyAll" });
                                    setIsBannerVisible(false);
                                }}
                            >
                                {t("refuse all")}
                            </button>
                        </li>
                        <li>
                            <button
                                className={fr.cx("fr-btn", "fr-btn--secondary")}
                                onClick={() => {
                                    modal.open();
                                }}
                                title={t("customize cookies - title")}
                            >
                                {t("customize")}
                            </button>
                        </li>
                    </ul>
                </div>
            </>
        );
    }

    return { ConsentBanner };
})();

const { ConsentManagement } = (() => {
    type Props = {
        personalDataPolicyLinkProps?: RegisteredLinkProps;
    };

    function ConsentManagement(props: Props) {
        const { personalDataPolicyLinkProps } = props;

        const { t } = useTranslation();

        console.log("do something with", personalDataPolicyLinkProps);

        return (
            <modal.Component title={t("consent modal title")}>
                <h1>TODO</h1>
            </modal.Component>
        );
    }

    return { ConsentManagement };
})();

const { useTranslation, addConsentBannerAndConsentManagementTranslations } = createComponentI18nApi(
    {
        "componentName": symToStr({ ConsentBannerAndConsentManagement }),
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
                        Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et
                        les services disponibles sur ce site.
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
                        Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous
                        souhaitez activer.
                    </>
                );
            },
            "customize": "Personnaliser",
            "customize cookies - title": "Personnaliser les cookies",
            "consent modal title": "Panneau de gestion des cookies",
            "cookies management": "Gestion des cookies"
            /** cspell: enable */
        }
    }
);

addConsentBannerAndConsentManagementTranslations({
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
                    You can, at any time, have control over which cookies you wish to enable at any
                    time.
                </>
            );
        },
        "customize": "Customize",
        "customize cookies - title": "Customize cookies",
        "consent modal title": "Cookie management panel"
    }
});

export { addConsentBannerAndConsentManagementTranslations };
