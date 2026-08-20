"use client";

import React from "react";
import { ArtworkGov } from "./ArtworkGov";
import { useIsGov } from "../../mui/useIsGov";
import { useArtworkWhiteLabel } from "./ArtworkWhiteLabel/useArtworkWhiteLabel";
import { assert } from "tsafe/assert";

export function Artwork(props: { theme: "light" | "dark" | "system"; className?: string }) {
    const { theme, className } = props;

    const { isGov } = useIsGov();
    const { ArtworkWhiteLabel } = useArtworkWhiteLabel();

    if (!isGov) {
        assert(ArtworkWhiteLabel !== undefined);

        return <ArtworkWhiteLabel theme={theme} sizePx={80} />;
    }

    return <ArtworkGov theme={theme} className={className} />;
}
