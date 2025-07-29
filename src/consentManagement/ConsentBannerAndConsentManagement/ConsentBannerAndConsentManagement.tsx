import React, { useReducer, useEffect, type ReactNode } from "react";
import type { RegisteredLinkProps } from "../../link";
import type {
    ExtractFinalityFromFinalityDescription,
    FinalityConsent,
    SubFinalityContent
} from "../types";
import type { ProcessConsentChanges } from "../processConsentChanges";
import { FooterBottomItem } from "../../Footer";
import { createConsentBanner } from "./ConsentBanner";
import { createConsentManagement } from "./ConsentManagement";
import { useTranslation } from "./translation";

export function createConsentBannerAndConsentManagement<
    FinalityDescription extends Record<
        string,
        {
            title: ReactNode;
            description?: ReactNode;
            subFinalities?: Record<string, SubFinalityContent>;
        }
    >
>(params: {
    finalityDescription: ((params: { lang: string }) => FinalityDescription) | FinalityDescription;
    useFinalityConsent: () =>
        | FinalityConsent<ExtractFinalityFromFinalityDescription<FinalityDescription>>
        | undefined;
    processConsentChanges: ProcessConsentChanges<
        ExtractFinalityFromFinalityDescription<FinalityDescription>
    >;
    personalDataPolicyLinkProps?: RegisteredLinkProps;
    finalities: ExtractFinalityFromFinalityDescription<FinalityDescription>[];
}) {
    const {
        finalityDescription,
        useFinalityConsent,
        processConsentChanges,
        personalDataPolicyLinkProps,
        finalities
    } = params;

    const { ConsentManagement, consentModalButtonProps, useIsConsentManagementOpen } =
        createConsentManagement({
            finalityDescription,
            personalDataPolicyLinkProps,
            useFinalityConsent,
            processConsentChanges,
            finalities
        });

    const { ConsentBanner } = createConsentBanner({
        personalDataPolicyLinkProps,
        processConsentChanges,
        consentModalButtonProps
    });

    const { FooterConsentManagementItem } = createFooterConsentManagementItem({
        consentModalButtonProps
    });

    let onHydrated: (() => void) | undefined = () => {
        processConsentChanges({ "type": "no changes but trigger consent callbacks" });
        onHydrated = undefined;
    };

    function ConsentBannerAndConsentManagement() {
        const [isHydrated, setIsHydrated] = useReducer(() => true, false);

        useEffect(() => {
            onHydrated?.();

            setIsHydrated();
        }, []);

        const finalityConsent = useFinalityConsent();

        const isConsentManagementOpen = useIsConsentManagementOpen();

        if (!isHydrated) {
            return null;
        }

        return (
            <>
                {finalityConsent === undefined && !isConsentManagementOpen && <ConsentBanner />}
                <ConsentManagement />
            </>
        );
    }

    const { FooterPersonalDataPolicyItem } = createFooterPersonalDataPolicyItem({
        personalDataPolicyLinkProps
    });

    return {
        ConsentBannerAndConsentManagement,
        FooterConsentManagementItem,
        FooterPersonalDataPolicyItem
    };
}

function createFooterConsentManagementItem(params: {
    consentModalButtonProps: {
        "aria-controls": string;
        "data-fr-opened": boolean;
    };
}) {
    const { consentModalButtonProps } = params;

    function FooterConsentManagementItem() {
        const { t } = useTranslation();

        return (
            <FooterBottomItem
                bottomItem={{
                    "buttonProps": consentModalButtonProps,
                    "text": t("cookies management")
                }}
            />
        );
    }

    return { FooterConsentManagementItem };
}

function createFooterPersonalDataPolicyItem(params: {
    personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
}) {
    const { personalDataPolicyLinkProps } = params;

    function FooterPersonalDataPolicyItem() {
        const { t } = useTranslation();

        if (personalDataPolicyLinkProps === undefined) {
            throw new Error(
                [
                    "You should provide a personalDataPolicyLinkProps to createConsentManagement if",
                    "you want to add a link to the personal data policy in the footer"
                ].join(" ")
            );
        }

        return (
            <FooterBottomItem
                bottomItem={{
                    "text": t("personal data"),
                    "linkProps": personalDataPolicyLinkProps
                }}
            />
        );
    }
    return { FooterPersonalDataPolicyItem };
}
