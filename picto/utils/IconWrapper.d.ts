import React from "react";
type IconSize = "small" | "medium" | "large" | "inherit" | (string & {});
type IconColor = "green-tilleul-verveine" | "green-bourgeon" | "green-emeraude" | "green-menthe" | "green-archipel" | "blue-ecume" | "blue-cumulus" | "purple-glycine" | "pink-macaron" | "pink-tuile" | "yellow-tournesol" | "yellow-moutarde" | "orange-terre-battue" | "brown-cafe-creme" | "brown-caramel" | "brown-opera" | "beige-gris-galet";
export type IconProps = {
    fontSize?: IconSize;
    color?: IconColor;
} & Omit<React.SVGProps<SVGSVGElement>, "fontSize">;
export declare const IconWrapper: React.FC<IconProps>;
export declare function createIcon(SvgPath: JSX.Element, displayName: string): React.FC<IconProps>;
export {};
