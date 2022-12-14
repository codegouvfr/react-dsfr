import React, { memo, forwardRef } from "react";
import type {
    ReactNode,
    RefAttributes,
    MemoExoticComponent,
    ForwardRefExoticComponent
} from "react";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import type { FrIconClassName, RiIconClassName } from "./lib/generatedFromCss/classNames";
import { RegisteredLinkProps, useLink } from "./lib/routing";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { symToStr } from "tsafe/symToStr";

export type ButtonProps = ButtonProps.Common &
    (ButtonProps.IconOnly | ButtonProps.WithIcon | ButtonProps.WithoutIcon) &
    (ButtonProps.AsAnchor | ButtonProps.AsButton);
export namespace ButtonProps {
    export type Common = {
        className?: string;
        /** Default primary */
        priority?: "primary" | "secondary" | "tertiary" | "tertiary no outline";
        /** Default medium */
        size?: "small" | "medium" | "large";
    };

    export type IconOnly = {
        label?: never;
        /** Function of the button */
        title: string;
        iconId: FrIconClassName | RiIconClassName;
        iconPosition?: never;
    };

    export type WithIcon = {
        label: ReactNode;
        /** Function of the button, to provide if the label isn't explicit */
        title?: string;
        iconId: FrIconClassName | RiIconClassName;
        /** Default left */
        iconPosition?: "left" | "right";
    };

    export type WithoutIcon = {
        label: ReactNode;
        /** Function of the button, to provide if the label isn't explicit */
        title?: string;
        iconId?: never;
        iconPosition?: never;
    };

    export type AsAnchor = {
        linkProps: RegisteredLinkProps;
        onClick?: never;
        disabled?: never;
        type?: never;
    };
    export type AsButton = {
        linkProps?: never;
        onClick: React.MouseEventHandler<HTMLButtonElement>;
        disabled?: boolean;
        /** Default "button" */
        type?: "button" | "submit" | "reset";
    };
}

export const Button = memo(
    forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
        const {
            className: prop_className,
            label,
            title,
            iconId,
            iconPosition = "left",
            priority = "primary",
            size = "medium",
            linkProps,
            onClick,
            disabled,
            type,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = useLink();

        const className = cx(
            fr.cx("fr-btn"),
            priority !== "primary" &&
                fr.cx(
                    `fr-btn--${
                        priority === "tertiary no outline" ? "tertiary-no-outline" : priority
                    }`
                ),
            size !== "medium" &&
                fr.cx(
                    `fr-btn--${(() => {
                        switch (size) {
                            case "small":
                                return "sm";
                            case "large":
                                return "lg";
                        }
                    })()}`
                ),
            iconId !== undefined &&
                fr.cx(iconId, label !== undefined && `fr-btn--icon-${iconPosition}`),
            linkProps !== undefined && linkProps.className,
            prop_className
        );

        return linkProps ? (
            <Link
                {...linkProps}
                title={title ?? linkProps.title}
                className={className}
                ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                {...rest}
            >
                {label}
            </Link>
        ) : (
            <button
                className={className}
                type={type}
                title={title}
                onClick={onClick}
                disabled={disabled}
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
                {...rest}
            >
                {label}
            </button>
        );
    })
) as MemoExoticComponent<
    ForwardRefExoticComponent<
        ButtonProps.Common &
            (ButtonProps.IconOnly | ButtonProps.WithIcon | ButtonProps.WithoutIcon) &
            (
                | (ButtonProps.AsAnchor & RefAttributes<HTMLAnchorElement>)
                | (ButtonProps.AsButton & RefAttributes<HTMLButtonElement>)
            )
    >
>;

Button.displayName = symToStr({ Button });

export default Button;
