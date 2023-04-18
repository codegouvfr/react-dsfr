import React, { type ReactNode, type CSSProperties } from "react";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import type { RegisteredLinkProps } from "./link";
export type CardProps = {
    className?: string;
    title: ReactNode;
    linkProps: RegisteredLinkProps;
    desc?: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
    start?: ReactNode;
    detail?: ReactNode;
    end?: ReactNode;
    endDetail?: ReactNode;
    badges?: ReactNode[];
    /** where actions can be placed */
    footer?: ReactNode;
    /** Default: "medium", only affect the text */
    size?: "small" | "medium" | "large";
    /** make the whole card clickable */
    enlargeLink?: boolean;
    /** only needed when enlargeLink=true */
    iconId?: FrIconClassName | RiIconClassName;
    shadow?: boolean;
    background?: boolean;
    border?: boolean;
    grey?: boolean;
    classes?: Partial<Record<"root" | "title" | "card" | "link" | "body" | "content" | "desc" | "header" | "img" | "imgTag" | "start" | "detail" | "end" | "endDetail" | "badges" | "footer", string>>;
    style?: CSSProperties;
    /** Default false */
    horizontal?: boolean;
} & (CardProps.EnlargedLink | CardProps.NotEnlargedLink);
export declare namespace CardProps {
    type EnlargedLink = {
        enlargeLink: true;
        iconId?: FrIconClassName | RiIconClassName;
    };
    type NotEnlargedLink = {
        enlargeLink?: false;
        iconId?: never;
    };
}
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-card> */
export declare const Card: React.MemoExoticComponent<React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>>;
export default Card;
