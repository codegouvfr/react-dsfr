"use client";

import React, { useReducer } from "react";
import { createModal } from "../Modal";
import { createPersistentSignal } from "../tools/persistentSignal";
import { id } from "tsafe/id";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import { fr } from "../fr";
import { createComponentI18nApi } from "../i18n";
import { getLink, type RegisteredLinkProps } from "../link";
import type { Finality, FinalityConsent, FinalityDescription } from "./types";
import { assert } from "tsafe/assert";
import { createProcessBulkConsentChange } from "./createProcessBulkConsentChange";

const { useFinalityConsent, $finalityConsent } = createPersistentSignal({
    "name": "finalityConsent",
    "defaultValue": id<FinalityConsent | undefined>(undefined)
});

let processBulkConsentChange_global: ReturnType<typeof createProcessBulkConsentChange> | undefined =
    undefined;

const managementModalWrap = createModal({
    "isOpenedByDefault": false,
    "name": "consentManagement"
});

export function useConsentBanner(): {
    finalityConsent: FinalityConsent | undefined;
    assumeConsent: (finality: Finality) => void;
} {
    const { finalityConsent } = useFinalityConsent();

    const assumeConsent = useConstCallback(async (finality: Finality) => {
        if (finalityConsent === undefined) {
            managementModalWrap.openConsentManagementModal();
            return;
        }

        assert(
            processBulkConsentChange_global !== undefined,
            "ConsentBanner must be mounted before calling assumeConsent"
        );

        await processBulkConsentChange_global({
            "type": "custom",
            "changes": [
                {
                    finality,
                    "isConsentGiven": true
                }
            ]
        });
    });

    return {
        assumeConsent,
        finalityConsent
    };
}

export type ConsentBannerProps = {
    gdprLinkProps?: RegisteredLinkProps;
    finalityDescription: FinalityDescription;
    onConsentChange?: (params: {
        finality: Finality;
        isConsentGiven: boolean;
        isConsentGiven_prev: boolean | undefined;
    }) => Promise<void> | void;
    /** Optional: If you have a dedicated page that provides comprehensive information about your website's GDPR policies. */
};

export function ConsentBanner(props: ConsentBannerProps) {
    const { gdprLinkProps, finalityDescription, onConsentChange } = props;

    const { t } = useTranslation();

    const processBulkConsentChange = createProcessBulkConsentChange({
        "$finalityConsent": $finalityConsent,
        "finalities": Object.keys(finalityDescription),
        onConsentChange
    });

    processBulkConsentChange_global = processBulkConsentChange;

    const { finalityConsent } = useConsentBanner();

    const [isBannerVisible, hideBanner] = useReducer(() => false, finalityConsent === undefined);

    return (
        <>
            {isBannerVisible && (
                <div className={fr.cx("fr-consent-banner")}>
                    <h2 className={fr.cx("fr-h6")}>
                        {t("about cookies", { "hostname": location.host })}
                    </h2>
                    <div /*className={fr.cx("fr-consent-banner__content")}*/>
                        <p className={fr.cx("fr-text--sm")}>
                            {t("welcome message", { gdprLinkProps })}
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
                                    hideBanner();
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
                                    hideBanner();
                                }}
                            >
                                {t("refuse all")}
                            </button>
                        </li>
                        <li>
                            <button
                                className={fr.cx("fr-btn", "fr-btn--secondary")}
                                onClick={() => {
                                    hideBanner();
                                    managementModalWrap.openConsentManagementModal();
                                }}
                                title={t("customize cookies - title")}
                            >
                                {t("customize")}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            <managementModalWrap.ConsentManagementModal title={t("consent modal title")}>
                <h1>TODO</h1>
            </managementModalWrap.ConsentManagementModal>
        </>
    );
}

const { useTranslation, addConsentBannerTranslations } = createComponentI18nApi({
    "componentName": "ConsentBanner",
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
        "welcome message": (p: { gdprLinkProps: RegisteredLinkProps | undefined }) => {
            const { Link } = getLink();
            return (
                <>
                    Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les
                    services disponibles sur ce site.
                    {p.gdprLinkProps !== undefined && (
                        <>
                            {" "}
                            Pour en savoir plus, visitez la page{" "}
                            <Link {...p.gdprLinkProps}>Données personnelles et cookies</Link>.
                        </>
                    )}
                    Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez
                    activer.
                </>
            );
        },
        "customize": "Personnaliser",
        "customize cookies - title": "Personnaliser les cookies",
        "consent modal title": "Panneau de gestion des cookies"
        /** cspell: enable */
    }
});

addConsentBannerTranslations({
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
                    {p.gdprLinkProps !== undefined && (
                        <>
                            To learn more, visit the{" "}
                            <Link {...p.gdprLinkProps}>"Personal Data and Cookies"</Link> page.
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

export { addConsentBannerTranslations };
