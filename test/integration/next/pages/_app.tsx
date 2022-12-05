import type { AppProps } from "next/app";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import { useStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import type { LinkProps as NextLinkProps } from "next/link";

declare module "@codegouvfr/react-dsfr" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface LinkProps extends NextLinkProps { }

}

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

    return (
        <>
                <Header
                    intituléOfficiel="Intitulé officiel"
                    baselinePrécisionsSurLorganisation="baseline - Précision sur l'organisation"
                    nomDuSiteSlashService="Nom du site / service"
                    links={[
                        {
                            "text": "Home",
                            "iconId": "fr-icon-home-4-fill",
                            "linkProps": {
                                "href": "/"
                            }
                        },
                        {
                            "text": "Mui playground",
                            "iconId": "ri-play-circle-fill",
                            "linkProps": {
                                "href": "/mui"
                            }
                        }
                    ]}
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
        </>
    );
}

export default withAppEmotionCache(withDsfr(App));
