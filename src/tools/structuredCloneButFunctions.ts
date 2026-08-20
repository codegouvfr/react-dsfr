/**
 * Functionally equivalent to structuredClone but
 * functions are not cloned but kept as is.
 * (as opposed to structuredClone that chokes if it encounters a function)
 */
export function structuredCloneButFunctions<T>(
    o: T,
    replacer?: (params: { key: string; value: unknown }) => unknown
): T {
    if (!(o instanceof Object)) {
        return o;
    }

    if (typeof o === "function") {
        return o;
    }

    if (o instanceof Array) {
        return o.map(o => structuredCloneButFunctions(o, replacer)) as any;
    }

    return Object.fromEntries(
        Object.entries(o).map(([key, value]) => [
            key,
            structuredCloneButFunctions(
                replacer === undefined ? value : replacer({ key, value }),
                replacer
            )
        ])
    ) as any;
}
