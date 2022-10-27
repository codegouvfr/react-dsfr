/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo } from "react";
import type { ReactNode } from "react";
import { breakpointValues, breakpointValuesUnit } from "./generatedFromCss/breakpoints";
import { createTheme } from "@mui/material/styles";
import type { Theme as MuiTheme } from "@mui/material/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { getColorDecisions } from "./generatedFromCss/getColorDecisions";
import { getColorOptions } from "./generatedFromCss/getColorOptions";
import { useIsDark } from "./darkMode";
import { typography } from "./generatedFromCss/typography";

function createMuiDsfrTheme(params: { isDark: boolean }): MuiTheme {
    const { isDark } = params;

    const muiTheme = createTheme({
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
        })(),
        "typography": {
            "fontFamily": "Marianne",
            "h1": typography.find(({ selector }) => selector === "h1")!.style,
            "h2": typography.find(({ selector }) => selector === "h2")!.style,
            "h3": typography.find(({ selector }) => selector === "h3")!.style,
            "h4": typography.find(({ selector }) => selector === "h4")!.style,
            "h5": typography.find(({ selector }) => selector === "h5")!.style,
            "h6": typography.find(({ selector }) => selector === "h6")!.style,
            //"subtitle1":
            //"subtitle2":
            "body1": typography.find(({ selector }) => selector === "p")!.style
            //"body2": {},
            //"caption": {},
            //"button": {},
            //"overline": {}
        }
    });

    return muiTheme;
}

export type MuiDsfrThemeProviderProps = {
    children: ReactNode;
};

export function MuiDsfrThemeProvider(props: MuiDsfrThemeProviderProps) {
    const { children } = props;

    const { isDark } = useIsDark();

    const muiTheme = useMemo(() => createMuiDsfrTheme({ isDark }), [isDark]);

    return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}

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
