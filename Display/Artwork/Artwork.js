"use client";
import React from "react";
import { ArtworkGov } from "./ArtworkGov";
import { useIsGov } from "../../mui/useIsGov";
import { useArtworkWhiteLabel } from "./ArtworkWhiteLabel/useArtworkWhiteLabel";
import { assert } from "tsafe/assert";
export function Artwork(props) {
    const { theme, className } = props;
    const { isGov } = useIsGov();
    const { ArtworkWhiteLabel } = useArtworkWhiteLabel();
    if (!isGov) {
        assert(ArtworkWhiteLabel !== undefined);
        return React.createElement(ArtworkWhiteLabel, { theme: theme, sizePx: 80 });
    }
    return React.createElement(ArtworkGov, { theme: theme, className: className });
}
//# sourceMappingURL=Artwork.js.map