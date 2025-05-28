import React from "react";
type IconSize = "small" | "medium" | "large" | "inherit" | (string & {});
export type IconProps = {
    fontSize?: IconSize;
} & Omit<React.SVGProps<SVGSVGElement>, "fontSize">;
export declare const IconWrapper: React.FC<IconProps>;
export declare function createIcon(SvgPath: JSX.Element, displayName: string): React.FC<IconProps>;
export {};
