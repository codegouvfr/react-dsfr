import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { Fieldset } from "./shared/Fieldset";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-radiobutton> */
export const RadioButtons = memo(forwardRef((props, ref) => (React.createElement(Fieldset, Object.assign({ ref: ref }, props, { type: "radio" })))));
RadioButtons.displayName = symToStr({ RadioButtons });
export default RadioButtons;
//# sourceMappingURL=RadioButtons.js.map