import React, { type DetailedHTMLProps, type InputHTMLAttributes, type ReactNode } from "react";
import type { InputProps } from "../Input";
import type { FrClassName } from "../fr/generatedFromCss/classNames";
export type PasswordInputProps = Omit<InputProps.Common, "state" | "stateRelatedMessage" | "iconId" | "classes" | "addon" | "action"> & {
    classes?: Partial<Record<"root" | "input" | "label" | "checkbox", string>>;
    /** Default "Your password must contain:", if empty string the hint wont be displayed */
    messagesHint?: ReactNode;
    messages?: {
        severity: PasswordInputProps.Severity;
        message: ReactNode;
    }[];
    nativeInputProps?: Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "type">;
};
export declare namespace PasswordInputProps {
    type ExtractSeverity<ClassName extends string> = ClassName extends `fr-message--${infer Severity}` ? Severity : never;
    export type Severity = ExtractSeverity<FrClassName>;
    export {};
}
/**
 * @see <https://components.react-dsfr.codegouv.studio/?path=/docs/blocks-passwordinput
 * */
export declare const PasswordInput: React.MemoExoticComponent<React.ForwardRefExoticComponent<Omit<InputProps.Common, "classes" | "iconId" | "state" | "stateRelatedMessage" | "addon" | "action"> & {
    classes?: Partial<Record<"input" | "label" | "root" | "checkbox", string>> | undefined;
    /** Default "Your password must contain:", if empty string the hint wont be displayed */
    messagesHint?: ReactNode;
    messages?: {
        severity: PasswordInputProps.Severity;
        message: ReactNode;
    }[] | undefined;
    nativeInputProps?: Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "type"> | undefined;
} & React.RefAttributes<HTMLDivElement>>>;
export default PasswordInput;
