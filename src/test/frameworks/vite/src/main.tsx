import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { startReactDsfr } from "dsfr-react";
startReactDsfr({ "defaultColorScheme": "system" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
