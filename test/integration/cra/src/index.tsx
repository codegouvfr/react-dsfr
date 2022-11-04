import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { startDsfrReact } from "@codegouvfr/react-dsfr";
import { App } from "./App";

startDsfrReact({
    "defaultColorScheme": "system"
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
