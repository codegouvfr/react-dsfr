"use client";

import { createContext, type PropsWithChildren, useState, useEffect } from "react";
import { localStorageId } from "./constants";
import React from "react";
import { Consents, GdprServiceName } from "./types";

export interface GdprStore {
    __inited: boolean;
    consents: Consents;
    firstChoiceMade: boolean;
    setConsent(serviceName: GdprServiceName, consent: boolean): void;
    setFirstChoiceMade(): void;
}

export const defaultStore: GdprStore = {
    __inited: false,
    consents: {},
    firstChoiceMade: false,
    setConsent() {
        /* empty */
    },
    setFirstChoiceMade() {
        /* empty */
    }
};

export const GdprStoreContext = createContext<GdprStore>(defaultStore);

export const GdprStoreProvider = ({ children }: PropsWithChildren) => {
    const [consents, setConsents] = useState(defaultStore.consents);
    const [firstChoiceMade, setFirstChoiceMade] = useState(defaultStore.firstChoiceMade);
    const [__inited, setInited] = useState(defaultStore.__inited);

    const setConsentImpl: GdprStore["setConsent"] = (serviceName, consent) => {
        setConsents({ ...consents, [serviceName]: consent });
    };

    const setFirstChoiceMadeImpl: GdprStore["setFirstChoiceMade"] = () => {
        if (!firstChoiceMade) {
            setFirstChoiceMade(true);
        }
    };

    // retrieving store from localStorage
    useEffect(() => {
        const storeRaw = localStorage.getItem(localStorageId);
        if (storeRaw) {
            try {
                const storeFromLocalStorage: GdprStore = JSON.parse(storeRaw);
                setConsents(storeFromLocalStorage.consents);
                setFirstChoiceMade(storeFromLocalStorage.firstChoiceMade);
            } catch {
                console.warn(`${localStorageId} local object is not parsable. Reset.`);
            }
        }
        setInited(true);
    }, []);

    // saving store if consents or firstChoiceMade are updated
    useEffect(() => {
        if (!__inited) return;
        localStorage.setItem(localStorageId, JSON.stringify({ consents, firstChoiceMade }));
    }, [consents, firstChoiceMade, __inited]);

    return (
        <GdprStoreContext.Provider
            value={{
                consents,
                firstChoiceMade,
                __inited,
                setConsent: setConsentImpl,
                setFirstChoiceMade: setFirstChoiceMadeImpl
            }}
        >
            {children}
        </GdprStoreContext.Provider>
    );
};
