import React from "react";
import type { FooterProps } from "../Footer";
import { modal } from "./modal";
import { createComponentI18nApi } from "../i18n";
import type { RegisteredLinkProps } from "../link";

export const footerConsentManagementItem: FooterProps.BottomItem.Button = {
    "buttonProps": modal.buttonProps,
    "text": (() => {
        function Text() {
            const { t } = useTranslation();
            return <>{t("cookies management")}</>;
        }

        return <Text />;
    })()
};

export function getFooterPersonalDataPolicyItem(params: {
    personalDataPolicyLinkProps: RegisteredLinkProps;
}): FooterProps.BottomItem.Link {
    const { personalDataPolicyLinkProps } = params;
    return {
        "linkProps": personalDataPolicyLinkProps,
        "text": (() => {
            function Text() {
                const { t } = useTranslation();
                return <>{t("personal data")}</>;
            }
            return <Text />;
        })()
    };
}

const { useTranslation, addGdprFooterItemsTranslations } = createComponentI18nApi({
    "componentName": "gdprFooterItems",
    "frMessages": {
        /** cspell: disable */
        "cookies management": "Gestion des cookies",
        "personal data": "Données personnelles"
        /** cspell: enable */
    }
});

addGdprFooterItemsTranslations({
    "lang": "en",
    "messages": {
        "cookies management": "Cookies management"
    }
});

export { addGdprFooterItemsTranslations };
