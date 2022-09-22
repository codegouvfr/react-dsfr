import { isBrowser } from "./tools/isBrowser";
import type { ColorScheme } from "./colorScheme";
import {
    startObservingColorSchemeHtmlAttribute,
    data_fr_theme,
    data_fr_scheme
} from "./colorScheme";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";

export type Params = {
    defaultColorScheme: ColorScheme | "system";
};

export async function startReactDsfr(params: Params) {
    const { defaultColorScheme } = params;

    assert(
        !isBrowser,
        `${symToStr({
            startReactDsfr
        })} is not supposed to be run on the backed, only in the browser`
    );

    const global: any = window;

    const isNextJsDevMode = global.__NEXT_DATA__?.buildId === "development";

    document.documentElement.setAttribute(data_fr_scheme, defaultColorScheme);

    if (!isNextJsDevMode) {
        document.documentElement.setAttribute(
            data_fr_theme,
            defaultColorScheme !== "system"
                ? defaultColorScheme
                : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
        );
    }

    global.dsfr = { "verbose": true, "mode": "manual" };

    await import("@gouvfr/dsfr/dist/dsfr.module");

    if (isNextJsDevMode) {
        console.log(
            [
                "Artificial delay to avoid the",
                "'Hydration failed because the initial UI does not match what was rendered on the server.'",
                "Error. In production mode the white flash wont be that long."
            ].join(" ")
        );
        await new Promise(resolve => setTimeout(resolve, 150));
    }

    global.dsfr.start();

    startObservingColorSchemeHtmlAttribute();
}
