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
import type { Theme as NonAugmentedMuiTheme } from "./lib/tools/@mui/material/styles/createTheme";
import { assert } from "tsafe/assert";
import { objectKeys } from "tsafe/objectKeys";

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
        "typography": (() => {
            const getBySelector = (selector: typeof typography[number]["selector"]) => {
                const variant = typography.find(variant => variant.selector === selector);
                assert(variant !== undefined);

                const style = { ...variant.style };

                //TODO: Investigate why we need to do that.
                delete (style as any).margin;

                return style;
            };

            return {
                "fontFamily": '"Marianne", arial, sans-serif',
                "h1": getBySelector("h1"),
                "h2": getBySelector("h2"),
                "h3": getBySelector("h3"),
                "h4": getBySelector("h4"),
                "h5": getBySelector("h5"),
                "h6": getBySelector("h6"),
                //"subtitle1":
                //"subtitle2":
                "body1": getBySelector("p")
                //"body2": {},
                //"caption": {},
                //"button": {},
                //"overline": {}
            };
        })(),
        "spacing": (() => {
            const values: string[] = [];

            //NOTE: The properties are declared sorted in the object.
            objectKeys(spacingTokenByValue).forEach(key => {
                if (key.endsWith("w")) {
                    values.push(spacingTokenByValue[key]);
                }
            });

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

export function createMuiDsfrThemeProvider(params: {
    augmentMuiTheme: (params: {
        nonAugmentedMuiTheme: NonAugmentedMuiTheme;
        frColorTheme: ColorTheme;
    }) => MuiTheme;
}) {
    const { augmentMuiTheme } = params;

    type Props = {
        children: ReactNode;
        /** If you have implemented theme augmentation */
    };

    function MuiDsfrThemeProvider(props: Props) {
        const { children } = props;

        const { isDark } = useIsDark();

        const theme = useMemo(
            () =>
                augmentMuiTheme({
                    "frColorTheme": getColors(isDark),
                    "nonAugmentedMuiTheme": createMuiDsfrTheme({ isDark })
                }),
            [isDark]
        );

        return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
    }

    return { MuiDsfrThemeProvider };
}

export function noAugmentation(params: { nonAugmentedMuiTheme: MuiTheme }) {
    const { nonAugmentedMuiTheme } = params;
    return nonAugmentedMuiTheme;
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
