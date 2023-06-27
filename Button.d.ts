import React, { type ReactNode, type CSSProperties } from "react";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import type { RegisteredLinkProps } from "./link";
export type ButtonProps = ButtonProps.Common & (ButtonProps.IconOnly | ButtonProps.WithIcon | ButtonProps.WithoutIcon) & (ButtonProps.AsAnchor | ButtonProps.AsButton);
export declare namespace ButtonProps {
    type Common = {
        className?: string;
        /** Default primary */
        priority?: "primary" | "secondary" | "tertiary" | "tertiary no outline";
        /** Default medium */
        size?: "small" | "medium" | "large";
        style?: CSSProperties;
    };
    type IconOnly = {
        children?: never;
        /** Function of the button */
        title: string;
        iconId: FrIconClassName | RiIconClassName;
        iconPosition?: never;
    };
    type WithIcon = {
        children: ReactNode;
        /** Function of the button, to provide if the label isn't explicit */
        title?: string;
        iconId: FrIconClassName | RiIconClassName;
        /** Default left */
        iconPosition?: "left" | "right";
    };
    type WithoutIcon = {
        children: ReactNode;
        /** Function of the button, to provide if the label isn't explicit */
        title?: string;
        iconId?: never;
        iconPosition?: never;
    };
    type AsAnchor = {
        linkProps: RegisteredLinkProps;
        onClick?: never;
        nativeButtonProps?: never;
        disabled?: never;
        type?: never;
    };
    type AsButton = {
        linkProps?: never;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        nativeButtonProps?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & Record<`data-${string}`, string | boolean | null | undefined>;
        disabled?: boolean;
        /** Default "button" */
        type?: "button" | "submit" | "reset";
    };
}
/** @see <https://components.react-dsfr.fr/?path=/docs/components-button> */
export declare const Button: React.MemoExoticComponent<React.ForwardRefExoticComponent<ButtonProps.Common & (ButtonProps.IconOnly | ButtonProps.WithIcon | ButtonProps.WithoutIcon) & ((ButtonProps.AsAnchor & React.RefAttributes<HTMLAnchorElement>) | (ButtonProps.AsButton & React.RefAttributes<HTMLButtonElement>))>>;
export default Button;
