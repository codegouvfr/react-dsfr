"use client";
import { useContext } from "react";
import { GdprStoreContext } from "./gdpr/GdprStore";
export function useGdprStore(slice) {
    const state = useContext(GdprStoreContext);
    return slice ? slice(state) : state;
}
//# sourceMappingURL=useGdprStore.js.map