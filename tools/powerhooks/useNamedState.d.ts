import type { Dispatch, SetStateAction } from "react";
export type UseNamedStateReturnType<T, Name extends string> = Record<Name, T> & Record<`set${Capitalize<Name>}`, Dispatch<SetStateAction<T>>>;
export declare function useNamedState<T, Name extends string>(name: Name, initialState: T | (() => T)): UseNamedStateReturnType<T, Name>;
