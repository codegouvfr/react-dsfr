import { createStatefulObservable, useRerenderOnChange } from "./tools/StatefulObservable";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { assert } from "tsafe/assert";
import { isBrowser } from "./tools/isBrowser";

export type ColorScheme = "light" | "dark";

export const data_fr_scheme = "data-fr-scheme";
export const data_fr_theme = "data-fr-theme";

export const $colorScheme = createStatefulObservable<ColorScheme>(
    getCurrentColorSchemeFromHtmlAttribute
);

type UseColorScheme = () => {
    colorScheme: ColorScheme;
    setColorScheme: (colorSchemeOrSystem: ColorScheme | "system") => void;
};

const useColorSchemeClientSide: UseColorScheme = () => {
    useRerenderOnChange($colorScheme);

    const setColorScheme = useConstCallback((colorSchemeOrSystem: ColorScheme | "system") =>
        document.documentElement.setAttribute(data_fr_scheme, colorSchemeOrSystem)
    );

    return { "colorScheme": $colorScheme.current, setColorScheme };
};

const useColorSchemeServerSide: UseColorScheme = () => {
    const setColorScheme = useConstCallback(() => {
        /* nothing */
    });

    return {
        "colorScheme": "light",
        setColorScheme
    };
};

export const useColorScheme = isBrowser ? useColorSchemeClientSide : useColorSchemeServerSide;

function getCurrentColorSchemeFromHtmlAttribute(): ColorScheme {
    if (!isBrowser) {
        return "light";
    }

    const colorSchemeReadFromDom = document.documentElement.getAttribute(data_fr_theme);

    switch (colorSchemeReadFromDom) {
        case null:
            return "light";
        case "light":
        case "dark":
            return colorSchemeReadFromDom;
    }

    assert(false);
}

export function startObservingColorSchemeHtmlAttribute() {
    $colorScheme.current = getCurrentColorSchemeFromHtmlAttribute();

    new MutationObserver(
        () => ($colorScheme.current = getCurrentColorSchemeFromHtmlAttribute())
    ).observe(document.documentElement, {
        "attributes": true,
        "attributeFilter": [data_fr_theme]
    });

    //TODO:    <meta name="theme-color" content="#000091"><!-- Défini la couleur de thème du navigateur (Safari/Android) -->

    //TODO: Remove once https://github.com/GouvernementFR/dsfr/issues/407 is dealt with
    {
        const setRootColorScheme = (colorScheme: ColorScheme) => {
            const id = "root-color-scheme";

            remove_existing_element: {
                const element = document.getElementById(id);

                if (element === null) {
                    break remove_existing_element;
                }

                element.remove();
            }

            const element = document.createElement("style");

            element.id = id;

            element.innerHTML = `:root { color-scheme: ${colorScheme} }`;

            document.getElementsByTagName("head")[0].appendChild(element);
        };

        setRootColorScheme($colorScheme.current);

        $colorScheme.subscribe(setRootColorScheme);
    }
}
