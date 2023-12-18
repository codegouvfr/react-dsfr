import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { Fieldset, type FieldsetProps } from "./shared/Fieldset";

export type RadioButtonsProps = Omit<FieldsetProps.Radio.Regular, "type">;

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-radiobutton> */
export const RadioButtons = memo(
    forwardRef<HTMLFieldSetElement, RadioButtonsProps>((props, ref) => (
        <Fieldset ref={ref} {...props} type="radio" />
    ))
);

RadioButtons.displayName = symToStr({ RadioButtons });

export default RadioButtons;
