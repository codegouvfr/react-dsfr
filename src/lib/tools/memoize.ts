export function memoize<Args extends (number | boolean | string)[], R>(
    fn: (...args: Args) => R,
    options?: {
        argsLength?: number;
    }
): (...args: Args) => R {
    const cache: Record<string, R> = {};

    const { argsLength = fn.length } = options ?? {};

    return ((...args: Args) => {
        const key = JSON.stringify(args.slice(0, argsLength).join("-sIs9sAslOdeWlEdIos3-"));

        if (key in cache) {
            return cache[key];
        }

        return (cache[key] = fn(...args));
    }) as any;
}
