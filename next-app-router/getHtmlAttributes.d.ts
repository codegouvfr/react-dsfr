import { data_fr_scheme, data_fr_theme } from "../useIsDark/constants";
import type { ColorScheme } from "../useIsDark";
import { type DefaultColorScheme } from "./zz_internal/defaultColorScheme";
declare const suppressHydrationWarning = true;
export declare function createGetHtmlAttributes(params: {
    defaultColorScheme: DefaultColorScheme;
}): {
    getHtmlAttributes: (params: {
        lang: string | undefined;
    }) => {
        suppressHydrationWarning: true;
        lang?: string | undefined;
    } | ({
        suppressHydrationWarning: true;
        lang?: string | undefined;
    } & Record<"data-fr-theme" | "data-fr-scheme", ColorScheme>);
};
export {};
