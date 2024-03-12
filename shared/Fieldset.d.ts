import React, { type ReactNode, type CSSProperties, type ComponentProps } from "react";
export type FieldsetProps = FieldsetProps.Radio | FieldsetProps.Checkbox;
export declare namespace FieldsetProps {
    type Common = {
        className?: string;
        id?: string;
        classes?: Partial<Record<"root" | "legend" | "content" | "inputGroup", string>>;
        style?: CSSProperties;
        legend?: ReactNode;
        hintText?: ReactNode;
        options: {
            label: ReactNode;
            hintText?: ReactNode;
            nativeInputProps: ComponentProps<"input">;
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
    type Radio = Omit<Common, "options"> & {
        type: "radio";
        name?: string;
        options: (Common["options"][number] & {
            illustration?: ReactNode;
        })[];
    };
    type Checkbox = Common & {
        type: "checkbox";
        name?: never;
    };
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-radiobutton> */
export declare const Fieldset: React.MemoExoticComponent<React.ForwardRefExoticComponent<FieldsetProps & React.RefAttributes<HTMLFieldSetElement>>>;
export default Fieldset;
