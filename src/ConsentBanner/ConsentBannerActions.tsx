"use client";

import { ButtonsGroup } from "../ButtonsGroup";
import { fr } from "../fr";
import React from "react";
import { useGdprStore } from "../useGdprStore";
import { type GdprService } from "../gdpr";
import { type ModalProps } from "../Modal";
import { useTranslation } from "./i18n";

export interface ConsentBannerActionsProps {
    services: GdprService[];
    consentModalButtonProps: ModalProps.ModalButtonProps;
}

export function ConsentBannerActions({
    services,
    consentModalButtonProps
}: ConsentBannerActionsProps) {
    const setConsent = useGdprStore(state => state.setConsent);
    const setFirstChoiceMade = useGdprStore(state => state.setFirstChoiceMade);

    const { t } = useTranslation();

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
                    children: t("accept all"),
                    title: t("accept all - title"),
                    onClick: () => acceptAll()
                },
                {
                    children: t("refuse all"),
                    title: t("refuse all - title"),
                    onClick: () => refuseAll()
                },
                {
                    children: t("customize cookies"),
                    title: t("customize cookies - title"),
                    priority: "secondary",
                    ...consentModalButtonProps
                }
            ]}
        />
    );
}
