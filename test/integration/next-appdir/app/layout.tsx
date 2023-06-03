import { NextAppDirEmotionCacheProvider } from "tss-react/next";
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { ConsentBanner } from "@codegouvfr/react-dsfr/ConsentBanner";
import { getColorSchemeHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getColorSchemeHtmlAttributes";
import StartDsfr from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { fr } from "@codegouvfr/react-dsfr";
import { Navigation } from "./Navigation";

const brandTop = <>INTITULE<br />OFFICIEL</>;

const homeLinkPops = { "href": "/", "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" };

declare module "@codegouvfr/react-dsfr/gdpr" {
	interface RegisterGdprServices {
		matomo: never;
	}
}

export default function RootLayout({ children }: { children: JSX.Element; }) {

	return (
		<html
			{...getColorSchemeHtmlAttributes({ defaultColorScheme })}
			//NOTE: Scrollbar always visible to avoid layout shift when modal are opened
			style={{
				"overflow": "-moz-scrollbars-vertical",
				"overflowY": "scroll"
			}}
		>
			<head>
				<title>Next 13 AppDir Demo DSFR setup</title>
				<StartDsfr />
				<DsfrHead
					defaultColorScheme={defaultColorScheme}
					preloadFonts={[
						//"Marianne-Light",
						//"Marianne-Light_Italic",
						"Marianne-Regular",
						//"Marianne-Regular_Italic",
						"Marianne-Medium",
						//"Marianne-Medium_Italic",
						"Marianne-Bold"
						//"Marianne-Bold_Italic",
						//"Spectral-Regular",
						//"Spectral-ExtraBold"
					]}
				/>
			</head>
			<body
				style={{
					"height": "100vh",
					"display": "flex",
					"flexDirection": "column"
				}}
			>
				<DsfrProvider defaultColorScheme={defaultColorScheme}>
					<ConsentBanner gdprLinkProps={{ href: "/mui" }} siteName='Next Test App' services={[
						{
							name: "matomo",
							title: "Matomo",
							description: "User tracking",
						}
					]} />
					<NextAppDirEmotionCacheProvider options={{ "key": "css" }}>
						<MuiDsfrThemeProvider>
							<Header
								brandTop={brandTop}
								serviceTitle="Nom du site / service"
								homeLinkProps={homeLinkPops}
								quickAccessItems={[
									headerFooterDisplayItem,
									{
										iconId: "ri-mail-line",
										linkProps: {
											href: `mailto:${"joseph.garrone@code.gouv.fr"}`,
										},
										text: "Nous contacter",
									}
								]}
								navigation={<Navigation />}
							/>
							<div style={{
								"flex": 1,
								"margin": "auto",
								"maxWidth": 1000,
								...fr.spacing("padding", {
									"topBottom": "10v"
								})
							}}>
								{children}
							</div>
							<Footer
								brandTop={brandTop}
								accessibility="fully compliant"
								contentDescription={`
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                    eu fugiat nulla pariatur. 
                `}
								homeLinkProps={homeLinkPops}
								bottomItems={[headerFooterDisplayItem]}
							/>
						</MuiDsfrThemeProvider>
					</NextAppDirEmotionCacheProvider>
				</DsfrProvider>
			</body>
		</html>
	);
}
