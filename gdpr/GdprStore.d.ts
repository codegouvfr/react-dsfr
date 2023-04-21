import { type PropsWithChildren } from "react";
import React from "react";
import { Consents, GdprServiceName } from "./types";
export interface GdprStore {
    __inited: boolean;
    consents: Consents;
    firstChoiceMade: boolean;
    setConsent(serviceName: GdprServiceName, consent: boolean): void;
    setFirstChoiceMade(): void;
}
export declare const defaultStore: GdprStore;
export declare const GdprStoreContext: React.Context<GdprStore>;
export declare const GdprStoreProvider: ({ children }: PropsWithChildren) => JSX.Element;
