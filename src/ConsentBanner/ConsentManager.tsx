"use client";

import React, { useState, useEffect } from "react";
import { ButtonsGroup } from "../ButtonsGroup";
import { fr } from "../fr";
import { type GdprService } from "../gdpr";
import { getLink } from "../link";
import { partition } from "../tools/partition";
import { useGdprStore } from "../useGdprStore";
import { type ConsentBannerContentProps } from "./ConsentBannerContent";
import { useTranslation } from "./i18n";

export type ConsentManagerProps = Required<Omit<ConsentBannerContentProps, "siteName">>;
export function ConsentManager({
    gdprLinkProps,
    services,
    consentModalButtonProps
}: ConsentManagerProps) {
    const { Link } = getLink();
    const setConsent = useGdprStore(state => state.setConsent);
    const setFirstChoiceMade = useGdprStore(state => state.setFirstChoiceMade);
    const consents = useGdprStore(state => state.consents);
    const [accepted, setAccepted] = useState<string[]>([]);

    const { t } = useTranslation();

    useEffect(() => {
        setAccepted([
            ...Object.entries(consents)
                .filter(([, consent]) => consent)
                .map(([name]) => name)
        ]);
    }, [consents]);

    const accept = (service?: GdprService) => {
        if (service && !service.mandatory && !accepted.includes(service.name)) {
            return setAccepted([...accepted, service.name]);
        }

        const filtered = services
            .filter(service => !service.mandatory)
            .map(service => service.name);
        setAccepted([...new Set([...filtered, ...accepted])]);
    };

    const refuse = (service?: GdprService) => {
        if (service && !service.mandatory && accepted.includes(service.name))
            return setAccepted(accepted.filter(name => service.name !== name));

        setAccepted([]);
    };

    const confirm = () => {
        const [acceptedServices, refusedServices] = partition(services, service =>
            accepted.includes(service.name)
        );
        acceptedServices.forEach(service => setConsent(service.name, true));
        refusedServices.forEach(service => setConsent(service.name, false));
        setFirstChoiceMade();
    };

    return (
        <div className="fr-consent-manager">
            <div className={fr.cx("fr-consent-service", "fr-consent-manager__header")}>
                <fieldset
                    className={fr.cx("fr-fieldset", "fr-fieldset--inline")}
                    aria-describedby="fr-consent-service__title"
                >
                    <legend
                        className={fr.cx("fr-consent-service__title")}
                        id="fr-consent-service__title"
                    >
                        {t("all services pref")}
                        <br />
                        <Link {...gdprLinkProps}>{t("personal data cookies")}</Link>
                    </legend>
                    <div className={fr.cx("fr-consent-service__radios")}>
                        <ButtonsGroup
                            inlineLayoutWhen="always"
                            alignment="right"
                            buttons={[
                                {
                                    onClick: () => accept(),
                                    title: t("accept all"),
                                    children: t("accept all")
                                },
                                {
                                    onClick: () => refuse(),
                                    title: t("refuse all"),
                                    children: t("refuse all"),
                                    priority: "secondary"
                                }
                            ]}
                        />
                    </div>
                </fieldset>
            </div>
            {services.map((service, index) => (
                <div className={fr.cx("fr-consent-service")} key={`consent-service-${index}`}>
                    <fieldset className={fr.cx("fr-fieldset", "fr-fieldset--inline")}>
                        <legend
                            aria-describedby={`finality-${index}-desc`}
                            className={fr.cx("fr-consent-service__title")}
                        >
                            {service.title}
                        </legend>
                        <div className={fr.cx("fr-consent-service__radios")}>
                            <div className={fr.cx("fr-radio-group")}>
                                <input
                                    type="radio"
                                    id={`consent-finality-${index}-accept`}
                                    name={`consent-finality-${index}`}
                                    {...(service.mandatory
                                        ? { disabled: true, checked: true }
                                        : { checked: accepted.includes(service.name) })}
                                    readOnly
                                    onClick={() => accept(service)}
                                />
                                <label
                                    htmlFor={`consent-finality-${index}-accept`}
                                    className={fr.cx("fr-label")}
                                >
                                    {t("accept")}
                                </label>
                            </div>
                            <div className={fr.cx("fr-radio-group")}>
                                <input
                                    {...(service.mandatory
                                        ? { disabled: true, checked: false }
                                        : { checked: !accepted.includes(service.name) })}
                                    type="radio"
                                    id={`consent-finality-${index}-refuse`}
                                    name={`consent-finality-${index}`}
                                    readOnly
                                    onClick={() => refuse(service)}
                                />
                                <label
                                    htmlFor={`consent-finality-${index}-refuse`}
                                    className={fr.cx("fr-label")}
                                >
                                    {t("refuse")}
                                </label>
                            </div>
                        </div>
                        <p
                            id={`finality-${index}-desc`}
                            className={fr.cx("fr-consent-service__desc")}
                        >
                            {service.description}
                        </p>
                    </fieldset>
                </div>
            ))}
            <ButtonsGroup
                className={fr.cx("fr-consent-manager__buttons")}
                alignment="right"
                inlineLayoutWhen="sm and up"
                buttons={[
                    {
                        ...consentModalButtonProps,
                        children: t("confirm choices"),
                        title: t("confirm choices"),
                        onClick: () => confirm()
                    }
                ]}
            />
        </div>
    );
}
