import { NextAppDirEmotionCacheProvider } from "tss-react/next";
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getColorSchemeHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getColorSchemeHtmlAttributes";
import StartDsfr from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { headerFooterDisplayItem, addDisplayTranslations } from "@codegouvfr/react-dsfr/Display";
import { fr } from "@codegouvfr/react-dsfr";
import { Navigation } from "./Navigation";
import ConsentBannerAndConsentManagement from "@codegouvfr/react-dsfr/gdpr/ConsentBannerAndConsentManagement";
import { footerConsentManagementItem, getFooterPersonalDataPolicyItem } from "@codegouvfr/react-dsfr/gdpr";

declare module "@codegouvfr/react-dsfr/gdpr" {
	interface RegisterFinality {
		finality:
		| "analytics"
		| "statistics.traffic"
		| "statistics.deviceInfo"
		| "personalization"
		| "advertising";
	}
}


const brandTop = <>INTITULE<br />OFFICIEL</>;
const homeLinkPops = { "href": "/", "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" };
const personalDataPolicyLinkProps = { "href": "/politique-de-confidentialite", "title": "Politique de confidentialité" };

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
				<ConsentBannerAndConsentManagement
					personalDataPolicyLinkProps={personalDataPolicyLinkProps}
					finalityDescription={{
						"advertising": {
							"title": "Publicité",
							"description": "Nous utilisons des cookies pour vous proposer des publicités adaptées à vos centres d’intérêts et mesurer leur efficacité."
						},
						"analytics": {
							"title": "Analyse",
							"description": "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu."
						},
						"personalization": {
							"title": "Personnalisation",
							"description": "Nous utilisons des cookies pour vous proposer des contenus adaptés à vos centres d’intérêts."
						},
						"statistics": {
							"title": "Statistiques",
							"description": "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu.",
							"titleBySubFinality": {
								"deviceInfo": "Informations sur votre appareil",
								"traffic": "Informations sur votre navigation",
							}
						}
					}}
				/>
				<DsfrProvider defaultColorScheme={defaultColorScheme}>
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
								bottomItems={[
									headerFooterDisplayItem,
									footerConsentManagementItem,
									getFooterPersonalDataPolicyItem({ personalDataPolicyLinkProps })
								]}
							/>
						</MuiDsfrThemeProvider>
					</NextAppDirEmotionCacheProvider>
				</DsfrProvider>
			</body>
		</html>
	);
}

addDisplayTranslations({
	"lang": "fr",
	"messages": {
		"dark theme": "Thème sombre 🤩",
	}
});
