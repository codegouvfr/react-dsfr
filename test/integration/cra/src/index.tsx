import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr";
import { Home } from "./Home";
import { Mui } from "./Mui";
import { useRoute, RouteProvider } from "./router";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { fr } from "@codegouvfr/react-dsfr";
import { routes } from "./router";
import { createDsfrLinkProvider } from "@codegouvfr/react-dsfr";

declare module "@codegouvfr/react-dsfr" {
    interface RegisterLink { 
        Link: "a";
    }
}

const { DsfrLinkProvider } = createDsfrLinkProvider({
    "Link": "a"
});

startReactDsfr({
    "defaultColorScheme": "system"
});

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
        <DsfrLinkProvider>
            <Header
                brandTop={<>INTITULE<br />OFFICIEL</>}
                serviceTitle="Nom du site / service"
                homeLinkProps={routes.home().link}
                navItems={[
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
        </DsfrLinkProvider>
    );



}