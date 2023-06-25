import { useConstCallback } from "./powerhooks/useConstCallback";
import { overwriteReadonlyProp } from "tsafe/lab/overwriteReadonlyProp";
import type { UseNamedStateReturnType } from "./powerhooks/useNamedState";
import { typeGuard } from "tsafe/typeGuard";
import { capitalize } from "tsafe/capitalize";
import {
    createStatefulObservable,
    useRerenderOnChange,
    type StatefulObservable
} from "./StatefulObservable";

export function createSignal<T, Name extends string>(params: {
    name: Name;
    initialValue: T;
}): Record<`use${Capitalize<Name>}`, () => UseNamedStateReturnType<T, Name>> &
    Record<`$${Name}`, StatefulObservable<T>> {
    const { name, initialValue } = params;

    const $xyz = createStatefulObservable<T>(() => initialValue);

    function useXyz() {
        useRerenderOnChange($xyz);

        return {
            [name]: $xyz.current,
            [`set${capitalize(name)}`]: useConstCallback(
                (setStateAction: T | ((prevState: T) => T)) =>
                    ($xyz.current = typeGuard<(prevState: T) => T>(
                        setStateAction,
                        typeof setStateAction === "function"
                    )
                        ? setStateAction($xyz.current)
                        : setStateAction)
            )
        } as any;
    }

    overwriteReadonlyProp(useXyz as any, "name", `use${capitalize(name)}`);

    return {
        [useXyz.name]: useXyz,
        [`$${name}`]: $xyz
    } as any;
}
