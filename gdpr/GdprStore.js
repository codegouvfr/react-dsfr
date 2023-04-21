"use client";
import { createContext, useState, useEffect } from "react";
import { localStorageId } from "./constants";
import React from "react";
export const defaultStore = {
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
export const GdprStoreContext = createContext(defaultStore);
export const GdprStoreProvider = ({ children }) => {
    const [consents, setConsents] = useState(defaultStore.consents);
    const [firstChoiceMade, setFirstChoiceMade] = useState(defaultStore.firstChoiceMade);
    const [__inited, setInited] = useState(defaultStore.__inited);
    const setConsentImpl = (serviceName, consent) => {
        setConsents(Object.assign(Object.assign({}, consents), { [serviceName]: consent }));
    };
    const setFirstChoiceMadeImpl = () => {
        if (!firstChoiceMade) {
            setFirstChoiceMade(true);
        }
    };
    // retrieving store from localStorage
    useEffect(() => {
        const storeRaw = localStorage.getItem(localStorageId);
        if (storeRaw) {
            try {
                const storeFromLocalStorage = JSON.parse(storeRaw);
                setConsents(storeFromLocalStorage.consents);
                setFirstChoiceMade(storeFromLocalStorage.firstChoiceMade);
            }
            catch (_a) {
                console.warn(`${localStorageId} local object is not parsable. Reset.`);
            }
        }
        setInited(true);
    }, []);
    // saving store if consents or firstChoiceMade are updated
    useEffect(() => {
        if (!__inited)
            return;
        localStorage.setItem(localStorageId, JSON.stringify({ consents, firstChoiceMade }));
    }, [consents, firstChoiceMade, __inited]);
    return (React.createElement(GdprStoreContext.Provider, { value: {
            consents,
            firstChoiceMade,
            __inited,
            setConsent: setConsentImpl,
            setFirstChoiceMade: setFirstChoiceMadeImpl
        } }, children));
};
//# sourceMappingURL=GdprStore.js.map