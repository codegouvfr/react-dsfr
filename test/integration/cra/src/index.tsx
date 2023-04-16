import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { Home } from "./Home";
import { Mui } from "./Mui";
import { useRoute, RouteProvider } from "./router";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { fr } from "@codegouvfr/react-dsfr";
import { routes } from "./router";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { GdprStoreProvider } from "@codegouvfr/react-dsfr/gdpr";
import { ConsentBanner } from '@codegouvfr/react-dsfr/ConsentBanner';

startReactDsfr({
    "defaultColorScheme": "system"
});

declare module "@codegouvfr/react-dsfr/gdpr" {
    interface RegisterGdprServices { 
        matomo: never;
    }
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouteProvider>
            <Root />
        </RouteProvider>
    </StrictMode>
);

function Root() {

    const route = useRoute();

    return (
        <GdprStoreProvider>
            <ConsentBanner gdprLinkProps={{href: "/mui"}} siteName='Next Test App' services={[
                {
                    name: "matomo",
                    title: "Matomo",
                    description: "User tracking",
                }
            ]} />
            <div style={{
                "height": "100vh",
                "display": "flex",
                "flexDirection": "column",
            }}>
                <Header
                    brandTop={<>INTITULE<br />OFFICIEL</>}
                    serviceTitle="Nom du site / service"
                    quickAccessItems={[headerFooterDisplayItem]}
                    homeLinkProps={{ ...routes.home().link, "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" }}
                    navigation={[
                        {
                            "text": "Home",
                            "linkProps": routes.home().link,
                            "isActive": route.name === "home"
                        },
                        {
                            "text": "Mui playground",
                            "linkProps": routes.mui().link,
                            "isActive": route.name === "mui"
                        }
                    ]}
                />
                <div style={{
                    "flex": 1,
                    "margin": "auto",
                    "maxWidth": 1000,
                    ...fr.spacing("padding", { "topBottom": "10v" })
                }}>
                    {(() => {
                        switch (route.name) {
                            case "mui": return <Mui />;
                            case "home": return <Home />;
                            case false: return <h1>404</h1>
                        }
                    })()}
                </div>
                <Display />
            </div>
        </GdprStoreProvider>
    );



}