
import React from "react";
import { ConsentBannerAndConsentManagement as ClientComponent, type ConsentBannerAndConsentManagementProps } from "./ConsentBannerAndConsentManagement";
import { getFooterPersonalDataPolicyItem, footerConsentManagementItem } from "./zz_internal/footerItems";
import { useGdpr } from "./zz_internal/useGdpr";
export type { RegisterFinality } from "./zz_internal/types";


export function createGdprApi(params: ConsentBannerAndConsentManagementProps) {

    const { personalDataPolicyLinkProps } = params;

    function ConsentBannerAndConsentManagement() {

        return (
            <ClientComponent {...params} />
        );

    }

    const footerPersonalDataPolicyItem = 
        personalDataPolicyLinkProps === undefined ? null as any : getFooterPersonalDataPolicyItem({ "personalDataPolicyLinkProps": personalDataPolicyLinkProps });

    return { 
        ConsentBannerAndConsentManagement, 
        footerConsentManagementItem, 
        footerPersonalDataPolicyItem, 
        useGdpr 
    };

}