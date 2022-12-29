import React, { memo, forwardRef } from "react";
import { ButtonProps } from "./Button";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";

export type ButtonsGroupProps = ButtonsGroupProps.AlwaysStacked | ButtonsGroupProps.Inline;

export namespace ButtonsGroupProps {
    export type Common = {
        className?: string;
        buttonsSize?: ButtonProps["size"];
        /** Default: left */
        buttonsIconPosition?: ButtonProps.WithIcon["iconPosition"];
        /* Default: "left", in vertical layout this has no effect */
        alignment?: "left" | "center" | "right";
        /** Default: false */
        buttonsEquisized?: boolean;
        children: [
            React.ReactElement<ButtonProps>,
            React.ReactElement<ButtonProps>,
            ...React.ReactElement<ButtonProps>[]
        ];
    };

    export type AlwaysStacked = Common & {
        /**
         * Default "never", it means that the button are
         * stacked vertically regardless of the screed width
         **/
        inlineLayoutWhen?: "never";
        isReverseOrder?: never;
    };

    export type Inline = Omit<Common, "alignment"> & {
        /**
         * Default "never", "never" means that the button are
         * stacked vertically regardless of the screed width
         **/
        inlineLayoutWhen?: "always" | `${"sm" | "md" | "lg"} and up`;
        /** Default: false */
        isReverseOrder?: boolean;
        /* Default: "left" */
        alignment?: Common["alignment"] | "between";
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-buttonsgroup> */
export const ButtonsGroup = memo(
    forwardRef<HTMLUListElement, ButtonsGroupProps>((props, ref) => {
        const {
            className,
            buttonsSize = "medium",
            buttonsIconPosition = "left",
            children,
            inlineLayoutWhen = "never",
            alignment = "left",
            buttonsEquisized = false,
            isReverseOrder = false,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const buttonsGroupClassName = cx(
            fr.cx(
                "fr-btns-group",
                buttonsSize !== "medium" &&
                    `fr-btns-group--${(() => {
                        switch (buttonsSize) {
                            case "small":
                                return "sm";
                            case "large":
                                return "lg";
                        }
                    })()}`,
                inlineLayoutWhen !== "never" &&
                    `fr-btns-group--inline${(() => {
                        switch (inlineLayoutWhen) {
                            case "always":
                                return "";
                            case "sm and up":
                                return "-sm";
                            case "md and up":
                                return "-md";
                            case "lg and up":
                                return "-lg";
                        }
                    })()}`,
                buttonsEquisized && `fr-btns-group--equisized`,
                `fr-btns-group--${alignment}`,
                isReverseOrder && "fr-btns-group--inline-reverse",
                `fr-btns-group--icon-${buttonsIconPosition}`
            ),
            className
        );

        return (
            <ul className={buttonsGroupClassName} ref={ref} {...rest}>
                {children.map((button, i) => (
                    <li key={i}>{button}</li>
                ))}
            </ul>
        );
    })
);

ButtonsGroup.displayName = symToStr({ ButtonsGroup });

export default ButtonsGroup;
