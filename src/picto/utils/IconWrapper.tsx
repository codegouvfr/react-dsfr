import React, { memo } from "react";
import { cx } from "../../tools/cx";

type IconSize = "small" | "medium" | "large" | "inherit" | (string & {});
type IconColor =
    | "green-tilleul-verveine"
    | "green-bourgeon"
    | "green-emeraude"
    | "green-menthe"
    | "green-archipel"
    | "blue-ecume"
    | "blue-cumulus"
    | "purple-glycine"
    | "pink-macaron"
    | "pink-tuile"
    | "yellow-tournesol"
    | "yellow-moutarde"
    | "orange-terre-battue"
    | "brown-cafe-creme"
    | "brown-caramel"
    | "brown-opera"
    | "beige-gris-galet";
export type IconProps = {
    fontSize?: IconSize;
    color?: IconColor;
} & Omit<React.SVGProps<SVGSVGElement>, "fontSize">;

const getSize = (size: IconSize) => {
    switch (size) {
        case "small":
            return "1.25em";
        case "medium":
            return "1.5em";
        case "large":
            return "2.5em";
        case "inherit":
            return "inherit";
        default:
            return size;
    }
};

const getColor = (color?: IconColor) => {
    if (!color) {
        return undefined;
    }
    return `fr-artwork--${color}`;
};

export const IconWrapper: React.FC<IconProps> = memo(
    ({ children, color, fontSize = "medium", className, ...props }) => (
        <svg
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
            fontSize={getSize(fontSize)}
            className={cx("fr-artwork", getColor(color), className)}
            {...props}
        >
            {children}
        </svg>
    )
);

export function createIcon(SvgPath: JSX.Element, displayName: string) {
    const IconComponent: React.FC<IconProps> = props => (
        <IconWrapper {...props}>{SvgPath}</IconWrapper>
    );

    IconComponent.displayName = displayName;
    return IconComponent;
}
