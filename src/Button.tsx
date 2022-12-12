import React, { memo, forwardRef } from "react";
// import { symToStr } from "tsafe/symToStr";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";

// We make users import dsfr.css, so we don't need to import the scoped CSS
// but in the future if we have a complete component coverage it
// we could stop requiring users to import the hole CSS and only import on a
// per component basis.
import "./dsfr/component/button/button.css";

const icons = ["fr-icon-checkbox-circle-line", "fr-icon-account-circle-fill"] as const;

type IconType = typeof icons[number];

type ButtonIcon = {
    name: IconType;
    position?: "left" | "right";
};

export type ButtonProps = {
    label: string;
    icon?: ButtonIcon;
    priority?: "secondary" | "tertiary";
    type?: "button" | "submit" | "reset";
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    size?: ButtonProps.Size;
};

export namespace ButtonProps {
    export type Size = "sm" | "lg";
}

export const Button = memo(
    forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(props => {
        const { icon, priority, type, onClick, href, disabled, className, size, label, target } =
            props;

        const buttonClassName = cx(
            fr.cx("fr-btn"),
            priority && fr.cx(`fr-btn--${priority}`),
            size && fr.cx(`fr-btn--${size}`),
            icon && cx(fr.cx(icon.name), icon.position && fr.cx(`fr-btn--icon-${icon.position}`)),
            className
        );
        const Component =
            "href" in props ? (
                <a className={buttonClassName} href={href} target={target || "_self"}>
                    {label}
                </a>
            ) : (
                <button
                    className={buttonClassName}
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {label}
                </button>
            );

        return Component;
    })
);
