import { isBrowser } from "./tools/isBrowser";
import type { ColorScheme } from "./colorScheme";
import { startObservingColorSchemeHtmlAttribute } from "./colorScheme";

export type Params = {
    defaultColorScheme: ColorScheme | "system";
};

export async function startReactDsfr(params: Params) {
    const { defaultColorScheme } = params;

    if (!isBrowser) {
        return;
    }

    const global: any = window;

    document.documentElement.setAttribute("data-fr-scheme", defaultColorScheme);
    document.documentElement.setAttribute(
        "data-fr-theme",
        defaultColorScheme !== "system"
            ? defaultColorScheme
            : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
    );

    global.dsfr = { "verbose": true, "mode": "manual" };

    await import("@gouvfr/dsfr/dist/dsfr.module");

    if (global.__NEXT_DATA__?.buildId === "development") {
        console.log("Artificial delay before starting the lib");
        await new Promise(resolve => setTimeout(resolve, 150));
    }

    global.dsfr.start();

    startObservingColorSchemeHtmlAttribute();
}
