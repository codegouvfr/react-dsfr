import React, { ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes, type DetailedHTMLProps, type CSSProperties } from "react";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
export type InputProps = InputProps.RegularInput | InputProps.TextArea;
export declare namespace InputProps {
    type Common = {
        className?: string;
        id?: string;
        label: ReactNode;
        hintText?: ReactNode;
        hideLabel?: boolean;
        /** default: false */
        disabled?: boolean;
        iconId?: FrIconClassName | RiIconClassName;
        classes?: Partial<Record<"root" | "label" | "description" | "nativeInputOrTextArea" | "message", string>>;
        style?: CSSProperties;
        /** Default: "default" */
        state?: "success" | "error" | "info" | "default";
        /** The message won't be displayed if state is "default" */
        stateRelatedMessage?: ReactNode;
        addon?: ReactNode;
    };
    type RegularInput = Common & {
        /** Default: false */
        textArea?: false;
        /** Props forwarded to the underlying <input /> element */
        nativeInputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        nativeTextAreaProps?: never;
    };
    type TextArea = Common & {
        /** Default: false */
        textArea: true;
        /** Props forwarded to the underlying <textarea /> element */
        nativeTextAreaProps?: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
        nativeInputProps?: never;
    };
}
/**
 * @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-input>
 * */
export declare const Input: React.MemoExoticComponent<React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLDivElement>>>;
export default Input;
