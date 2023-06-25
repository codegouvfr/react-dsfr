import { useState } from "react";
import { capitalize } from "tsafe/capitalize";
export function useNamedState(name, initialState) {
    const [state, setState] = useState(initialState);
    return {
        [name]: state,
        [`set${capitalize(name)}`]: setState
    };
}
//# sourceMappingURL=useNamedState.js.map