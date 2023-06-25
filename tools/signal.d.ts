import type { UseNamedStateReturnType } from "./powerhooks/useNamedState";
import { type StatefulObservable } from "./StatefulObservable";
export declare function createSignal<T, Name extends string>(params: {
    name: Name;
    initialValue: T;
}): Record<`use${Capitalize<Name>}`, () => UseNamedStateReturnType<T, Name>> & Record<`$${Name}`, StatefulObservable<T>>;
