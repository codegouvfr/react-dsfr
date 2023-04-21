"use client";
import React, { useState, useEffect } from "react";
import { ButtonsGroup } from "../ButtonsGroup";
import { fr } from "../fr";
import { getLink } from "../link";
import { partition } from "../tools/partition";
import { useGdprStore } from "../useGdprStore";
import { useTranslation } from "./i18n";
export function ConsentManager({ gdprLinkProps, services, consentModalButtonProps }) {
    const { Link } = getLink();
    const setConsent = useGdprStore(state => state.setConsent);
    const setFirstChoiceMade = useGdprStore(state => state.setFirstChoiceMade);
    const consents = useGdprStore(state => state.consents);
    const [accepted, setAccepted] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        setAccepted([
            ...Object.entries(consents)
                .filter(([, consent]) => consent)
                .map(([name]) => name)
        ]);
    }, [consents]);
    const accept = (service) => {
        if (service && !service.mandatory && !accepted.includes(service.name)) {
            return setAccepted([...accepted, service.name]);
        }
        const filtered = services
            .filter(service => !service.mandatory)
            .map(service => service.name);
        setAccepted([...new Set([...filtered, ...accepted])]);
    };
    const refuse = (service) => {
        if (service && !service.mandatory && accepted.includes(service.name))
            return setAccepted(accepted.filter(name => service.name !== name));
        setAccepted([]);
    };
    const confirm = () => {
        const [acceptedServices, refusedServices] = partition(services, service => accepted.includes(service.name));
        acceptedServices.forEach(service => setConsent(service.name, true));
        refusedServices.forEach(service => setConsent(service.name, false));
        setFirstChoiceMade();
    };
    return (React.createElement("div", { className: "fr-consent-manager" },
        React.createElement("div", { className: fr.cx("fr-consent-service", "fr-consent-manager__header") },
            React.createElement("fieldset", { className: fr.cx("fr-fieldset", "fr-fieldset--inline"), "aria-describedby": "fr-consent-service__title" },
                React.createElement("legend", { className: fr.cx("fr-consent-service__title"), id: "fr-consent-service__title" },
                    t("all services pref"),
                    React.createElement("br", null),
                    React.createElement(Link, Object.assign({}, gdprLinkProps), t("personal data cookies"))),
                React.createElement("div", { className: fr.cx("fr-consent-service__radios") },
                    React.createElement(ButtonsGroup, { inlineLayoutWhen: "always", alignment: "right", buttons: [
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
                        ] })))),
        services.map((service, index) => (React.createElement("div", { className: fr.cx("fr-consent-service"), key: `consent-service-${index}` },
            React.createElement("fieldset", { className: fr.cx("fr-fieldset", "fr-fieldset--inline") },
                React.createElement("legend", { "aria-describedby": `finality-${index}-desc`, className: fr.cx("fr-consent-service__title") }, service.title),
                React.createElement("div", { className: fr.cx("fr-consent-service__radios") },
                    React.createElement("div", { className: fr.cx("fr-radio-group") },
                        React.createElement("input", Object.assign({ type: "radio", id: `consent-finality-${index}-accept`, name: `consent-finality-${index}` }, (service.mandatory
                            ? { disabled: true, checked: true }
                            : { checked: accepted.includes(service.name) }), { readOnly: true, onClick: () => accept(service) })),
                        React.createElement("label", { htmlFor: `consent-finality-${index}-accept`, className: fr.cx("fr-label") }, t("accept"))),
                    React.createElement("div", { className: fr.cx("fr-radio-group") },
                        React.createElement("input", Object.assign({}, (service.mandatory
                            ? { disabled: true, checked: false }
                            : { checked: !accepted.includes(service.name) }), { type: "radio", id: `consent-finality-${index}-refuse`, name: `consent-finality-${index}`, readOnly: true, onClick: () => refuse(service) })),
                        React.createElement("label", { htmlFor: `consent-finality-${index}-refuse`, className: fr.cx("fr-label") }, t("refuse")))),
                React.createElement("p", { id: `finality-${index}-desc`, className: fr.cx("fr-consent-service__desc") }, service.description))))),
        React.createElement(ButtonsGroup, { className: fr.cx("fr-consent-manager__buttons"), alignment: "right", inlineLayoutWhen: "sm and up", buttons: [
                Object.assign(Object.assign({}, consentModalButtonProps), { children: t("confirm choices"), title: t("confirm choices"), onClick: () => confirm() })
            ] })));
}
//# sourceMappingURL=ConsentManager.js.map