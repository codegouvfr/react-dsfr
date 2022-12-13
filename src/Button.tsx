import React, { memo, forwardRef } from "react";
// import { symToStr } from "tsafe/symToStr";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import type { FrIconClassName, RiIconClassName } from "./lib/generatedFromCss/classNames";

// We make users import dsfr.css, so we don't need to import the scoped CSS
// but in the future if we have a complete component coverage it
// we could stop requiring users to import the hole CSS and only import on a
// per component basis.
import "./dsfr/component/button/button.css";

// This is just an example, we should get types from .fr-icon-* list
// const icons = ["fr-icon-checkbox-circle-line", "fr-icon-account-circle-fill"] as const;
// type IconType = typeof icons[number];

type IconType = FrIconClassName | RiIconClassName;

type ButtonIcon = {
    name: IconType;
    position?: "left" | "right";
};

type ButtonCommonProps = {
    label: string;
    icon?: ButtonIcon;
    priority?: "secondary" | "tertiary";
    className?: string;
    size?: ButtonProps.Size;
};

export type ButtonProps = ButtonCommonProps & (ButtonProps.Anchor | ButtonProps.Button);

export namespace ButtonProps {
    export type Size = "sm" | "lg";
    export type Anchor = {
        href: string | null;
        target?: React.HTMLAttributeAnchorTarget;
        disabled?: never;
        type?: never;
        onClick?: never;
    };
    export type Button = {
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        disabled?: boolean;
        type?: "button" | "submit" | "reset";
        href?: never;
        target?: never;
    };
}

export const Button = memo(
    forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(props => {
        const { icon, priority, className, size, label } = props;

        const buttonClassName = cx(
            fr.cx("fr-btn"),
            priority && fr.cx(`fr-btn--${priority}`),
            size && fr.cx(`fr-btn--${size}`),
            icon && cx(fr.cx(icon.name), icon.position && fr.cx(`fr-btn--icon-${icon.position}`)),
            className
        );
        const Component =
            "href" in props ? (
                <a
                    className={buttonClassName}
                    href={props.href ?? undefined}
                    target={props.target || "_self"}
                >
                    {label}
                </a>
            ) : (
                <button
                    className={buttonClassName}
                    type={props.type}
                    onClick={props.onClick}
                    disabled={props.disabled}
                >
                    {label}
                </button>
            );

        return Component;
    })
);
