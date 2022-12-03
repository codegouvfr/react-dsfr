import { createStatefulObservable, useRerenderOnChange } from "./tools/StatefulObservable";
import { createContext, useContext } from "react";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { assert } from "tsafe/assert";
import { isBrowser } from "./tools/isBrowser";

export type ColorScheme = "light" | "dark";

export const data_fr_theme = "data-fr-theme";
export const data_fr_scheme = "data-fr-scheme";
export const rootColorSchemeStyleTagId = "root-color-scheme";
//export const $colorScheme = createStatefulObservable<ColorScheme>(() => "light");
export const $isDark = createStatefulObservable(() => false);

type UseIsDark = () => {
    isDark: boolean;
    setIsDark: (isDark: boolean | "system") => void;
};

const useIsDarkClientSide: UseIsDark = () => {
    useRerenderOnChange($isDark);

    const setIsDark = useConstCallback((isDark: boolean | "system") =>
        document.documentElement.setAttribute(
            data_fr_scheme,
            ((): ColorScheme | "system" => {
                switch (isDark) {
                    case "system":
                        return "system";
                    case true:
                        return "dark";
                    case false:
                        return "light";
                }
            })()
        )
    );

    return { "isDark": $isDark.current, setIsDark };
};

export const isDarkContext = createContext<boolean | undefined>(undefined);

const useIsDarkServerSide: UseIsDark = () => {
    const setIsDark = useConstCallback(() => {
        /* nothing */
    });

    const isDark = useContext(isDarkContext);

    assert(isDark !== undefined, "color scheme context should be provided");

    return {
        isDark,
        setIsDark
    };
};

export const useIsDark = isBrowser ? useIsDarkClientSide : useIsDarkServerSide;

function getCurrentIsDarkFromHtmlAttribute(): boolean {
    const colorSchemeFromHtmlAttribute = document.documentElement.getAttribute(data_fr_theme);

    switch (colorSchemeFromHtmlAttribute) {
        case null:
        case "light":
            return false;
        case "dark":
            return true;
    }

    assert(false);
}

export const refDoPersistDarkModePreferenceWithCookie = { "current": false };

export function startObservingColorSchemeHtmlAttribute() {
    $isDark.current = getCurrentIsDarkFromHtmlAttribute();

    new MutationObserver(() => ($isDark.current = getCurrentIsDarkFromHtmlAttribute())).observe(
        document.documentElement,
        {
            "attributes": true,
            "attributeFilter": [data_fr_theme]
        }
    );

    {
        const setColorSchemeCookie = (isDark: boolean) => {
            if (!refDoPersistDarkModePreferenceWithCookie.current) {
                return;
            }

            const colorScheme: ColorScheme = isDark ? "dark" : "light";

            let newCookie = `${data_fr_theme}=${colorScheme};path=/;max-age=31536000;SameSite=Strict`;

            set_domain: {
                const { hostname } = window.location;

                //We do not set the domain if we are on localhost or an ip
                if (/(^localhost$)|(^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$)/.test(hostname)) {
                    break set_domain;
                }

                newCookie += `;domain=${hostname}`;
            }

            document.cookie = newCookie;
        };

        setColorSchemeCookie($isDark.current);

        $isDark.subscribe(setColorSchemeCookie);
    }

    //TODO:    <meta name="theme-color" content="#000091"><!-- Défini la couleur de thème du navigateur (Safari/Android) -->

    //TODO: Remove once https://github.com/GouvernementFR/dsfr/issues/407 is dealt with
    {
        const setRootColorScheme = (isDark: boolean) => {
            const colorScheme: ColorScheme = isDark ? "dark" : "light";

            remove_existing_element: {
                const element = document.getElementById(rootColorSchemeStyleTagId);

                if (element === null) {
                    break remove_existing_element;
                }

                element.remove();
            }

            const element = document.createElement("style");

            element.id = rootColorSchemeStyleTagId;

            element.innerHTML = `:root { color-scheme: ${colorScheme}; }`;

            document.getElementsByTagName("head")[0].appendChild(element);
        };

        setRootColorScheme($isDark.current);

        $isDark.subscribe(setRootColorScheme);
    }
}
