import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next";
import { Display, headerQuickAccessDisplay } from "@codegouvfr/react-dsfr/Display";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import { useStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";

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

function App({ Component, pageProps }: AppProps) {

    const { css } = useStyles();

    const router = useRouter()

    return (
        <>
            <Header
                brandTop={<>INTITULE<br />OFFICIEL</>}
                serviceTitle="Nom du site / service"
                homeLinkProps={{ "href": "/" }}
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
                quickAccessItems={[headerQuickAccessDisplay]}
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
            <Display />
        </>
    );
}

export default withAppEmotionCache(withDsfr(App));
