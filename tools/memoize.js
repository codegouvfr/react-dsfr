export function memoize(fn, options) {
    const cache = new Map();
    const { argsLength = fn.length, max = Infinity } = options !== null && options !== void 0 ? options : {};
    return ((...args) => {
        const key = JSON.stringify(args
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
            .join("-sIs9sAslOdeWlEdIos3-"));
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
    });
}
//# sourceMappingURL=memoize.js.map