"use client";

import { ButtonsGroup } from "../ButtonsGroup";
import { fr } from "../fr";
import React from "react";
import { useGdprStore } from "../useGdprStore";
import { GdprService } from "../gdpr";
import { ModalProps } from "../Modal";

export interface ConsentBannerActionsProps {
    services: GdprService[];
    consentModalButtonProps: ModalProps.ModalButtonProps;
}

export const ConsentBannerActions = ({
    services,
    consentModalButtonProps
}: ConsentBannerActionsProps) => {
    const setConsent = useGdprStore(state => state.setConsent);
    const setFirstChoiceMade = useGdprStore(state => state.setFirstChoiceMade);
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
    return (
        <ButtonsGroup
            className={fr.cx("fr-consent-banner__buttons")}
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
    );
};
