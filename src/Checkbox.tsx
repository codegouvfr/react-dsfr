import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { Fieldset, type FieldsetProps } from "./shared/Fieldset";

export type CheckboxProps = FieldsetProps.Common;

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-checkbox> */
export const Checkbox = memo(
    forwardRef<HTMLFieldSetElement, CheckboxProps>((props, ref) => (
        <Fieldset ref={ref} type="checkbox" {...props} />
    ))
);

Checkbox.displayName = symToStr({ Checkbox });

export default Checkbox;
