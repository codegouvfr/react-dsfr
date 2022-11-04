import DefaultApp from "next/app";
import { withAppDsfr } from "@codegouvfr/react-dsfr/next";
import "@codegouvfr/react-dsfr/dsfr/dsfr.css";
import "@codegouvfr/react-dsfr/dsfr/utility/icons/icons.css";

export default withAppDsfr(DefaultApp, {
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
