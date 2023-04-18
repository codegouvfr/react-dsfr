import type { ReactNode } from "react";
import type { ColorScheme } from "../useIsDark";
export type DsfrProviderProps = {
    defaultColorScheme: ColorScheme | "system";
    children: ReactNode;
};
export declare function DsfrProvider(props: DsfrProviderProps): JSX.Element;
