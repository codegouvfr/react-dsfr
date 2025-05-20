"use client";
import React, { Suspense, lazy } from "react";
import { ArtworkGov } from "./ArtworkGov";
import { useIsGov } from "../../mui/useIsGov";
const ArtworkWhiteLabel = lazy(() => import("./ArtworkWhiteLabel"));
export function Artwork(props) {
    const { theme, className } = props;
    const { isGov } = useIsGov();
    if (!isGov) {
        return (React.createElement(Suspense, null,
            React.createElement(ArtworkWhiteLabel, { theme: theme, sizePx: 80 })));
    }
    return React.createElement(ArtworkGov, { theme: theme, className: className });
}
//# sourceMappingURL=Artwork.js.map