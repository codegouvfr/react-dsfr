#!/usr/bin/env node
export declare const pathOfIconsJson: string;
export declare const pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist: string;
export type Icon = Icon.Dsfr | Icon.Remixicon;
export declare namespace Icon {
    type Common = {
        iconId: string;
    };
    type Dsfr = Common & {
        prefix: "fr-icon-";
        svgRelativePath: string;
    };
    type Remixicon = Common & {
        prefix: "ri-";
        rawSvgCode: string;
    };
}
type IconLike = Icon.Dsfr | Omit<Icon.Remixicon, "rawSvgCode">;
export declare function generateIconsRawCssCode(params: {
    usedIcons: IconLike[];
    patchedRawCssCodeForCompatWithRemixIcon: string;
}): string;
export {};
