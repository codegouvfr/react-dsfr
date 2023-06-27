import React, { useReducer, useEffect } from "react";
import { FooterBottomItem } from "../../Footer";
import { createConsentBanner } from "./ConsentBanner";
import { createConsentManagement } from "./ConsentManagement";
import { useTranslation } from "./translation";
export function createConsentBannerAndConsentManagement(params) {
    const { finalityDescription, useFinalityConsent, processConsentChanges, personalDataPolicyLinkProps, finalities } = params;
    const { ConsentManagement, consentModalButtonProps, useIsConsentManagementOpen } = createConsentManagement({
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
    let onHydrated = () => {
        processConsentChanges({ "type": "no changes but trigger consent callbacks" });
        onHydrated = undefined;
    };
    function ConsentBannerAndConsentManagement() {
        const [isHydrated, setIsHydrated] = useReducer(() => true, false);
        useEffect(() => {
            onHydrated === null || onHydrated === void 0 ? void 0 : onHydrated();
            setIsHydrated();
        }, []);
        const finalityConsent = useFinalityConsent();
        const isConsentManagementOpen = useIsConsentManagementOpen();
        if (!isHydrated) {
            return null;
        }
        return (React.createElement(React.Fragment, null,
            finalityConsent === undefined && !isConsentManagementOpen && React.createElement(ConsentBanner, null),
            React.createElement(ConsentManagement, null)));
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
function createFooterConsentManagementItem(params) {
    const { consentModalButtonProps } = params;
    function FooterConsentManagementItem() {
        const { t } = useTranslation();
        return (React.createElement(FooterBottomItem, { bottomItem: {
                "buttonProps": consentModalButtonProps,
                "text": t("cookies management")
            } }));
    }
    return { FooterConsentManagementItem };
}
function createFooterPersonalDataPolicyItem(params) {
    const { personalDataPolicyLinkProps } = params;
    function FooterPersonalDataPolicyItem() {
        const { t } = useTranslation();
        if (personalDataPolicyLinkProps === undefined) {
            throw new Error([
                "You should provide a personalDataPolicyLinkProps to createConsentManagement if",
                "you want to add a link to the personal data policy in the footer"
            ].join(" "));
        }
        return (React.createElement(FooterBottomItem, { bottomItem: {
                "text": t("personal data"),
                "linkProps": personalDataPolicyLinkProps
            } }));
    }
    return { FooterPersonalDataPolicyItem };
}
//# sourceMappingURL=ConsentBannerAndConsentManagement.js.map