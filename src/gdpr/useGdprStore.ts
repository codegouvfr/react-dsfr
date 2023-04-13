import { Consents, GdprServiceName } from "./types";
import { consentModalButtonProps } from "./ConsentModal";
import { useContext } from "react";
import { GdprContext } from "./GdprContext";

export const defaultStore: UseGdprStore = {
    consentModalButtonProps,
    consents: {},
    firstChoiceMade: false,
    modalButtonProps: consentModalButtonProps.nativeButtonProps
};

export interface UseGdprStore {
    consentModalButtonProps: typeof consentModalButtonProps;
    consents: Consents;
    firstChoiceMade: boolean;
    modalButtonProps: typeof consentModalButtonProps["nativeButtonProps"];
}

export function useGdprStore(): UseGdprStore;
export function useGdprStore<T extends UseGdprStore[keyof UseGdprStore]>(
    slice: (state: UseGdprStore) => T
): T;
export function useGdprStore<T extends UseGdprStore[keyof UseGdprStore]>(
    slice?: (state: UseGdprStore) => T
): UseGdprStore | T {
    const state = useContext(GdprContext);
    return slice ? slice(state) : state;
}

export function useSetterStore() {
    const state = useContext(GdprContext);
    return {
        setConsent(serviceName: GdprServiceName, consent: boolean) {
            state.consents = { ...state.consents, [serviceName]: consent };
        },
        setFirstChoiceMade() {
            state.firstChoiceMade = true;
        }
    };
}
