"use client";

import { createContext, useContext } from "react";
import type { UseIsDark } from "./client";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import { assert } from "tsafe/assert";

const ssrIsDarkContext = createContext<boolean | undefined>(undefined);

export const { Provider: SsrIsDarkProvider } = ssrIsDarkContext;

export const useIsDarkServerSide: UseIsDark = () => {
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
