import React, { type ReactNode, type CSSProperties } from "react";
import type { RegisteredLinkProps } from "./link";
export type TileProps = {
    className?: string;
    title: ReactNode;
    linkProps: RegisteredLinkProps;
    desc?: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
    imageWidth?: string | number;
    imageHeight?: string | number;
    grey?: boolean;
    /** make the whole tile clickable */
    enlargeLink?: boolean;
    classes?: Partial<Record<"root" | "title" | "link" | "body" | "desc" | "img" | "imgTag", string>>;
    /** Default false */
    horizontal?: boolean;
    style?: CSSProperties;
};
export declare namespace TileProps { }
/** @see <https://components.react-dsfr.fr/?path=/docs/components-tile> */
export declare const Tile: React.MemoExoticComponent<React.ForwardRefExoticComponent<TileProps & React.RefAttributes<HTMLDivElement>>>;
export default Tile;
