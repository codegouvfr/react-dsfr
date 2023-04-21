"use client";
import React, { useState, useEffect } from "react";
import { useGdprStore } from "../useGdprStore";
import { ConsentBannerContent } from "./ConsentBannerContent";
export function ConsentBannerContentDisplayer(props) {
    const firstChoiceMade = useGdprStore(state => state.firstChoiceMade);
    const __inited = useGdprStore(state => state.__inited);
    const [isFCM, setIsFCM] = useState(true);
    useEffect(() => {
        if (!__inited)
            return;
        setIsFCM(firstChoiceMade);
    }, [firstChoiceMade, __inited]);
    if (isFCM)
        return null;
    return React.createElement(ConsentBannerContent, Object.assign({}, props));
}
//# sourceMappingURL=ConsentBannerContentDisplayer.js.map