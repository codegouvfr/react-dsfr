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

export type ButtonsGroupCommonProps = {
    className?: string;
    classes?: Partial<Record<"root" | "listItem", string>>;
    children: [
        // this component (ul) should have at least 2 children (RGAA)
        React.ReactElement<ButtonProps>,
        React.ReactElement<ButtonProps>,
        ...React.ReactElement<ButtonProps>[]
    ];
    size?: ButtonsGroupCommonProps.Size;
};

export namespace ButtonsGroupCommonProps {
    export type Size = "sm" | "lg";
    export type Mode = "inline" | "inline-sm" | "inline-md" | "inline-lg";
    export type Align = "center" | "right" | "inline-reverse" | "equisized";
}

type ButtonAlignProps = // align will take effect only on inline placements

        | {
              mode?: false;
              align?: never;
          }
        | {
              mode: ButtonsGroupCommonProps.Mode;
              align?: ButtonsGroupCommonProps.Align;
          };

export type ButtonsGroupProps = ButtonsGroupCommonProps & ButtonAlignProps;

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-buttons-group> */
export const ButtonsGroup = memo(
    forwardRef<HTMLUListElement, ButtonsGroupProps>((props, ref) => {
        const { className, classes, mode, children, size, align, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const buttonsGroupClassName = cx(
            fr.cx("fr-btns-group"),
            mode && fr.cx(`fr-btns-group--${mode}`),
            align && fr.cx(`fr-btns-group--${align}`),
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
