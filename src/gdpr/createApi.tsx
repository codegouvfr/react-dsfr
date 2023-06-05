import React from "react";
import {
    ConsentBannerAndConsentManagement as ClientComponent,
    type ConsentBannerAndConsentManagementProps
} from "./ConsentBannerAndConsentManagement";
import { getFooterPersonalDataPolicyItem, footerConsentManagementItem } from "./footerItems";
import { useGdpr } from "./useGdpr";
import type { FinalityToFinalityConsent } from "./types";

export function createGdprApi(params: ConsentBannerAndConsentManagementProps) {
    const { personalDataPolicyLinkProps } = params;

    function ConsentBannerAndConsentManagement() {
        return <ClientComponent {...params} />;
    }

    const footerPersonalDataPolicyItem =
        personalDataPolicyLinkProps === undefined
            ? (null as any)
            : getFooterPersonalDataPolicyItem({
                  "personalDataPolicyLinkProps": personalDataPolicyLinkProps
              });

    return {
        ConsentBannerAndConsentManagement,
        footerConsentManagementItem,
        footerPersonalDataPolicyItem,
        useGdpr
    };
}
