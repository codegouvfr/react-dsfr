export function memoize<F extends (...args: (string | number | boolean)[]) => any>(
    fn: F,
    options: {
        argsLength: number;
    }
): F {
    const cache: Record<string, ReturnType<F>> = {};

    const { argsLength } = options;

    return ((...args: Parameters<F>) => {
        const key = JSON.stringify(args.slice(0, argsLength).join("-sIs9sAslOdeWlEdIos3-"));

        console.log(key, JSON.stringify({ argsLength, args }));

        if (key in cache) {
            return cache[key];
        }

        return (cache[key] = fn(...args));
    }) as any;
}
