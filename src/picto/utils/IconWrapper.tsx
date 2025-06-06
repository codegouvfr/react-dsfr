import React, { memo } from "react";

type IconSize = "small" | "medium" | "large" | "inherit" | (string & {});
export type IconProps = {
    fontSize?: IconSize;
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

export const IconWrapper: React.FC<IconProps> = memo(
    ({ children, fontSize = "medium", ...props }) => (
        <svg
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
            fontSize={getSize(fontSize)}
            className="fr-artwork"
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
