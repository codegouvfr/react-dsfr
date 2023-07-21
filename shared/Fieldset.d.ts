import React, { type ReactNode, type CSSProperties, type InputHTMLAttributes, type DetailedHTMLProps } from "react";
export type FieldsetProps = FieldsetProps.Radio | FieldsetProps.Checkbox;
export declare namespace FieldsetProps {
    type Common = {
        className?: string;
        id?: string;
        classes?: Partial<Record<"root" | "legend" | "content", string>>;
        style?: CSSProperties;
        legend?: ReactNode;
        hintText?: ReactNode;
        options: {
            label: ReactNode;
            hintText?: ReactNode;
            nativeInputProps: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        }[];
        /** Default: "vertical" */
        orientation?: "vertical" | "horizontal";
        /** Default: "default" */
        state?: "success" | "error" | "default";
        /**
         * The message won't be displayed if state is "default".
         * If the state is "error" providing a message is mandatory
         **/
        stateRelatedMessage?: ReactNode;
        /** Default: false */
        disabled?: boolean;
        /** default: false */
        small?: boolean;
    };
    type Radio = Common & {
        type: "radio";
        name?: string;
    };
    type Checkbox = Common & {
        type: "checkbox";
        name?: never;
    };
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-radiobutton> */
export declare const Fieldset: React.MemoExoticComponent<React.ForwardRefExoticComponent<FieldsetProps & React.RefAttributes<HTMLFieldSetElement>>>;
export default Fieldset;
