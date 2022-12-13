import React, { memo, forwardRef } from "react";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import type { FrIconClassName, RiIconClassName } from "./lib/generatedFromCss/classNames";
import { RegisteredLinkProps, useLink } from "./lib/routing";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

export type ButtonProps = ButtonProps.Anchor | ButtonProps.Button;

export namespace ButtonProps {
    type Common = {
        className?: string;
        label: string;
        icon?: {
            iconId: FrIconClassName | RiIconClassName;
            position?: "left" | "right";
        };
        priority?: "secondary" | "tertiary";
        size?: "sm" | "lg";
    };

    export type Anchor = Common & {
        linkProps: RegisteredLinkProps;
        onClick?: never;
        disabled?: never;
        type?: never;
    };
    export type Button = Common & {
        linkProps?: never;
        onClick: React.MouseEventHandler<HTMLButtonElement>;
        disabled?: boolean;
        type?: "button" | "submit" | "reset";
    };
}

export const Button = memo(
    forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
        const {
            icon,
            priority,
            className,
            size,
            label,
            linkProps,
            onClick,
            disabled,
            type,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = useLink();

        const buttonClassName = cx(
            fr.cx("fr-btn"),
            priority && fr.cx(`fr-btn--${priority}`),
            size && fr.cx(`fr-btn--${size}`),
            icon && cx(fr.cx(icon.iconId), icon.position && fr.cx(`fr-btn--icon-${icon.position}`)),
            className
        );
        const Component = linkProps ? (
            <Link
                {...linkProps}
                className={buttonClassName}
                ref={ref as React.ForwardedRef<HTMLAnchorElement>}
            >
                {label}
            </Link>
        ) : (
            <button
                className={buttonClassName}
                type={type}
                onClick={onClick}
                disabled={disabled}
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
            >
                {label}
            </button>
        );

        return Component;
    })
);
