import { type ReactNode } from "react";
import type { Theme as MuiTheme, ThemeOptions } from "@mui/material/styles";
import { type BreakpointsValues } from "./useBreakpointsValues";
export declare function getMuiDsfrThemeOptions(params: {
    isDark: boolean;
    breakpointsValues: BreakpointsValues;
}): ThemeOptions;
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
}, ...args: object[]): MuiTheme;
export declare function createMuiDsfrThemeProvider(params: {
    useIsDark?: () => {
        isDark: boolean;
    };
    augmentMuiTheme?: (params: {
        /** WARNING: The types is lying here.
         * It's a Theme as defined in import type { Theme } from "@mui/material/styles";
         * That is to say before augmentation.
         **/
        nonAugmentedMuiTheme: MuiTheme;
        isDark: boolean;
    }) => MuiTheme;
}): {
    MuiDsfrThemeProvider: (props: {
        children: ReactNode;
    }) => JSX.Element;
};
export declare const MuiDsfrThemeProvider: (props: {
    children: ReactNode;
}) => JSX.Element;
export default MuiDsfrThemeProvider;
