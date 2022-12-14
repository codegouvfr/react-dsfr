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
        /** Default primary */
        priority?: "primary" | "secondary" | "tertiary";
        /** Default medium */
        size?: "small" | "medium" | "large";
    } & (WithIcon | WithoutIcon);

    export type WithIcon = {
        iconId: FrIconClassName | RiIconClassName;
        /** Default left */
        iconPosition?: "left" | "right";
    };

    export type WithoutIcon = {
        iconId?: never;
        iconPosition?: never;
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
        /** Default "button" */
        type?: "button" | "submit" | "reset";
    };
}

export const Button = memo(
    forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
        const {
            className: prop_className,
            label,
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
            priority !== "primary" && fr.cx(`fr-btn--${priority}`),
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
            iconId !== undefined && fr.cx(iconId, `fr-btn--icon-${iconPosition}`),
            prop_className
        );
        const Component = linkProps ? (
            <Link
                {...linkProps}
                className={className}
                ref={ref as React.ForwardedRef<HTMLAnchorElement>}
            >
                {label}
            </Link>
        ) : (
            <button
                className={className}
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
