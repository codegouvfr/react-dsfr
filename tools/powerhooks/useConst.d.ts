/**
 * Compute a value on first render and never again,
 * Equivalent of const [x] = useState(()=> ...)
 */
export declare function useConst<T>(getValue: () => T): T;
