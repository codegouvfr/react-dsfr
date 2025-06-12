import React from "react";
export type PictoProps = {
    fontSize?: PictoProps.Size;
    color?: PictoProps.Color;
} & Omit<React.SVGProps<SVGSVGElement>, "fontSize">;
export declare namespace PictoProps {
    export type Size = "small" | "medium" | "large" | "inherit" | (string & {});
    const colors: readonly ["red-marianne", "green-tilleul-verveine", "green-bourgeon", "green-emeraude", "green-menthe", "green-archipel", "blue-ecume", "blue-cumulus", "purple-glycine", "pink-macaron", "pink-tuile", "yellow-tournesol", "yellow-moutarde", "orange-terre-battue", "brown-cafe-creme", "brown-caramel", "brown-opera", "beige-gris-galet"];
    export type Color = typeof colors[number];
    export {};
}
export declare const PictoWrapper: React.FC<PictoProps>;
export declare function createPicto(SvgPath: JSX.Element, displayName: string): React.FC<PictoProps>;
