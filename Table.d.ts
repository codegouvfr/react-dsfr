import React, { type ReactNode, type CSSProperties } from "react";
import type { FrClassName } from "./fr/generatedFromCss/classNames";
export type TableProps = {
    data: ReactNode[][];
    className?: string;
    caption?: ReactNode;
    headers?: ReactNode[];
    /** Default: false */
    fixed?: boolean;
    /** Default: false */
    noScroll?: boolean;
    /** Default: false */
    bordered?: boolean;
    /** Default: false */
    noCaption?: boolean;
    /** Default: false */
    bottomCaption?: boolean;
    style?: CSSProperties;
    colorVariant?: TableProps.ColorVariant;
};
export declare namespace TableProps {
    type ExtractColorVariant<FrClassName> = FrClassName extends `fr-table--${infer AccentColor}` ? Exclude<AccentColor, "no-scroll" | "no-caption" | "caption-bottom" | "layout-fixed" | "bordered"> : never;
    export type ColorVariant = ExtractColorVariant<FrClassName>;
    export {};
}
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/tableau>  */
export declare const Table: React.MemoExoticComponent<React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLDivElement>>>;
export default Table;
