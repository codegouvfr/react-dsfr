import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { Fieldset, type FieldsetProps } from "./shared/Fieldset";

export type CheckboxProps = Omit<FieldsetProps.Checkbox, "type">;

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-checkbox> */
export const Checkbox = memo(
    forwardRef<HTMLFieldSetElement, CheckboxProps>((props, ref) => (
        <Fieldset ref={ref} {...props} type="checkbox" />
    ))
);

Checkbox.displayName = symToStr({ Checkbox });

export default Checkbox;
