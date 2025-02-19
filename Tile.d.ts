import type { ComponentProps, CSSProperties, ReactNode } from "react";
import React from "react";
import { type RegisteredLinkProps } from "./link";
export type TileProps = {
    id?: string;
    className?: string;
    title: ReactNode;
    titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
    linkProps?: RegisteredLinkProps;
    buttonProps?: ComponentProps<"button">;
    downloadButton?: boolean;
    desc?: ReactNode;
    detail?: ReactNode;
    start?: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
    /**
     * @deprecated imageWidth has no effect
     */
    imageWidth?: string | number;
    /**
     * @deprecated imageHeight has no effect
     */
    imageHeight?: string | number;
    imageSvg?: boolean;
    grey?: boolean;
    /** make the whole tile clickable */
    enlargeLinkOrButton?: boolean;
    classes?: Partial<Record<"root" | "content" | "title" | "header" | "link" | "button" | "body" | "desc" | "detail" | "start" | "img" | "imgTag" | "artwork", string>>;
    orientation?: "horizontal" | "vertical";
    small?: boolean;
    noIcon?: boolean;
    noBorder?: boolean;
    noBackground?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
} & (TileProps.WithLink | TileProps.WithButton | TileProps.Unclickable);
export declare namespace TileProps {
    type Unclickable = {
        linkProps?: never;
        buttonProps?: never;
        enlargeLinkOrButton?: never;
    };
    type WithLink = {
        linkProps: RegisteredLinkProps;
        buttonProps?: never;
    };
    type WithButton = {
        linkProps?: never;
        buttonProps: ComponentProps<"button">;
    };
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tile> */
export declare const Tile: React.MemoExoticComponent<React.ForwardRefExoticComponent<TileProps & React.RefAttributes<HTMLDivElement>>>;
export default Tile;
