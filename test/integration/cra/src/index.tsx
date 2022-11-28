import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { startDsfrReact } from "@codegouvfr/react-dsfr";
import { Home } from "./Home";
import { Mui } from "./Mui";
import { useRoute, RouteProvider } from "./router";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { fr } from "@codegouvfr/react-dsfr";

startDsfrReact({
    "defaultColorScheme": "system"
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouteProvider>
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
            <div style={{
                "margin": "auto",
                "maxWidth": 1000,
                ...fr.spacing("padding", { "topBottom": "10v" })
            }}>
                <Router />
            </div>
        </RouteProvider>
    </StrictMode>
);

function Router() {

    const route = useRoute();

    switch (route.name) {
        case "mui": return <Mui />;
        case "home": return <Home />;
        case false: return <h1>404</h1>
    }

}