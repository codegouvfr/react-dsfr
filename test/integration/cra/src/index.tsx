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
import { ConsentBanner } from "./gdpr";

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
            <div style={{
                "height": "100vh",
                "display": "flex",
                "flexDirection": "column",
            }}>
                <Header
                    brandTop={<>INTITULE<br />OFFICIEL</>}
                    serviceTitle="Nom du site / service"
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
            <ConsentBanner
                finalities={{
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
            <Display />
        </div>
    );



}