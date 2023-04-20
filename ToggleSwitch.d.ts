import React, { ReactNode, type CSSProperties } from "react";
export type ToggleSwitchProps = ToggleSwitchProps.Controlled | ToggleSwitchProps.Uncontrolled;
export declare namespace ToggleSwitchProps {
    type Common = {
        className?: string;
        label: ReactNode;
        helperText?: ReactNode;
        /** Default: true */
        showCheckedHint?: boolean;
        /** Default: false */
        disabled?: boolean;
        /** Default: "left" */
        labelPosition?: "left" | "right";
        classes?: Partial<Record<"root" | "label" | "input" | "hint", string>>;
        style?: CSSProperties;
        name?: string;
    };
    type Uncontrolled = Common & {
        /** Default: "false" */
        defaultChecked?: boolean;
        checked?: never;
        onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
        inputTitle: string;
    };
    type Controlled = Common & {
        defaultChecked?: never;
        checked: boolean;
        onChange: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
        inputTitle?: string;
    };
}
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-toggleswitch> */
export declare const ToggleSwitch: React.MemoExoticComponent<React.ForwardRefExoticComponent<ToggleSwitchProps & React.RefAttributes<HTMLDivElement>>>;
declare const addToggleSwitchTranslations: (params: {
    lang: string;
    messages: Partial<{
        checked: string;
        unchecked: string;
    }>;
}) => void;
export { addToggleSwitchTranslations };
export default ToggleSwitch;
