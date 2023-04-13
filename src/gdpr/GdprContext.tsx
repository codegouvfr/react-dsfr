import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { localStorageId } from "./constants";
import { defaultStore, UseGdprStore } from "./useGdprStore";
import React from "react";

export const GdprContext = createContext<UseGdprStore>(defaultStore);

export const GdprProvider = ({ children }: PropsWithChildren) => {
    const [store, setStore] = useState(defaultStore);
    useEffect(() => {
        const storeRaw = localStorage.getItem(localStorageId);
        if (storeRaw) {
            try {
                setStore(JSON.parse(storeRaw));
            } catch {
                console.warn(`${localStorageId} local object is not parsable. Reset.`);
            }
        }

        localStorage.setItem(localStorageId, JSON.stringify(defaultStore));
    }, [setStore]);

    return <GdprContext.Provider value={store}>{children}</GdprContext.Provider>;
};
