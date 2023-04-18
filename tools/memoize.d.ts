type SimpleType = number | string | boolean | null | undefined;
type FuncWithSimpleParams<T extends SimpleType[], R> = (...args: T) => R;
export declare function memoize<T extends SimpleType[], R>(fn: FuncWithSimpleParams<T, R>, options?: {
    argsLength?: number;
    max?: number;
}): FuncWithSimpleParams<T, R>;
export {};
