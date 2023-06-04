import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";
import { useStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "next/link";
import { ConsentBanner } from "@codegouvfr/react-dsfr/ConsentBanner";


declare module "@codegouvfr/react-dsfr/ConsentBanner" {
    interface RegisterConsentBannerFinality {
        finality:
        | "analytics"
        | "statistics.traffic"
        | "statistics.deviceInfo"
        | "personalization"
        | "advertising"
    }
}


declare module "@codegouvfr/react-dsfr/next-pagesdir" {
    interface RegisterLink {
        Link: typeof Link;
    }
}


const {
    withDsfr,
    dsfrDocumentApi
} = createNextDsfrIntegrationApi({
    "defaultColorScheme": "system",
    Link,
    "preloadFonts": [
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
    ]
});

const { augmentDocumentWithEmotionCache, withAppEmotionCache } = createEmotionSsrAdvancedApproach({
    "key": "css"
});

export { dsfrDocumentApi, augmentDocumentWithEmotionCache };

const brandTop = <>INTITULE<br />OFFICIEL</>;

const homeLinkProps = { "href": "/", "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" };

function App({ Component, pageProps }: AppProps) {

    const { css } = useStyles();

    const router = useRouter()

    return (
        <>
            <ConsentBanner
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
            <div
                style={{
                    "height": "100vh",
                    "display": "flex",
                    "flexDirection": "column"
                }}
            >
                <Header
                    brandTop={brandTop}
                    serviceTitle="Nom du site / service"
                    homeLinkProps={homeLinkProps}
                    navigation={[
                        {
                            "text": "Home",
                            "linkProps": {
                                "href": "/"
                            },
                            "isActive": router.asPath === "/"
                        },
                        {
                            "text": "Mui playground",
                            "linkProps": {
                                "href": "/mui"
                            },
                            "isActive": router.asPath === "/mui"
                        },
                        {
                            "text": "External link",
                            "linkProps": {
                                "href": "https://example.com"
                            }
                        }
                    ]}
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
                />
                <div className={css({
                    "flex": 1,
                    "margin": "auto",
                    "maxWidth": 1000,
                    ...fr.spacing("padding", {
                        "topBottom": "10v"
                    })
                })}>
                    <Component {...pageProps} />
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
                    homeLinkProps={homeLinkProps}
                    bottomItems={[headerFooterDisplayItem]}
                />
            </div>
        </>
    );
}

export default withAppEmotionCache(withDsfr(App));
