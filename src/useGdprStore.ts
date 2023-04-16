"use client";

import { useContext } from "react";
import { GdprStoreContext, GdprStore } from "./gdpr/GdprStore";

/**
 * Zustand like store based on ReactContext. See {@link GdprStore} for store content.
 */
export function useGdprStore(): GdprStore;
export function useGdprStore<T extends GdprStore[keyof GdprStore]>(
    slice: (state: GdprStore) => T
): T;
export function useGdprStore<T extends GdprStore[keyof GdprStore]>(
    slice?: (state: GdprStore) => T
): GdprStore | T {
    const state = useContext(GdprStoreContext);
    return slice ? slice(state) : state;
}
