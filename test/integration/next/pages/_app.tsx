import type { AppProps } from "next/app";
import { DsfrLangProvider } from "@codegouvfr/react-dsfr";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next";
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
    ],
    "doPersistDarkModePreferenceWithCookie": true
});

const { augmentDocumentWithEmotionCache, withAppEmotionCache } = createEmotionSsrAdvancedApproach({
    "key": "css"
});

export { dsfrDocumentApi, augmentDocumentWithEmotionCache };

function App({ Component, pageProps }: AppProps) {

    const { css } = useStyles();

    return (
        <DsfrLangProvider lang="fr">
                <Header
                    intituléOfficiel="Intitulé officiel"
                    baselinePrécisionsSurLorganisation="baseline - Précision sur l'organisation"
                    nomDuSiteSlashService="Nom du site / service"
                    links={[
                        {
                            "text": "Créer un espace",
                            "iconId": "fr-icon-add-circle-line",
                            "href": "#"
                        },
                        {
                            "text": "Se connecter",
                            "iconId": "fr-icon-lock-line",
                            "href": "#"
                        },
                        {
                            "text": "S'enregistrer",
                            "iconId": "fr-icon-account-line",
                            "href": "#"
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
        </DsfrLangProvider>
    );
}

export default withAppEmotionCache(withDsfr(App));
