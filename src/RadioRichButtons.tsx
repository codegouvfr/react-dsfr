import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { Fieldset, type FieldsetProps } from "./shared/Fieldset";

export type RadioRichButtonsProps = Omit<FieldsetProps.Radio.Rich, "type" | "rich">;

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-radiorichbutton> */
export const RadioRichButtons = memo(
    forwardRef<HTMLFieldSetElement, RadioRichButtonsProps>((props, ref) => (
        <Fieldset ref={ref} {...props} type="radio" rich />
    ))
);

RadioRichButtons.displayName = symToStr({ RadioRichButtons });

export default RadioRichButtons;
