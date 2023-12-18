import React from "react";
import { type FieldsetProps } from "./shared/Fieldset";
export type CheckboxProps = Omit<FieldsetProps.Checkbox, "type">;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-checkbox> */
export declare const Checkbox: React.MemoExoticComponent<React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLFieldSetElement>>>;
export default Checkbox;
