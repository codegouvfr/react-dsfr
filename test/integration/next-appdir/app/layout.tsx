import { NextAppDirEmotionCacheProvider } from "tss-react/next";
import DsfrHead from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import DsfrProvider from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { dsfrEffect } from "@codegouvfr/react-dsfr/next-appdir/start";
import { getColorSchemeHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getColorSchemeHtmlAttributes";
import StartDsfr from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";

export default function RootLayout({ children }: { children: JSX.Element; }) {
	return (
		<html {...getColorSchemeHtmlAttributes({ defaultColorScheme })} >
			<head>
				<StartDsfr />
				<DsfrHead defaultColorScheme={defaultColorScheme} />
			</head>
			<body>
				<DsfrProvider defaultColorScheme={defaultColorScheme} effect={dsfrEffect}>
					<NextAppDirEmotionCacheProvider options={{ "key": "css" }}>
						{children}
					</NextAppDirEmotionCacheProvider>
				</DsfrProvider>
			</body>
		</html>
	);
}
