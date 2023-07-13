import React, { type ReactNode, type CSSProperties, type ComponentProps } from "react";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import type { RegisteredLinkProps } from "./link";
type DataAttribute = Record<`data-${string}`, string | boolean | null | undefined>;
export type TagProps = TagProps.Common & (TagProps.WithIcon | TagProps.WithoutIcon) & (TagProps.AsAnchor | TagProps.AsButton | TagProps.AsSpan);
export declare namespace TagProps {
    type Common = {
        id?: string;
        className?: string;
        /** Default: false */
        small?: boolean;
        style?: CSSProperties;
        title?: string;
        children: ReactNode;
    };
    type WithIcon = {
        /** Function of the button, to provide if the label isn't explicit */
        iconId: FrIconClassName | RiIconClassName;
    };
    type WithoutIcon = {
        iconId?: never;
    };
    type AsAnchor = {
        linkProps: RegisteredLinkProps;
        onClick?: never;
        nativeButtonProps?: never;
        nativeSpanProps?: never;
        dismissible?: never;
        pressed?: never;
    };
    type AsButton = {
        linkProps?: never;
        nativeSpanProps?: never;
        /** Default: false */
        dismissible?: boolean;
        pressed?: boolean;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        nativeButtonProps?: ComponentProps<"button"> & DataAttribute;
    };
    type AsSpan = {
        linkProps?: never;
        onClick?: never;
        dismissible?: never;
        pressed?: never;
        nativeButtonProps?: never;
        nativeSpanProps?: ComponentProps<"span"> & DataAttribute;
    };
}
/** @see <https://components.react-dsfr.fr/?path=/docs/components-tag> */
export declare const Tag: React.MemoExoticComponent<React.ForwardRefExoticComponent<TagProps.Common & (TagProps.WithIcon | TagProps.WithoutIcon) & ((TagProps.AsAnchor & React.RefAttributes<HTMLAnchorElement>) | (TagProps.AsButton & React.RefAttributes<HTMLButtonElement>) | (TagProps.AsSpan & React.RefAttributes<HTMLSpanElement>))>>;
export default Tag;
