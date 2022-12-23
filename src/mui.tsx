"use client";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo } from "react";
import type { ReactNode } from "react";
import { breakpointValues, breakpointValuesUnit } from "./lib/generatedFromCss/breakpoints";
import type { Theme as MuiTheme, ThemeOptions } from "@mui/material/styles";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { getColors } from "./lib/colors";
import { useIsDark } from "./lib/darkMode";
import { typography } from "./lib/generatedFromCss/typography";
import { spacingTokenByValue } from "./lib/generatedFromCss/spacing";
import type { ColorTheme } from "./lib/colors";
import { assert } from "tsafe/assert";
import { objectKeys } from "tsafe/objectKeys";
import type { Shadows } from "@mui/material/styles";
import { id } from "tsafe/id";

export function getMuiDsfrThemeOptions(params: { isDark: boolean }): ThemeOptions {
    const { isDark } = params;

    const { options, decisions } = getColors(isDark);

    return {
        "shape": {
            "borderRadius": 0
        },
        "breakpoints": {
            "unit": breakpointValuesUnit,
            "values": breakpointValues
        },
        "palette": {
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
                "disabled": options.grey._625_425.default
            },
            "divider": options.grey._900_175.default,
            "action": {
                "active": options.grey._200_850.default,
                "hover": options.grey._975_100.default,
                "selected": options.blueFrance._925_125.active,
                "disabled": options.grey._625_425.default,
                "disabledBackground": options.grey._925_125.default,
                "focus": options.blueFrance.sun113_625.active
            },
            "background": {
                "default": options.grey._1000_50.default,
                "paper": options.grey._1000_100.default
            }
        } as const,
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
            const [, , , , , , , , ...rest] = createTheme().shadows;

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
            },
            "MuiTablePagination": {
                "styleOverrides": {
                    "displayedRows": {
                        //Fixes: https://user-images.githubusercontent.com/6702424/206063347-65e7d13c-3dea-410c-a0e0-51cf214deba0.png
                        "margin": "unset"
                    }
                }
            },
            "MuiTypography": {
                "styleOverrides": {
                    "root": {
                        //Fixes double underline: https://user-images.githubusercontent.com/6702424/206064575-4f036145-ff40-47db-aabd-560f29136e71.png
                        "backgroundImage": "unset"
                    }
                }
            },
            ...(() => {
                const nonTypedMuiComponents = {
                    "MuiDataGrid": {
                        "styleOverrides": {
                            "columnHeaders": {
                                "backgroundColor": decisions.background.contrast.grey.default,
                                "borderColor": decisions.border.plain.grey.default,
                                "borderPosition": "bottom",
                                "borderWidth": 2
                            },
                            "row": {
                                "&:nth-of-type(2n)": {
                                    "backgroundColor": decisions.background.contrast.grey.default,
                                    "&:hover": {
                                        "backgroundColor": decisions.background.contrast.grey.hover
                                    }
                                },
                                "&:nth-of-type(odd)": {
                                    "backgroundColor": decisions.background.alt.grey.default,
                                    "&:hover": {
                                        "backgroundColor": decisions.background.alt.grey.hover
                                    }
                                }
                            },
                            "columnSeparator": {
                                "display": "none"
                            }
                        }
                    }
                };

                return nonTypedMuiComponents as any as {};
            })()
        }
    };
}

/**
 *Generate a theme base on the options received.
 *
 * @param params — Dark or light mode.
 *
 * @param args — Deep merge the arguments with the about to be returned theme.
 *
 * @returns — A complete, ready-to-use mui theme object.
 */
export function createMuiDsfrTheme(params: { isDark: boolean }, ...args: object[]): MuiTheme {
    const muiTheme = createTheme(getMuiDsfrThemeOptions(params), ...args);

    return muiTheme;
}

export default function createMuiDsfrThemeProvider(params?: {
    useIsDark?: () => { isDark: boolean };
    augmentMuiTheme?: (params: {
        /** WARNING: The types is lying here.
         * It's a Theme as defined in import type { Theme } from "@mui/material/styles";
         * That is to say before augmentation.
         **/
        nonAugmentedMuiTheme: MuiTheme;
        frColorTheme: ColorTheme;
    }) => MuiTheme;
}) {
    const { augmentMuiTheme, useIsDark: useIsDark_props = useIsDark } = params ?? {};

    type Props = {
        children: ReactNode;
        /** If you have implemented theme augmentation */
    };

    function MuiDsfrThemeProvider(props: Props) {
        const { children } = props;

        const { isDark } = useIsDark_props();

        const theme = useMemo(() => {
            const nonAugmentedMuiTheme = createMuiDsfrTheme({ isDark });

            return augmentMuiTheme === undefined
                ? nonAugmentedMuiTheme
                : augmentMuiTheme({
                      "frColorTheme": getColors(isDark),
                      nonAugmentedMuiTheme
                  });
        }, [isDark]);

        return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
    }

    return { MuiDsfrThemeProvider };
}

export const { MuiDsfrThemeProvider } = createMuiDsfrThemeProvider();
