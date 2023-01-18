type SimpleType = number | string | boolean | null | undefined;
type FuncWithSimpleParams<T extends SimpleType[]> = (...args: T) => any;

export function memoize<T extends SimpleType[]>(
    fn: FuncWithSimpleParams<T>,
    options?: {
        argsLength?: number;
        max?: number;
    }
): FuncWithSimpleParams<T> {
    const cache = new Map<string, ReturnType<FuncWithSimpleParams<T>>>();

    const { argsLength = fn.length, max = Infinity } = options ?? {};

    return ((...args: Parameters<FuncWithSimpleParams<T>>) => {
        const key = JSON.stringify(
            args
                .slice(0, argsLength)
                .map(v => {
                    if (v === null) {
                        return "null";
                    }
                    if (v === undefined) {
                        return "undefined";
                    }
                    switch (typeof v) {
                        case "number":
                            return `number-${v}`;
                        case "string":
                            return `string-${v}`;
                        case "boolean":
                            return `boolean-${v ? "true" : "false"}`;
                    }
                })
                .join("-sIs9sAslOdeWlEdIos3-")
        );

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
