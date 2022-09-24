import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { startDsfrReact } from "dsfr-react";
import { App } from "./App";

startDsfrReact({
    "defaultColorScheme": "system"
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
