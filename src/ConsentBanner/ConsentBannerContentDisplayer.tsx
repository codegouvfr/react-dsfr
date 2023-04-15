"use client";

import React, { useState, useEffect } from "react";
import { useGdprStore } from "../useGdprStore";
import { ConsentBannerContent, ConsentBannerContentProps } from "./ConsentBannerContent";

export const ConsentBannerContentDisplayer = (props: ConsentBannerContentProps) => {
    const firstChoiceMade = useGdprStore(state => state.firstChoiceMade);
    const __inited = useGdprStore(state => state.__inited);
    const [stateFCM, setStateFCM] = useState(true);

    useEffect(() => {
        __inited && setStateFCM(firstChoiceMade);
    }, [firstChoiceMade, __inited]);

    if (stateFCM) return null;
    return <ConsentBannerContent {...props} />;
};
