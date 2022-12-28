import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./Home";
import { Mui } from "./Mui";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { fr } from "@codegouvfr/react-dsfr";

startReactDsfr({ "defaultColorScheme": "system", Link });

declare module "@codegouvfr/react-dsfr/spa" {
    interface RegisterLink {
        Link: typeof Link;
    }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </React.StrictMode>
);

function Root() {

    const location = useLocation();

    return (
        <>
            <Header
                brandTop={<>INTITULE<br />OFFICIEL</>}
                serviceTitle="Nom du site / service"
                homeLinkProps={{ "to": "/", "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" }}
                quickAccessItems={[headerFooterDisplayItem]}
                navItems={[
                    {
                        "text": "Home",
                        "linkProps": {
                            "to": "/"
                        },
                        "isActive": location.pathname === "/"
                    },
                    {
                        "text": "Mui playground",
                        "linkProps": {
                            "to": "/mui"
                        },
                        "isActive": location.pathname === "/mui"
                    }
                ]}
            />
            <div style={{
                "margin": "auto",
                "maxWidth": 1000,
                ...fr.spacing("padding", { "topBottom": "10v" })
            }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mui" element={<Mui />} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </div>
            <Display />
        </>

    );

}
