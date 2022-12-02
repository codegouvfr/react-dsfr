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
import defaultMuiShadows from "@mui/material/styles/shadows";
import type { Shadows } from "@mui/material/styles";
import { id } from "tsafe/id";

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
            const { options } = getColors(isDark);

            return {
                "mode": isDark ? "dark" : "light",
                "primary": {
                    "main": options.blueFrance.sun113_625.default,
                    "light": options.blueFrance.sun113_625.active,
                    "dark": options.blueFrance.sun113_625.hover,
                    "contrastText": options.blueFrance._975sun113.default
                },
                "secondary": {
                    "main": options.blueFrance._950_100.default,
                    "light": options.blueFrance._950_100.active,
                    "dark": options.blueFrance._950_100.hover,
                    "contrastText": options.blueFrance.sun113_625.default
                    /* 
                     "main": options.blueFrance._850_200.default,
                    "light": options.blueFrance._850_200.active,
                    "dark": options.blueFrance._850_200.hover,
                    "contrastText": options.blueFrance.sun113_625.default,
                    */
                },

                "error": {
                    "light": options.error._425_625.active,
                    "main": options.error._425_625.default,
                    "dark": options.error._425_625.hover,
                    "contrastText": options.grey._1000_50.default
                },
                "warning": {
                    "light": options.warning._425_625.default,
                    "main": options.warning._425_625.default,
                    "dark": options.warning._425_625.hover,
                    "contrastText": options.grey._1000_50.default
                },
                "info": {
                    "light": options.info._425_625.active,
                    "main": options.info._425_625.default,
                    "dark": options.info._425_625.hover,
                    "contrastText": options.grey._1000_50.default
                },
                "success": {
                    "light": options.success._425_625.active,
                    "main": options.success._425_625.default,
                    "dark": options.success._425_625.hover,
                    "contrastText": options.grey._1000_50.default
                },
                "text": {
                    "primary": options.grey._50_1000.default,
                    "secondary": options.grey._200_850.default,
                    "disabled": options.grey._625_425.default,
                    "hint": options.grey._425_625.default
                },
                "divider": options.grey._900_175.default,
                "action": {
                    "default": options.grey._200_850.default,
                    "background": options.blueFrance._925_125.default,
                    "active": options.grey._200_850.default,
                    "hover": options.grey._975_100.default,
                    "selected": options.blueFrance._925_125.active,
                    "disabled": options.grey._625_425.default,
                    "disabledBackground": options.grey._925_125.default,
                    "focus": options.blueFrance.sun113_625.active
                },

                "background": {
                    "default": options.grey._1000_50.default,
                    "paper": options.grey._1000_100.default,
                    "paperHover": options.grey._975_75.hover
                },
                "getContrastText": () => {
                    return "cyan";
                }
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
        })(),
        "shadows": (() => {
            const [, , , , , , , , ...rest] = defaultMuiShadows;

            return id<Shadows>([
                "none",
                /** ButtonBar shadow */
                "0px 6px 10px 0px rgba(0,0,0,0.07)",
                /** Explorer items */
                "0px 4px 4px 0px rgba(0,0,0,0.1)",
                /** LeftBar */
                "6px 0px 16px 0px rgba(0,0,0,0.15)",
                /** AccountTab default */
                "4px 0px 10px 0px rgba(0,0,0,0.07)",
                /** AccountTab active */
                "-4px 0px 10px 0px rgba(0,0,0,0.07)",
                /** Card over */
                "0px 6px 10px 0px rgba(0,0,0,0.14)",
                /** Dialog **/
                "0px 8px 10px -7px rgba(0,0,0,0.07)",
                ...rest
            ]);
        })(),
        "components": {
            "MuiButton": {
                "styleOverrides": {
                    "root": {
                        "textTransform": "unset"
                    }
                }
            },
            "MuiSvgIcon": {
                "styleOverrides": {
                    "root": ({ theme }) => ({
                        "color": theme.palette.text.primary
                    })
                }
            },
            "MuiStepIcon": {
                "styleOverrides": {
                    "text": {
                        "fill": getColors(true).decisions.text.title.grey.default
                    }
                }
            }
        }
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
