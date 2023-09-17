import { useReducer, useEffect, useMemo } from "react";
import { assert } from "tsafe/assert";
import { breakpoints, type BreakpointKeys, type BreakpointsValues } from "./fr/breakpoints";

export type { BreakpointKeys, BreakpointsValues };

/** @deprecated Use import { useBreakpointsValuesPx } from "@codegouvfr/react-dsfr/useBreakpointsValuesPx"; instead */
export function useBreakpointsValues() {
    const [breakpointsValuesDependency, triggerRefresh] = useReducer(() => ({}), {});

    useEffect(() => {
        const htmlElement = document.querySelector("html");

        assert(htmlElement !== null);

        // Create a new MutationObserver to detect changes in the base font size
        const observer = new MutationObserver(mutationsList => {
            if (
                mutationsList.find(
                    mutation =>
                        mutation.target === htmlElement &&
                        mutation.attributeName === "style" &&
                        (mutation.oldValue ?? "").indexOf("font-size") !== -1
                ) !== undefined
            ) {
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

    const breakpointsValues = useMemo(
        () => breakpoints.getBreakpointsValues(),
        [breakpointsValuesDependency]
    );

    return { breakpointsValues };
}
