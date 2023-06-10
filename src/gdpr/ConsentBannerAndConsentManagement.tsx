import React, { useState, useReducer, useEffect, useMemo, type ReactNode } from "react";
import { fr } from "../fr";
import { createComponentI18nApi } from "../i18n";
import { getLink, type RegisteredLinkProps } from "../link";
import { createModal } from "../Modal";
import { symToStr } from "tsafe/symToStr";
import type { ExtractFinalityFromFinalityDescription } from "./types";
import { type ProcessBulkConsentChanges } from "./utils";

export function createConsentBannerAndConsentManagement<
    FinalityDescription extends Record<
        string,
        { title: ReactNode; description?: ReactNode; subFinalities?: Record<string, ReactNode> }
    >
>(params: {
    finalityDescription: ((params: { lang: string }) => FinalityDescription) | FinalityDescription;
    processBulkConsentChanges: ProcessBulkConsentChanges<
        ExtractFinalityFromFinalityDescription<FinalityDescription>
    >;
    personalDataPolicyLinkProps?: RegisteredLinkProps;
}) {
    const {
        finalityDescription,
        processBulkConsentChanges,
        personalDataPolicyLinkProps
    } = params;

    const { ConsentBanner } = createConsentBanner({
        personalDataPolicyLinkProps,
        processBulkConsentChanges
    });

    const { ConsentManagement, openManagementModal } = createConsentManagement({
        finalityDescription,
        personalDataPolicyLinkProps,
    });

    function ConsentBannerAndConsentManagement(props: { lang: string }) {
        const { lang } = props;

        const [isHydrated, setIsHydrated] = useReducer(() => true, true);

        useEffect(() => {

            processBulkConsentChanges({ "type": "no changes but trigger callbacks" });

            setIsHydrated();
        }, []);


        if (!isHydrated) {
            return null;
        }

        return (
            <>
                <ConsentBanner />
                <ConsentManagement lang={lang} />
            </>
        );
    }

    ConsentBannerAndConsentManagement.displayName = symToStr({ ConsentBannerAndConsentManagement });

    function FooterConsentManagementItem() {
        return <FooterBottomItem bottomItem={footerConsentManagementItem} />;
    }

    FooterConsentManagementItem.displayName = symToStr({ FooterConsentManagementItem });

    function FooterPersonalDataPolicyItem() {
        if (personalDataPolicyLinkProps === undefined) {
            throw new Error(
                [
                    "You should provide a personalDataPolicyLinkProps to createGdprApi if",
                    "you want to add a link to the personal data policy in the footer"
                ].join(" ")
            );
        }

        return (
            <FooterBottomItem
                bottomItem={getFooterPersonalDataPolicyItem({ personalDataPolicyLinkProps })}
            />
        );
    }

    FooterPersonalDataPolicyItem.displayName = symToStr({ FooterPersonalDataPolicyItem });


    return { ConsentBannerAndConsentManagement, FooterConsentManagementItem, FooterPersonalDataPolicyItem };
}

function createConsentBanner<Finality extends string>(
    params: {
        personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        processBulkConsentChanges: ProcessBulkConsentChanges<Finality>;
    }
) {
    const { personalDataPolicyLinkProps, processBulkConsentChanges } = params;

    function ConsentBanner() {

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
                                    processBulkConsentChanges({ "type": "grantAll" });
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
                                    processBulkConsentChanges({ "type": "denyAll" });
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

}

function createConsentManagement<
    FinalityDescription extends
    Record<
        string,
        { title: ReactNode; description?: ReactNode; subFinalities?: Record<string, ReactNode> }
    >
>(
    params: {
        personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
        finalityDescription: ((params: { lang: string }) => FinalityDescription) | FinalityDescription;
    }
) {

    const {

        finalityDescription: finalityDescriptionOrGetFinalityDescription,
        personalDataPolicyLinkProps,
    } = params;


    const modal = createModal({
        "isOpenedByDefault": false,
        "id": "fr-consent-modal"
    });

    function ConsentManagement(props: { lang: string; }) {

        const { lang } = props;

        const { t } = useTranslation();

        const finalityDescription = useMemo(
            () =>
                typeof finalityDescriptionOrGetFinalityDescription === "function"
                    ? finalityDescriptionOrGetFinalityDescription({ lang })
                    : finalityDescriptionOrGetFinalityDescription,
            [lang]
        );

        console.log("do something with", personalDataPolicyLinkProps);
        console.log("do something with", finalityDescription);

        return (
            <modal.Component title={t("consent modal title")}>
                <h1>TODO</h1>
            </modal.Component>
        );
    }

    function openManagementModal() {
        modal.open();
    }

    return { ConsentManagement, openManagementModal };

}


const { useTranslation, addConsentBannerAndConsentManagementTranslations } = createComponentI18nApi(
    {
        "componentName": "ConsentBannerAndConsentManagement",
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
