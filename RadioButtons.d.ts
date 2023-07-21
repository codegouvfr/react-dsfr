import React from "react";
import { type FieldsetProps } from "./shared/Fieldset";
export type RadioButtonsProps = FieldsetProps.Common & {
    name?: string;
};
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-radiobutton> */
export declare const RadioButtons: React.MemoExoticComponent<React.ForwardRefExoticComponent<FieldsetProps.Common & {
    name?: string | undefined;
} & React.RefAttributes<HTMLFieldSetElement>>>;
export default RadioButtons;
