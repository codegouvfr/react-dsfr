"use client";
import React, { createContext, useContext } from "react";
const react = createContext(true);
export function useIsGov() {
    const isGov = useContext(react);
    return { isGov };
}
export function IsGovProvider(props) {
    const { children, isGov } = props;
    return React.createElement(react.Provider, { value: isGov }, children);
}
//# sourceMappingURL=useIsGov.js.map