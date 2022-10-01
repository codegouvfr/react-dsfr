import React, { useMemo } from "react";
import type { ReactNode } from "react";

//import { createTheme as createMuiTheme } from "@mui/material/styles";
import type { Theme as MuiTheme } from "@mui/material/styles";
import { Theme } from "./useTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useTheme } from "./useTheme";

function createMuiDsfrThemeFromTheme(params: { theme: Theme }): MuiTheme {
    const { theme } = params;

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
		"typography": createMuiTypographyOptions({
			typographyDesc,
		}),
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

    return theme as any;
}

export type MuiDsfrThemeProviderProps = {
    children: ReactNode;
};

export function MuiDsfrThemeProvider(props: MuiDsfrThemeProviderProps) {
    const { children } = props;

    const theme = useTheme();

    const muiTheme = useMemo(() => createMuiDsfrThemeFromTheme({ theme }), [theme]);

    return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}
