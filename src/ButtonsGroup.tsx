import React, { memo, forwardRef } from "react";
import { ButtonProps } from "./Button";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";

// We make users import dsfr.css, so we don't need to import the scoped CSS
// but in the future if we have a complete component coverage it
// we could stop requiring users to import the hole CSS and only import on a
// per component basis.
import "./dsfr/component/button/button.css";

export type ButtonsGroupProps = {
    className?: string;
    classes?: Partial<Record<"root" | "listItem", string>>;
    mode?: "inline" | "inline-sm" | "inline-md" | "inline-lg";
    children: React.ReactElement<ButtonProps>[];
    size?: ButtonsGroupProps.Size;
};

export namespace ButtonsGroupProps {
    export type Size = "sm" | "lg";
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-badge> */
export const ButtonsGroup = memo(
    forwardRef<HTMLUListElement, ButtonsGroupProps>((props, ref) => {
        const { className, classes, mode, children, size, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const buttonsGroupClassName = cx(
            fr.cx("fr-btns-group"),
            mode && fr.cx(`fr-btns-group--${mode}`),
            size && fr.cx(`fr-btns-group--${size}`),
            className,
            classes?.root
        );

        return (
            <ul className={buttonsGroupClassName} ref={ref}>
                {children.map(child => (
                    <li className={cx(classes?.listItem)}>{child}</li>
                ))}
            </ul>
        );
    })
);

ButtonsGroup.displayName = symToStr({ ButtonsGroup });

export default ButtonsGroup;
