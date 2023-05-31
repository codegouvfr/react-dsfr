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
import { isBrowser } from "./isBrowser";

export function createPersistentSignal<T, Name extends string>(params: {
    name: Name;
    /** Function called only if not in local storage */
    defaultValue: T;
}): Record<`use${Capitalize<Name>}`, () => UseNamedStateReturnType<T, Name>> &
    Record<`$${Name}`, StatefulObservable<T>> {
    const { name, defaultValue } = params;

    const $xyz = createStatefulObservable<T>(() => {
        const serializedState = !isBrowser ? null : localStorage.getItem(name);

        if (serializedState === null) {
            return defaultValue;
        }

        return parse<T>(serializedState);
    });

    if (isBrowser) {
        $xyz.subscribe(state => localStorage.setItem(name, stringify(state)));
    }

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

function stringify(obj: unknown): string {
    if (obj === undefined) {
        return "undefined";
    }
    return JSON.stringify([obj]);
}

function parse<T>(str: string): T {
    if (str === "undefined") {
        return undefined as any;
    }
    return JSON.parse(str)[0];
}
