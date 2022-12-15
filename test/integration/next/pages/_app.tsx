import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import { useStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { createDsfrLinkProvider } from "@codegouvfr/react-dsfr";
import Link from "next/link";

declare module "@codegouvfr/react-dsfr" {
    interface RegisterLink {
        Link: typeof Link;
    }
}

const { DsfrLinkProvider } = createDsfrLinkProvider({ Link });

const {
    withDsfr,
    dsfrDocumentApi
} = createNextDsfrIntegrationApi({
    "defaultColorScheme": "system",
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

const brandTop= <>INTITULE<br />OFFICIEL</>;

const homeLinkPops= { "href": "/", "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" };

function App({ Component, pageProps }: AppProps) {

    const { css } = useStyles();

    const router = useRouter()

    return (
        <DsfrLinkProvider>
            <Header
                brandTop={brandTop}
                serviceTitle="Nom du site / service"
                homeLinkProps={homeLinkPops }
                navItems={[
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
                    }
                ]}
                quickAccessItems={[headerFooterDisplayItem]}
            />
            <div className={css({
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
                homeLinkProps={homeLinkPops}
                bottomItems={[headerFooterDisplayItem]}
            />
            <Display />
        </DsfrLinkProvider>
    );
}

export default withAppEmotionCache(withDsfr(App));
