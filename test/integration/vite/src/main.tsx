import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./Home";
import { Mui } from "./Mui";
import { startReactDsfr, createDsfrLinkProvider, fr } from "@codegouvfr/react-dsfr";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import type { LinkProps as ReactRouterLinkProps } from "react-router-dom";
startReactDsfr({ "defaultColorScheme": "system" });

declare module "@codegouvfr/react-dsfr" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface LinkProps extends ReactRouterLinkProps { }

}

const { DsfrLinkProvider } = createDsfrLinkProvider({ Link })

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <DsfrLinkProvider>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </DsfrLinkProvider>
    </React.StrictMode>
);

function Root() {

    const location = useLocation();

    return (
        <>
            <Header
                brandTop={<>INTITULE<br />OFFICIEL</>}
                serviceTitle="Nom du site / service"
                homeLinkProps={{ "to": "/" }}
                mainNavigationProps={{
                    "items": [
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
                    ]
                }}
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
        </>

    );

}
