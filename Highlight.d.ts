import React, { type ReactNode, type CSSProperties } from "react";
export type HighlightProps = {
    id?: string;
    className?: string;
    classes?: Partial<Record<"root" | "content", string>>;
    size?: HighlightProps.Size;
    style?: CSSProperties;
    children: NonNullable<ReactNode>;
};
export declare namespace HighlightProps {
    type Size = "sm" | "lg";
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-highlight> */
export declare const Highlight: React.MemoExoticComponent<React.ForwardRefExoticComponent<HighlightProps & React.RefAttributes<HTMLDivElement>>>;
export default Highlight;
