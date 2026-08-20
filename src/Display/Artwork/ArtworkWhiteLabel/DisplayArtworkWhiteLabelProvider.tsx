import React, { type ReactNode } from "react";
import { context } from "./context";
import { ArtworkWhiteLabel } from "./ArtworkWhiteLabel";

export function DisplayArtworkWhiteLabelProvider(props: { children: ReactNode }) {
    const { children } = props;

    return <context.Provider value={ArtworkWhiteLabel}>{children}</context.Provider>;
}
