import type { ColorScheme } from "../../useIsDark";
export type DefaultColorScheme = ColorScheme | "system";
export declare function getDefaultColorSchemeServerSide(): DefaultColorScheme;
export declare function setDefaultColorSchemeServerSide(params: {
    defaultColorScheme: DefaultColorScheme;
}): void;
