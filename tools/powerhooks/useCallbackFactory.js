import { useRef, useState } from "react";
import { id } from "tsafe/id";
import { memoize } from "../memoize";
/**
 * https://docs.powerhooks.dev/api-reference/usecallbackfactory
 *
 *  const callbackFactory= useCallbackFactory(
 *      ([key]: [string], [params]: [{ foo: number; }]) => {
 *          ...
 *      },
 *      []
 *  );
 *
 * WARNING: Factory args should not be of variable length.
 *
 */
export function useCallbackFactory(callback) {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
    const memoizedRef = useRef(undefined);
    return useState(() => id((...factoryArgs) => {
        if (memoizedRef.current === undefined) {
            memoizedRef.current = memoize((...factoryArgs) => (...args) => callbackRef.current(factoryArgs, args), { "argsLength": factoryArgs.length });
        }
        return memoizedRef.current(...factoryArgs);
    }))[0];
}
//# sourceMappingURL=useCallbackFactory.js.map