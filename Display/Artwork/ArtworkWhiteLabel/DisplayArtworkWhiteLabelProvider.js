import React from "react";
import { context } from "./context";
import { ArtworkWhiteLabel } from "./ArtworkWhiteLabel";
export function DisplayArtworkWhiteLabelProvider(props) {
    const { children } = props;
    return React.createElement(context.Provider, { value: ArtworkWhiteLabel }, children);
}
//# sourceMappingURL=DisplayArtworkWhiteLabelProvider.js.map