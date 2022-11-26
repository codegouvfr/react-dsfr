export function memoize<Args extends (number | boolean | string)[], R>(
    fn: (...args: Args) => R,
    options?: {
        argsLength?: number;
        max?: number;
    }
): (...args: Args) => R {
    const cache = new Map<string, R>();

    const { argsLength = fn.length, max = Infinity } = options ?? {};

    return ((...args: Args) => {
        const key = JSON.stringify(args.slice(0, argsLength).join("-sIs9sAslOdeWlEdIos3-"));

        if (cache.has(key)) {
            return cache.get(key);
        }

        if (max === cache.size) {
            for (const key of cache.keys()) {
                cache.delete(key);
                break;
            }
        }

        const value = fn(...args);

        cache.set(key, value);

        return value;
    }) as any;
}
