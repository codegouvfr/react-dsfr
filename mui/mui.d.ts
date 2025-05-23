import { type ReactNode } from "react";
import * as mui from "@mui/material/styles";
import { type BreakpointsValues } from "../useBreakpointsValuesPx";
export declare function getMuiDsfrThemeOptions(params: {
    isDark: boolean;
    breakpointsValues: BreakpointsValues;
}): mui.ThemeOptions;
/**
 *Generate a theme base on the options received.
 *
 * @param params — Dark or light mode.
 *
 * @param args — Deep merge the arguments with the about to be returned theme.
 *
 * @returns — A complete, ready-to-use mui theme object.
 */
export declare function createMuiDsfrTheme(params: {
    isDark: boolean;
    breakpointsValues: BreakpointsValues;
}, ...args: object[]): mui.Theme;
export declare function createMuiDsfrThemeProvider(params: {
    useIsDark?: () => {
        isDark: boolean;
    };
    augmentMuiTheme?: (params: {
        /** WARNING: The types is lying here.
         * It's a Theme as defined in import type { Theme } from "@mui/material/styles";
         * That is to say before augmentation.
         **/
        nonAugmentedMuiTheme: mui.Theme;
        isDark: boolean;
    }) => mui.Theme;
}): {
    MuiDsfrThemeProvider: (props: {
        children: ReactNode;
    }) => JSX.Element;
};
export declare const MuiDsfrThemeProvider: (props: {
    children: ReactNode;
}) => JSX.Element;
export declare function createDsfrCustomBrandingProvider(params: {
    createMuiTheme: (params: {
        isDark: boolean;
        /**
         * WARNING: The types can be lying here if you have augmented the theme.
         * It's a Theme as defined in `import type { Theme } from "@mui/material/styles";`
         * That is to say before augmentation.
         * Make sure to set your custom properties if any are declared at the type level.
         **/
        theme_gov: mui.Theme;
    }) => {
        theme: mui.Theme;
        faviconUrl?: string;
    };
}): {
    DsfrCustomBrandingProvider: (props: {
        children: ReactNode;
    }) => JSX.Element;
};
