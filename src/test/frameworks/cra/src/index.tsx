import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { startReactDsfr } from "dsfr-react";
import { App } from "./App";

startReactDsfr({
    "defaultColorScheme": "system"
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
