import React, { memo } from "react";
import { cx } from "../../tools/cx";

export type PictoProps = {
    fontSize?: PictoProps.Size;
    color?: PictoProps.Color;
} & Omit<React.SVGProps<SVGSVGElement>, "fontSize">;

export namespace PictoProps {
    export type Size = "small" | "medium" | "large" | "inherit" | (string & {});
    const colors = [
        "red-marianne",
        "green-tilleul-verveine",
        "green-bourgeon",
        "green-emeraude",
        "green-menthe",
        "green-archipel",
        "blue-ecume",
        "blue-cumulus",
        "purple-glycine",
        "pink-macaron",
        "pink-tuile",
        "yellow-tournesol",
        "yellow-moutarde",
        "orange-terre-battue",
        "brown-cafe-creme",
        "brown-caramel",
        "brown-opera",
        "beige-gris-galet"
    ] as const;
    export type Color = typeof colors[number];
}

const getSize = (size: PictoProps.Size) => {
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

const getColor = (color?: PictoProps.Color) => {
    if (!color) {
        return undefined;
    }
    return `fr-artwork--${color}`;
};

export const PictoWrapper: React.FC<PictoProps> = memo(
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

export function createPicto(SvgPath: JSX.Element, displayName: string) {
    const IconComponent: React.FC<PictoProps> = props => (
        <PictoWrapper {...props}>{SvgPath}</PictoWrapper>
    );

    IconComponent.displayName = displayName;
    return IconComponent;
}
