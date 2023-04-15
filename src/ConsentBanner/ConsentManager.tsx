import React, { useState, useEffect } from "react";
import ButtonsGroup from "../ButtonsGroup";
import { fr } from "../fr";
import { GdprService } from "../gdpr";
import { useGdprStore } from "../useGdprStore";
import { ConsentBannerContentProps } from "./ConsentBannerContent";

const partition = <T,>(arr: T[], criteria: (item: T) => boolean): [T[], T[]] => [
    arr.filter(item => criteria(item)),
    arr.filter(item => !criteria(item))
];

type ConsentManagerProps = Required<Omit<ConsentBannerContentProps, "siteName">>;
export const ConsentManager = ({
    gdprPageLink,
    services,
    gdprPageLinkAs: GdprPageLinkAs,
    consentModalButtonProps
}: ConsentManagerProps) => {
    const setConsent = useGdprStore(state => state.setConsent);
    const setFirstChoiceMade = useGdprStore(state => state.setFirstChoiceMade);
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
                        Préférences pour tous les services.
                        <br />
                        <GdprPageLinkAs href={gdprPageLink}>
                            Données personnelles et cookies
                        </GdprPageLinkAs>
                    </legend>
                    <div className={fr.cx("fr-consent-service__radios")}>
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
                                    Accepter
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
                                    Refuser
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
                        children: "Confirmer mes choix",
                        title: "Confirmer mes choix",
                        onClick: () => confirm()
                    }
                ]}
            />
        </div>
    );
};
