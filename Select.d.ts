import React, { ReactNode, type CSSProperties } from "react";
export type SelectProps = {
    id?: string;
    className?: string;
    label: ReactNode;
    hint?: ReactNode;
    nativeSelectProps: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
    children: ReactNode;
    /** Default: false */
    disabled?: boolean;
    /** Default: "default" */
    state?: "success" | "error" | "info" | "default";
    /** The message won't be displayed if state is "default" */
    stateRelatedMessage?: ReactNode;
    style?: CSSProperties;
};
/**
 * @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-select>
 * */
export declare const Select: React.MemoExoticComponent<React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>>>;
export default Select;
