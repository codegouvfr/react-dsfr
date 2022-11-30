import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { startDsfrReact } from "@codegouvfr/react-dsfr";
import { Home } from "./Home";
import { Mui } from "./Mui";
import { useRoute, RouteProvider } from "./router";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { fr } from "@codegouvfr/react-dsfr";
import type { Link as TypeRouteLink } from "type-route";
import { routes } from "./router";

declare module "@codegouvfr/react-dsfr" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface LinkProps extends TypeRouteLink { }

}

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
                        "text": "Home",
                        "iconId": "fr-icon-home-4-fill",
                        "linkProps": routes.home().link
                    },
                    {
                        "text": "Mui playground",
                        "iconId": "ri-play-circle-fill",
                        "linkProps": routes.mui().link
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