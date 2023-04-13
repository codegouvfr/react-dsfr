"use client";

import React from "react";
import { partition } from "lodash";
import { type ElementType, type PropsWithChildren, useEffect, useState } from "react";

import ButtonsGroup from "./ButtonsGroup";
import { ConsentModal, consentModalButtonProps } from "./gdpr/ConsentModal";
import { useGdprStore, useSetterStore } from "./gdpr/useGdprStore";
import { GdprService } from "./gdpr/types";

export interface ConsentBannerProps {
    gdprPageLink: string;
    gdprPageLinkAs?: ElementType<PropsWithChildren<{ href: any }>> | string;
    services: GdprService[];
    siteName: string;
}

export const ConsentBanner = ({
    gdprPageLink,
    gdprPageLinkAs: GdprPageLinkAs = "a",
    siteName,
    services
}: ConsentBannerProps) => {
    const { setConsent, setFirstChoiceMade } = useSetterStore();
    const [stateFCM, setStateFCM] = useState(true);
    const firstChoiceMade = useGdprStore(state => state.firstChoiceMade);

    const acceptAll = () => {
        services.forEach(service => {
            if (!service.mandatory) setConsent(service.name, true);
        });
        setFirstChoiceMade();
    };

    const refuseAll = () => {
        services.forEach(service => {
            if (!service.mandatory) setConsent(service.name, false);
        });
        setFirstChoiceMade();
    };

    useEffect(() => {
        setStateFCM(firstChoiceMade);
    }, [firstChoiceMade]);

    return (
        <>
            <ConsentModal title="Panneau de gestion des cookies" size="large">
                <ConsentManager
                    gdprPageLink={gdprPageLink}
                    gdprPageLinkAs={GdprPageLinkAs}
                    services={services}
                />
            </ConsentModal>
            {!stateFCM && (
                <div className="fr-consent-banner">
                    <h2 className="fr-h6">À propos des cookies sur {siteName}</h2>
                    <div className="fr-consent-banner__content">
                        <p className="fr-text--sm">
                            Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience
                            et les services disponibles sur ce site. Pour en savoir plus, visitez la
                            page{" "}
                            <GdprPageLinkAs href={gdprPageLink}>
                                Données personnelles et cookies
                            </GdprPageLinkAs>
                            . Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous
                            souhaitez activer.
                        </p>
                    </div>
                    <ButtonsGroup
                        className="fr-consent-banner__buttons"
                        alignment="right"
                        isReverseOrder
                        inlineLayoutWhen="sm and up"
                        buttons={[
                            {
                                children: "Tout accepter",
                                title: "Autoriser tous les cookies",
                                onClick: () => acceptAll()
                            },
                            {
                                children: "Tout refuser",
                                title: "Refuser tous les cookies",
                                onClick: () => refuseAll()
                            },
                            {
                                children: "Personnaliser",
                                title: "Personnaliser les cookies",
                                priority: "secondary",
                                ...consentModalButtonProps
                            }
                        ]}
                    />
                </div>
            )}
        </>
    );
};

type ConsentManagerProps = Required<Omit<ConsentBannerProps, "siteName">>;
const ConsentManager = ({
    gdprPageLink,
    services,
    gdprPageLinkAs: GdprPageLinkAs
}: ConsentManagerProps) => {
    const { setConsent, setFirstChoiceMade } = useSetterStore();
    const consents = useGdprStore(state => state.consents);
    const [accepted, setAccepted] = useState<string[]>([]);

    useEffect(() => {
        setAccepted([
            ...Object.entries(consents)
                .filter(([, consent]) => consent)
                .map(([name]) => name)
        ]);
    }, [consents]);

    const accept = (service?: GdprService) => {
        console.info("GDPR accept", service?.name ?? "all services");
        if (service && !service.mandatory && !accepted.includes(service.name)) {
            return setAccepted([...accepted, service.name]);
        }

        const filtered = services
            .filter(service => !service.mandatory)
            .map(service => service.name);
        setAccepted([...new Set([...filtered, ...accepted])]);
    };

    const refuse = (service?: GdprService) => {
        console.info("GDPR refuse", service?.name ?? "all services");
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
            <div className="fr-consent-service fr-consent-manager__header">
                <fieldset className="fr-fieldset fr-fieldset--inline">
                    <legend className="fr-consent-service__title">
                        Préférences pour tous les services.
                        <br />
                        <GdprPageLinkAs href={gdprPageLink}>
                            Données personnelles et cookies
                        </GdprPageLinkAs>
                    </legend>
                    <div className="fr-consent-service__radios">
                        <ButtonsGroup
                            inlineLayoutWhen="always"
                            alignment="right"
                            buttons={[
                                {
                                    onClick: () => accept(),
                                    title: "Tout accepter",
                                    children: "Tout accepter"
                                },
                                {
                                    onClick: () => refuse(),
                                    title: "Tout refuser",
                                    children: "Tout refuser",
                                    priority: "secondary"
                                }
                            ]}
                        />
                    </div>
                </fieldset>
            </div>
            {services.map((service, index) => (
                <div className="fr-consent-service" key={`consent-service-${index}`}>
                    <fieldset className="fr-fieldset fr-fieldset--inline">
                        <legend
                            aria-describedby={`finality-${index}-desc`}
                            className="fr-consent-service__title"
                        >
                            {service.title}
                        </legend>
                        <div className="fr-consent-service__radios">
                            <div className="fr-radio-group">
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
                                    className="fr-label"
                                >
                                    Accepter
                                </label>
                            </div>
                            <div className="fr-radio-group">
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
                                    className="fr-label"
                                >
                                    Refuser
                                </label>
                            </div>
                        </div>
                        <p id={`finality-${index}-desc`} className="fr-consent-service__desc">
                            {service.description}
                        </p>
                    </fieldset>
                </div>
            ))}
            <ButtonsGroup
                className="fr-consent-manager__buttons"
                alignment="right"
                inlineLayoutWhen="sm and up"
                buttons={[
                    {
                        ...consentModalButtonProps,
                        children: "Confirmer mes choix",
                        title: "Confirmer mes choix",
                        onClick: () => confirm()
                    }
                ]}
            />
        </div>
    );
};
