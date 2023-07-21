import React, { type CSSProperties } from "react";
import { ButtonProps } from "./Button";
export type ButtonsGroupProps = ButtonsGroupProps.AlwaysStacked | ButtonsGroupProps.Inline;
export declare namespace ButtonsGroupProps {
    type Common = {
        id?: string;
        className?: string;
        buttonsSize?: ButtonProps["size"];
        /** Default: left */
        buttonsIconPosition?: ButtonProps.WithIcon["iconPosition"];
        alignment?: "left" | "center" | "right";
        /** Default: false */
        buttonsEquisized?: boolean;
        buttons: [ButtonProps, ...ButtonProps[]];
        style?: CSSProperties;
    };
    type AlwaysStacked = Common & {
        /**
         * Default "never", it means that the button are
         * stacked vertically regardless of the screed width
         **/
        inlineLayoutWhen?: "never";
        isReverseOrder?: never;
    };
    type Inline = Omit<Common, "alignment"> & {
        /**
         * Default "never", "never" means that the button are
         * stacked vertically regardless of the screed width
         **/
        inlineLayoutWhen?: "always" | `${"sm" | "md" | "lg"} and up`;
        /** Default: false */
        isReverseOrder?: boolean;
        alignment?: Common["alignment"] | "between";
    };
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-buttonsgroup> */
export declare const ButtonsGroup: React.MemoExoticComponent<React.ForwardRefExoticComponent<ButtonsGroupProps & React.RefAttributes<HTMLUListElement>>>;
export default ButtonsGroup;
