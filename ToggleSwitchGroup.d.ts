import React, { type CSSProperties } from "react";
import type { ToggleSwitchProps } from "./ToggleSwitch";
export type ToggleSwitchGroupProps = {
    id?: string;
    className?: string;
    /** Default: true */
    showCheckedHint?: ToggleSwitchProps["showCheckedHint"];
    /** Default: right */
    labelPosition?: ToggleSwitchProps["labelPosition"];
    classes?: Partial<Record<"root" | "li", string>>;
    /** Needs at least one ToggleSwitch */
    toggles: [ToggleSwitchPropsWithoutSharedProps, ...ToggleSwitchPropsWithoutSharedProps[]];
    style?: CSSProperties;
};
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-toggleswitchgroup> */
export declare const ToggleSwitchGroup: React.NamedExoticComponent<ToggleSwitchGroupProps>;
export default ToggleSwitchGroup;
type ToggleSwitchPropsWithoutSharedProps = ToggleSwitchPropsWithoutSharedProps.Controlled | ToggleSwitchPropsWithoutSharedProps.Uncontrolled;
declare namespace ToggleSwitchPropsWithoutSharedProps {
    type Common = Omit<ToggleSwitchProps, "showCheckedHint" | "labelPosition">;
    type Uncontrolled = Common & Omit<ToggleSwitchProps.Uncontrolled, keyof ToggleSwitchProps.Common>;
    type Controlled = Common & Omit<ToggleSwitchProps.Controlled, keyof ToggleSwitchProps.Common>;
}
