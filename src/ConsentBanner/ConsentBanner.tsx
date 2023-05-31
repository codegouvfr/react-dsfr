import React, { type CSSProperties } from "react";
import { createModal } from "../Modal";
import { createPersistentSignal } from "../tools/persistentSignal";
import { id } from "tsafe/id";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import { fr } from "../fr";
import { createComponentI18nApi } from "../i18n";
import { getLink, type RegisteredLinkProps } from "../link";
import { cx } from "../tools/cx";
import type { Finality, FinalityConsent, FinalityDescription } from "./types";
import { assert } from "tsafe/assert";
import { createProcessBulkConsentChange } from "./createProcessBulkConsentChange";

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

const { useFinalityConsent, $finalityConsent } = createPersistentSignal({
    "name": "finalityConsent",
    "defaultValue": id<FinalityConsent | undefined>(undefined)
});

let processBulkConsentChange:
    | ReturnType<typeof createProcessBulkConsentChange>["processBulkConsentChange"]
    | undefined = undefined;

processBulkConsentChange = undefined;

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
            processBulkConsentChange !== undefined,
            "ConsentBanner must be mounted before calling assumeConsent"
        );

        await processBulkConsentChange({
            "paramsOfOnConsentChangeArr": [
                {
                    finality,
                    "isConsentGiven_prev": finalityConsent[finality],
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

export function ConsentBanner(props: ConsentBannerProps) {
    const { className, style, classes = {}, gdprLinkProps /*finalities*/ } = props;

    const { t } = useTranslation();

    //const { finalitiesConsent, setFinalitiesConsent } = useFinalitiesConsentPersistentState();

    return (
        <>
            <div style={style} className={cx(fr.cx("fr-consent-banner"), classes.root, className)}>
                <h2 className={fr.cx("fr-h6")}>
                    {t("about cookies", { "hostname": window.location.hostname })}
                </h2>
                <div className={classes.content}>
                    <p className={fr.cx("fr-text--sm")}>
                        {t("welcome message", { gdprLinkProps })}
                    </p>
                </div>
                <ul
                    className={cx(
                        fr.cx(
                            "fr-consent-banner__buttons",
                            "fr-btns-group",
                            "fr-btns-group--right",
                            "fr-btns-group--inline-reverse",
                            "fr-btns-group--inline-sm"
                        ),
                        classes.buttons
                    )}
                >
                    <li>
                        <button
                            className={fr.cx("fr-btn")}
                            title={t("accept all")}
                            onClick={() => {
                                //TODO: Using keys of finalities and setFinalitiesConsent, set everything to accept
                            }}
                        >
                            {t("accept all")}
                        </button>
                    </li>
                    <li>
                        <button className={fr.cx("fr-btn")} title={t("refuse all")}>
                            {t("refuse all")}
                        </button>
                    </li>
                    <li>
                        <button
                            className={fr.cx("fr-btn", "fr-btn--secondary")}
                            data-fr-opened={false}
                            aria-controls={
                                consentModalButtonProps.nativeButtonProps["aria-controls"]
                            }
                            title={t("customize")}
                        >
                            {t("customize")}
                        </button>
                    </li>
                </ul>
            </div>
            <ConsentModal title={t("consent modal title")}>
                <div className={fr.cx("fr-consent-service", "fr-consent-manager__header")}>
                    <fieldset className={fr.cx("fr-fieldset", "fr-fieldset--inline")}>
                        <legend id="finality-legend" className={fr.cx("fr-consent-service__title")}>
                            Préférences pour tous les services.{" "}
                            <a href="">Données personnelles et cookies</a>
                        </legend>
                        <div className={fr.cx("fr-consent-service__radios")}>
                            <div className={fr.cx("fr-radio-group")}>
                                <input type="radio" id="consent-all-accept" name="consent-all" />
                                <label className={fr.cx("fr-label")} htmlFor="consent-all-accept">
                                    {t("accept all")}
                                </label>
                            </div>
                            <div className={fr.cx("fr-radio-group")}>
                                <input type="radio" id="consent-all-refuse" name="consent-all" />
                                <label className={fr.cx("fr-label")} htmlFor="consent-all-refuse">
                                    {t("refuse all")}
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                {/*
                    <div className={fr.cx("fr-consent-service")}>
                        <fieldset aria-labelledby="finality-0-legend finality-0-desc" role="group" class="fr-fieldset fr-fieldset--inline">
                            <legend id="finality-0-legend" class="fr-consent-service__title">Cookies obligatoires</legend>
                            <div class="fr-consent-service__radios">
                                <div class="fr-radio-group">
                                    <input type="radio" id="consent-finality-0-accept" name="consent-finality-0">
                                        <label class="fr-label" for="consent-finality-0-accept">
                                            Accepter
                                        </label>
                                </div>
                                <div class="fr-radio-group">
                                    <input disabled type="radio" id="consent-finality-0-refuse" name="consent-finality-0">
                                        <label class="fr-label" for="consent-finality-0-refuse">
                                            Refuser
                                        </label>
                                </div>
                            </div>
                            <p id="finality-0-desc" class="fr-consent-service__desc">Ce site utilise des cookies nécessaires à son bon fonctionnement qui ne peuvent pas être désactivés.</p>
                        </fieldset>
                    </div>
                    <div class="fr-consent-service">
                        <fieldset aria-labelledby="finality-1-legend finality-1-desc" role="group" class="fr-fieldset fr-fieldset--inline">
                            <legend id="finality-1-legend" class="fr-consent-service__title">Nom de la finalité</legend>
                            <div class="fr-consent-service__radios">
                                <div class="fr-radio-group">
                                    <input type="radio" id="consent-finality-1-accept" name="consent-finality-1">
                                        <label class="fr-label" for="consent-finality-1-accept">
                                            Accepter
                                        </label>
                                </div>
                                <div class="fr-radio-group">
                                    <input type="radio" id="consent-finality-1-refuse" name="consent-finality-1">
                                        <label class="fr-label" for="consent-finality-1-refuse">
                                            Refuser
                                        </label>
                                </div>
                            </div>
                            <p id="finality-1-desc" class="fr-consent-service__desc">Description optionnelle de la finalité, lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in suscipit nulla, et pulvinar velit.</p>
                            <div class="fr-consent-service__collapse">
                                <button class="fr-consent-service__collapse-btn" aria-expanded="false" aria-describedby="finality-1-legend" aria-controls="finality-1-collapse"> Voir plus de détails</button>
                            </div>
                            <div class="fr-consent-services fr-collapse" id="finality-1-collapse">
                                <!-- Sous finalités -->
                                <div class="fr-consent-service">
                                    <fieldset class="fr-fieldset fr-fieldset--inline">
                                        <legend id="finality-1-service-1-legend" class="fr-consent-service__title">Sous finalité 1</legend>
                                        <div class="fr-consent-service__radios fr-fieldset--inline">
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-1-service-1-accept" name="consent-finality-1-service-1">
                                                    <label class="fr-label" for="consent-finality-1-service-1-accept">
                                                        Accepter
                                                    </label>
                                            </div>
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-1-service-1-refuse" name="consent-finality-1-service-1">
                                                    <label class="fr-label" for="consent-finality-1-service-1-refuse">
                                                        Refuser
                                                    </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="fr-consent-service">
                                    <fieldset aria-labelledby="finality-1-service-2-legend finality-1-service-2-desc" role="group" class="fr-fieldset fr-fieldset--inline">
                                        <legend id="finality-1-service-2-legend" class="fr-consent-service__title" aria-describedby="finality-1-service-2-desc">Sous finalité 2</legend>
                                        <div class="fr-consent-service__radios fr-fieldset--inline">
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-1-service-2-accept" name="consent-finality-1-service-2">
                                                    <label class="fr-label" for="consent-finality-1-service-2-accept">
                                                        Accepter
                                                    </label>
                                            </div>
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-1-service-2-refuse" name="consent-finality-1-service-2">
                                                    <label class="fr-label" for="consent-finality-1-service-2-refuse">
                                                        Refuser
                                                    </label>
                                            </div>
                                        </div>
                                        <p id="finality-1-service-2-desc" class="fr-consent-service__desc">Ce service utilise 3 cookies.</p>
                                    </fieldset>
                                </div>
                                <div class="fr-consent-service">
                                    <fieldset class="fr-fieldset fr-fieldset--inline">
                                        <legend id="finality-1-service-3-legend" class="fr-consent-service__title">Sous finalité 3</legend>
                                        <div class="fr-consent-service__radios fr-fieldset--inline">
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-1-service-3-accept" name="consent-finality-1-service-3">
                                                    <label class="fr-label" for="consent-finality-1-service-3-accept">
                                                        Accepter
                                                    </label>
                                            </div>
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-1-service-3-refuse" name="consent-finality-1-service-3">
                                                    <label class="fr-label" for="consent-finality-1-service-3-refuse">
                                                        Refuser
                                                    </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="fr-consent-service">
                        <fieldset aria-labelledby="finality-2-legend finality-2-desc" role="group" class="fr-fieldset fr-fieldset--inline">
                            <legend id="finality-2-legend" class="fr-consent-service__title">Nom de la finalité</legend>
                            <div class="fr-consent-service__radios">
                                <div class="fr-radio-group">
                                    <input type="radio" id="consent-finality-2-accept" name="consent-finality-2">
                                        <label class="fr-label" for="consent-finality-2-accept">
                                            Accepter
                                        </label>
                                </div>
                                <div class="fr-radio-group">
                                    <input type="radio" id="consent-finality-2-refuse" name="consent-finality-2">
                                        <label class="fr-label" for="consent-finality-2-refuse">
                                            Refuser
                                        </label>
                                </div>
                            </div>
                            <p id="finality-2-desc" class="fr-consent-service__desc">Description optionnelle de la finalité, lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in suscipit nulla, et pulvinar velit.</p>
                            <div class="fr-consent-service__collapse">
                                <button class="fr-consent-service__collapse-btn" aria-expanded="false" aria-describedby="finality-2-legend" aria-controls="finality-2-collapse"> Voir plus de détails</button>
                            </div>
                            <div class="fr-consent-services fr-collapse" id="finality-2-collapse">
                                <!-- Sous finalités -->
                                <div class="fr-consent-service">
                                    <fieldset class="fr-fieldset fr-fieldset--inline">
                                        <legend id="finality-2-service-1-legend" class="fr-consent-service__title">Sous finalité 1</legend>
                                        <div class="fr-consent-service__radios fr-fieldset--inline">
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-2-service-1-accept" name="consent-finality-2-service-1">
                                                    <label class="fr-label" for="consent-finality-2-service-1-accept">
                                                        Accepter
                                                    </label>
                                            </div>
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-2-service-1-refuse" name="consent-finality-2-service-1">
                                                    <label class="fr-label" for="consent-finality-2-service-1-refuse">
                                                        Refuser
                                                    </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="fr-consent-service">
                                    <fieldset aria-labelledby="finality-2-service-2-legend finality-2-service-2-desc" role="group" class="fr-fieldset fr-fieldset--inline">
                                        <legend id="finality-2-service-2-legend" class="fr-consent-service__title" aria-describedby="finality-2-service-2-desc">Sous finalité 2</legend>
                                        <div class="fr-consent-service__radios fr-fieldset--inline">
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-2-service-2-accept" name="consent-finality-2-service-2">
                                                    <label class="fr-label" for="consent-finality-2-service-2-accept">
                                                        Accepter
                                                    </label>
                                            </div>
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-2-service-2-refuse" name="consent-finality-2-service-2">
                                                    <label class="fr-label" for="consent-finality-2-service-2-refuse">
                                                        Refuser
                                                    </label>
                                            </div>
                                        </div>
                                        <p id="finality-2-service-2-desc" class="fr-consent-service__desc">Ce service utilise 3 cookies.</p>
                                    </fieldset>
                                </div>
                                <div class="fr-consent-service">
                                    <fieldset class="fr-fieldset fr-fieldset--inline">
                                        <legend id="finality-2-service-3-legend" class="fr-consent-service__title">Sous finalité 3</legend>
                                        <div class="fr-consent-service__radios fr-fieldset--inline">
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-2-service-3-accept" name="consent-finality-2-service-3">
                                                    <label class="fr-label" for="consent-finality-2-service-3-accept">
                                                        Accepter
                                                    </label>
                                            </div>
                                            <div class="fr-radio-group">
                                                <input type="radio" id="consent-finality-2-service-3-refuse" name="consent-finality-2-service-3">
                                                    <label class="fr-label" for="consent-finality-2-service-3-refuse">
                                                        Refuser
                                                    </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <!-- Bouton de confirmation/fermeture -->
                    <ul class="fr-consent-manager__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-sm">
                        <li>
                            <button class="fr-btn">
                                Confirmer mes choix
                            </button>
                        </li>
                    </ul>
                        */}
            </ConsentModal>
        </>
    );
}

export const { useTranslation, addConsentBannerTranslations } = createComponentI18nApi({
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
