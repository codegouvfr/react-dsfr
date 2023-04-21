/**
 * Creates an array of elements split into two groups, the first of which contains elements
 * `predicate` returns truthy for, the second of which contains elements `predicate` returns
 * falsy for. The predicate is invoked with one argument: (value).
 */
export declare function partition<T>(arr: T[], predicate: (value: T) => boolean): [T[], T[]];
