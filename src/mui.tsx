/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo } from "react";
import type { ReactNode } from "react";
import { breakpointValues, breakpointValuesUnit } from "./lib/generatedFromCss/breakpoints";
import type { Theme as MuiTheme } from "@mui/material/styles";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { getColors } from "./lib/colors";
import { useIsDark } from "./lib/darkMode";
import { typography } from "./lib/generatedFromCss/typography";
import { spacingTokenByValue } from "./lib/generatedFromCss/spacing";
import type { ColorTheme } from "./lib/colors";
//import type { Components } from "@mui/material/styles";

/*
type NonAugmentedBaseMuiTheme = NonNullable<MuiTheme["components"]> extends Components<infer BaseMuiTheme> ? BaseMuiTheme : undefined;


export type NonAugmentedMuiTheme = NonAugmentedBaseMuiTheme & {
    components?: Components<NonAugmentedBaseMuiTheme>;
};
*/

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
            const { decisions } = getColors(isDark);

            return {
                "mode": isDark ? "dark" : "light",
                "primary": {
                    "main": decisions.background.actionHigh.blueFrance.default,
                    "light": decisions.background.actionLow.blueFrance.default
                },
                "secondary": {
                    "main": decisions.background.actionHigh.redMarianne.default,
                    "light": decisions.background.actionLow.redMarianne.default
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
            "fontFamily": '"Marianne", arial, sans-serif',
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
        },
        "spacing": (() => {
            //NOTE: The properties are declared sorted in the object.
            const values = Object.values(spacingTokenByValue);

            return (abs: string | number) =>
                typeof abs === "string"
                    ? abs
                    : abs === 0
                    ? 0
                    : (() => {
                          const value = values[abs - 1];
                          return value === undefined ? abs : value;
                      })();
        })()
    });

    return muiTheme;
}

export type NonAugmentedMuiTheme = MuiTheme;

export type MuiDsfrThemeProviderProps = {
    children: ReactNode;
    /** If you have implemented theme augmentation */
    augmentMuiTheme?: (params: {
        nonAugmentedMuiTheme: NonAugmentedMuiTheme;
        frColorTheme: ColorTheme;
    }) => MuiTheme;
};

export function MuiDsfrThemeProvider(props: MuiDsfrThemeProviderProps) {
    const { children, augmentMuiTheme } = props;

    const { isDark } = useIsDark();

    const augmentedMuiTheme = useMemo(() => {
        const muiTheme = createMuiDsfrTheme({ isDark });

        if (augmentMuiTheme === undefined) {
            return muiTheme;
        }

        return augmentMuiTheme({
            "frColorTheme": getColors(isDark),
            "nonAugmentedMuiTheme": muiTheme
        });
    }, [isDark, augmentMuiTheme]);

    return <MuiThemeProvider theme={augmentedMuiTheme}>{children}</MuiThemeProvider>;
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
