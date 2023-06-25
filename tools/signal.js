import { useConstCallback } from "./powerhooks/useConstCallback";
import { overwriteReadonlyProp } from "tsafe/lab/overwriteReadonlyProp";
import { typeGuard } from "tsafe/typeGuard";
import { capitalize } from "tsafe/capitalize";
import { createStatefulObservable, useRerenderOnChange } from "./StatefulObservable";
export function createSignal(params) {
    const { name, initialValue } = params;
    const $xyz = createStatefulObservable(() => initialValue);
    function useXyz() {
        useRerenderOnChange($xyz);
        return {
            [name]: $xyz.current,
            [`set${capitalize(name)}`]: useConstCallback((setStateAction) => ($xyz.current = typeGuard(setStateAction, typeof setStateAction === "function")
                ? setStateAction($xyz.current)
                : setStateAction))
        };
    }
    overwriteReadonlyProp(useXyz, "name", `use${capitalize(name)}`);
    return {
        [useXyz.name]: useXyz,
        [`$${name}`]: $xyz
    };
}
//# sourceMappingURL=signal.js.map