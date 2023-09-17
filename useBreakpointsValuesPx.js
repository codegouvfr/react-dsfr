import { useReducer, useEffect, useMemo } from "react";
import { assert } from "tsafe/assert";
import { breakpoints } from "./fr/breakpoints";
/** Return the breakpoint values in px, the values ger refreshed
 *  when the base font size change.  */
export function useBreakpointsValuesPx() {
    const [breakpointsValuesDependency, triggerRefresh] = useReducer(() => ({}), {});
    useEffect(() => {
        const htmlElement = document.querySelector("html");
        assert(htmlElement !== null);
        // Create a new MutationObserver to detect changes in the base font size
        const observer = new MutationObserver(mutationsList => {
            if (mutationsList.find(mutation => {
                var _a;
                return mutation.target === htmlElement &&
                    mutation.attributeName === "style" &&
                    ((_a = mutation.oldValue) !== null && _a !== void 0 ? _a : "").indexOf("font-size") !== -1;
            }) !== undefined) {
                triggerRefresh();
            }
        });
        // Observe changes to the style attribute of the html element
        observer.observe(htmlElement, {
            "attributes": true,
            "attributeOldValue": true,
            "attributeFilter": ["style"]
        });
        return () => {
            observer.disconnect();
        };
    }, []);
    const breakpointsValues = useMemo(() => breakpoints.getPxValues(), [breakpointsValuesDependency]);
    return { breakpointsValues };
}
//# sourceMappingURL=useBreakpointsValuesPx.js.map