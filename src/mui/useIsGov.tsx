"use client";

import React, { createContext, useContext, type ReactNode } from "react";

const react = createContext<boolean>(true);

export function useIsGov() {
    const isGov = useContext(react);

    return { isGov };
}

export function IsGovProvider(props: { children: ReactNode; isGov: boolean }) {
    const { children, isGov } = props;

    return <react.Provider value={isGov}>{children}</react.Provider>;
}
