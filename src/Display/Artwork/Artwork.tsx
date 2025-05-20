"use client";

import React, { Suspense, lazy } from "react";
import { ArtworkGov } from "./ArtworkGov";
import { useIsGov } from "../../mui/useIsGov";
const ArtworkWhiteLabel = lazy(() => import("./ArtworkWhiteLabel"));

export function Artwork(props: { theme: "light" | "dark" | "system" }) {
    const { theme } = props;

    const { isGov } = useIsGov();

    if (!isGov) {
        return (
            <Suspense>
                <ArtworkWhiteLabel theme={theme} sizePx={80} />
            </Suspense>
        );
    }

    return <ArtworkGov theme={theme} />;
}
