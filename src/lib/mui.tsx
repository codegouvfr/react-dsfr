import React, { useMemo } from "react";
import type { ReactNode } from "react";
import { breakpointValues, breakpointValuesUnit } from "./generatedFromCss/breakpoints";
import { createTheme as createMuiTheme } from "@mui/material/styles";
import type { Theme as MuiTheme } from "@mui/material/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { getColorDecisions } from "./generatedFromCss/getColorDecisions";
import { getColorOptions } from "./generatedFromCss/getColorOptions";
import { useIsDark } from "./darkMode";

function createMuiDsfrThemeFromTheme(params: { isDark: boolean }): MuiTheme {
    const { isDark } = params;

    const muiTheme = createMuiTheme({
        "shape": {
            "borderRadius": 0
        },
        "breakpoints": {
            "unit": breakpointValuesUnit,
            "values": breakpointValues
        },
        "palette": (() => {
            const colorOptions = getColorOptions({ isDark });
            const colorDecisions = getColorDecisions({ colorOptions });

            return {
                "mode": isDark ? "dark" : "light",
                "primary": {
                    "main": colorDecisions.background.actionHigh.blueFrance.default,
                    "light": colorDecisions.background.actionLow.blueFrance.default
                },
                "secondary": {
                    "main": colorDecisions.background.actionHigh.redMarianne.default,
                    "light": colorDecisions.background.actionLow.redMarianne.default
                }
                /*
                "primary": {
                    "900": colorOptions.blueFrance._925_125.default,
                    "800": colorOptions.blueFrance._850_200.default,
                },
                "secondary": {
                    "main": colorDecisions.background.actionHigh.redMarianne.default,
                    "light": colorDecisions.background.actionLow.redMarianne.default,
                },
                */
            } as const;
        })()
    });

    /*
    const muiTheme = createMuiTheme({
        "shape": {
            "borderRadius": 0
        },
        "breakpoints": {
            "unit": "em",
            "values": { 
                "xs": 0,  
                "sm": number,
                "md": number,
                "lg": number,
                "xl": number,
            },
        },
        "typography": {
            "h1": {
                "color": "red",
                [breakpoints.up("md")]: {
                    "color": "pink"
                }
                
            }
        }
        "palette": createMuiPaletteOptions({
            isDarkModeEnabled,
            palette,
            useCases,
        }),
        spacing,
        "components": {
            "MuiLink": {
                "defaultProps": {
                    "underline": "hover",
                },
            },
        },
    });
    */

    return muiTheme;
}

export type MuiDsfrThemeProviderProps = {
    children: ReactNode;
};

export function MuiDsfrThemeProvider(props: MuiDsfrThemeProviderProps) {
    const { children } = props;

    const { isDark } = useIsDark();

    const muiTheme = useMemo(() => createMuiDsfrThemeFromTheme({ isDark }), [isDark]);

    return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}
