import {
    createStatefulObservable,
    useRerenderOnChange,
    statefulObservableBidirectionalMap
} from "./tools/StatefulObservable";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { assert } from "tsafe/assert";
import { isBrowser } from "./tools/isBrowser";

export type ColorScheme = "light" | "dark";

export const data_fr_theme = "data-fr-theme";
export const data_fr_scheme = "data-fr-scheme";

export const $colorScheme = createStatefulObservable<ColorScheme>(() => "light");

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
        "colorScheme": $colorScheme.current,
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

    {
        const setColorSchemeCookie = (colorScheme: ColorScheme) => {
            let newCookie = `${data_fr_theme}=${colorScheme};path=/;max-age=31536000`;

            //We do not set the domain if we are on localhost or an ip
            if (window.location.hostname.match(/\.[a-zA-Z]{2,}$/)) {
                newCookie += `;domain=${
                    window.location.hostname.split(".").length >= 3
                        ? window.location.hostname.replace(/^[^.]+\./, "")
                        : window.location.hostname
                }`;
            }

            document.cookie = newCookie;
        };

        setColorSchemeCookie($colorScheme.current);

        $colorScheme.subscribe(setColorSchemeCookie);
    }

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

            element.innerHTML = `:root { color-scheme: ${colorScheme}; }`;

            document.getElementsByTagName("head")[0].appendChild(element);
        };

        setRootColorScheme($colorScheme.current);

        $colorScheme.subscribe(setRootColorScheme);
    }
}

//NOTE: Just because it's more convenient to have a boolean than "light" | "dark"

export const $isDark = statefulObservableBidirectionalMap({
    "statefulObservable": $colorScheme,
    "trInToOut": colorScheme => {
        switch (colorScheme) {
            case "light":
                return false;
            case "dark":
                return true;
        }
    },
    "trOutToIn": isDark => (isDark ? "dark" : "light")
});

export function useIsDark() {
    const { colorScheme, setColorScheme } = useColorScheme();

    const setIsDark = useConstCallback((isDark: boolean | "system") =>
        setColorScheme(typeof isDark !== "boolean" ? isDark : isDark ? "dark" : "light")
    );

    const isDark = (() => {
        switch (colorScheme) {
            case "dark":
                return true;
            case "light":
                return false;
        }
    })();

    return {
        isDark,
        setIsDark
    };
}
