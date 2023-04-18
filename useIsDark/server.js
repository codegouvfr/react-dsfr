"use client";
import { createContext, useContext } from "react";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import { assert } from "tsafe/assert";
const ssrIsDarkContext = createContext(undefined);
export const { Provider: SsrIsDarkProvider } = ssrIsDarkContext;
export const useIsDarkServerSide = () => {
    const setIsDark = useConstCallback(() => {
        /* nothing */
    });
    const isDark = useContext(ssrIsDarkContext);
    assert(isDark !== undefined, "Not within provider");
    return {
        isDark,
        setIsDark
    };
};
//# sourceMappingURL=server.js.map