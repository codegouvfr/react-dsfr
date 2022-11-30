import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./Home";
import { Mui } from "./Mui";
import { startDsfrReact, createDsfrLinkProvider, fr } from "@codegouvfr/react-dsfr";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import type { LinkProps as ReactRouterLinkProps } from "react-router-dom";
startDsfrReact({ "defaultColorScheme": "system" });

declare module "@codegouvfr/react-dsfr" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface LinkProps extends ReactRouterLinkProps { }

}

const { DsfrLinkProvider } = createDsfrLinkProvider({ Link })

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <DsfrLinkProvider>
            <BrowserRouter>
                <Header
                    intituléOfficiel="Intitulé officiel"
                    baselinePrécisionsSurLorganisation="baseline - Précision sur l'organisation"
                    nomDuSiteSlashService="Nom du site / service"
                    links={[
                        {
                            "text": "Home",
                            "iconId": "fr-icon-home-4-fill",
                            "linkProps": {
                                "to": "/"
                            }
                        },
                        {
                            "text": "Mui playground",
                            "iconId": "ri-play-circle-fill",
                            "linkProps": {
                                "to": "/mui"
                            }
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

            </BrowserRouter>
        </DsfrLinkProvider>
    </React.StrictMode>
);

