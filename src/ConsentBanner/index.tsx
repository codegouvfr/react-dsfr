"use client";

import React, { memo } from "react";
import { useEffect, useState } from "react";

import { useGdprStore } from "../useGdprStore";
import { symToStr } from "tsafe/symToStr";
import { createModal } from "../Modal";
import { ConsentBannerContent, ConsentBannerContentProps } from "./ConsentBannerContent";
import { ConsentManager } from "./ConsentManager";

const { ConsentModal, consentModalButtonProps } = createModal({
    name: "Consent",
    isOpenedByDefault: false
});

export { consentModalButtonProps };

export type ConsentBannerProps = Omit<ConsentBannerContentProps, "consentModalButtonProps">;

export const ConsentBanner = memo((props: ConsentBannerProps) => {
    const { gdprPageLink, services } = props;

    const firstChoiceMade = useGdprStore(state => state.firstChoiceMade);
    const __inited = useGdprStore(state => state.__inited);
    const [stateFCM, setStateFCM] = useState(true);

    useEffect(() => {
        __inited && setStateFCM(firstChoiceMade);
    }, [firstChoiceMade, __inited]);

    return (
        <>
            <ConsentModal title="Panneau de gestion des cookies" size="large">
                <ConsentManager
                    gdprPageLink={gdprPageLink}
                    services={services}
                    consentModalButtonProps={consentModalButtonProps}
                />
            </ConsentModal>
            {!stateFCM && (
                <ConsentBannerContent
                    {...props}
                    consentModalButtonProps={consentModalButtonProps}
                />
            )}
        </>
    );
});

ConsentBanner.displayName = symToStr({ ConsentBanner });
