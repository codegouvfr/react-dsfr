import React from "react";
import { type FieldsetProps } from "./shared/Fieldset";
export type RadioButtonsProps = Omit<FieldsetProps.Radio, "type">;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-radiobutton> */
export declare const RadioButtons: React.MemoExoticComponent<React.ForwardRefExoticComponent<RadioButtonsProps & React.RefAttributes<HTMLFieldSetElement>>>;
export default RadioButtons;
