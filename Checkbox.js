import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { Fieldset } from "./shared/Fieldset";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-checkbox> */
export const Checkbox = memo(forwardRef((props, ref) => (React.createElement(Fieldset, Object.assign({ ref: ref }, props, { type: "checkbox" })))));
Checkbox.displayName = symToStr({ Checkbox });
export default Checkbox;
//# sourceMappingURL=Checkbox.js.map