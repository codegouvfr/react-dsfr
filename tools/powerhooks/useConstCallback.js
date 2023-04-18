import { useRef, useState } from "react";
/** https://stackoverflow.com/questions/65890278/why-cant-usecallback-always-return-the-same-ref */
export function useConstCallback(callback) {
    const callbackRef = useRef(null);
    callbackRef.current = callback;
    return useState(() => (...args) => callbackRef.current(...args))[0];
}
//# sourceMappingURL=useConstCallback.js.map