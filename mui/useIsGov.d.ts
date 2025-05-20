import { type ReactNode } from "react";
export declare function useIsGov(): {
    isGov: boolean;
};
export declare function IsGovProvider(props: {
    children: ReactNode;
    isGov: boolean;
}): JSX.Element;
