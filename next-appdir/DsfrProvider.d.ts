import type { ReactNode } from "react";
import type { DefaultColorScheme } from "./zz_internal/defaultColorScheme";
export type DsfrProviderProps = {
    children: ReactNode;
    lang: string | undefined;
    Link: Function;
    defaultColorScheme: DefaultColorScheme;
};
export declare function DsfrProvider(props: DsfrProviderProps): JSX.Element;
