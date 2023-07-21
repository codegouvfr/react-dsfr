import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { Fieldset, type FieldsetProps } from "./shared/Fieldset";

export type RadioButtonsProps = FieldsetProps.Common & { name?: string };

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-radiobutton> */
export const RadioButtons = memo(
    forwardRef<HTMLFieldSetElement, RadioButtonsProps>((props, ref) => (
        <Fieldset ref={ref} type="radio" {...props} />
    ))
);

RadioButtons.displayName = symToStr({ RadioButtons });

export default RadioButtons;
