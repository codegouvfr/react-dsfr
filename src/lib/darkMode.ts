import { isBrowser } from "./tools/isBrowser";
import { assert } from "tsafe/assert";
import { createStatefulObservable, useRerenderOnChange } from "./tools/StatefulObservable";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { createContext, useContext } from "react";
import { memoize } from "./tools/memoize";
import { getColors } from "./colors";

export type ColorScheme = "light" | "dark";

export const data_fr_theme = "data-fr-theme";
export const data_fr_scheme = "data-fr-scheme";
export const rootColorSchemeStyleTagId = "dsfr-root-color-scheme";

const $clientSideIsDark = createStatefulObservable<boolean>(() => {
    throw new Error("not initialized yet");
});

export const getClientSideIsDark = memoize(() => $clientSideIsDark.current);

type UseIsDark = () => {
    isDark: boolean;
    setIsDark: (isDark: boolean | "system") => void;
};

const $isAfterFirstEffect = createStatefulObservable(() => false);

const useIsDarkClientSide: UseIsDark = () => {
    useRerenderOnChange($clientSideIsDark);
    useRerenderOnChange($isAfterFirstEffect);

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

    return {
        "isDark": $isAfterFirstEffect.current
            ? $clientSideIsDark.current
            : ssrWasPerformedWithIsDark,
        setIsDark
    };
};

const ssrIsDarkContext = createContext<boolean | undefined>(undefined);

export const { Provider: SsrIsDarkProvider } = ssrIsDarkContext;

const useIsDarkServerSide: UseIsDark = () => {
    const setIsDark = useConstCallback(() => {
        /* nothing */
    });

    const isDark = useContext(ssrIsDarkContext);

    assert(isDark !== undefined, "Not within provider");

    return {
        isDark,
        setIsDark
    };
};

export const useIsDark = isBrowser ? useIsDarkClientSide : useIsDarkServerSide;

let ssrWasPerformedWithIsDark: boolean;

function getCurrentIsDarkFromHtmlAttribute(): boolean | undefined {
    const colorSchemeFromHtmlAttribute = document.documentElement.getAttribute(data_fr_theme);

    switch (colorSchemeFromHtmlAttribute) {
        case null:
            return undefined;
        case "light":
            return false;
        case "dark":
            return true;
    }

    assert(false);
}

export function startClientSideIsDarkLogic(params: {
    registerEffectAction: (action: () => void) => void;
    doPersistDarkModePreferenceWithCookie: boolean;
    colorSchemeExplicitlyProvidedAsParameter: ColorScheme | "system";
}) {
    const {
        doPersistDarkModePreferenceWithCookie,
        registerEffectAction,
        colorSchemeExplicitlyProvidedAsParameter
    } = params;

    const { clientSideIsDark, ssrWasPerformedWithIsDark: ssrWasPerformedWithIsDark_ } = ((): {
        clientSideIsDark: boolean;
        ssrWasPerformedWithIsDark: boolean;
    } => {
        const isDarkFromHtmlAttribute = getCurrentIsDarkFromHtmlAttribute();

        if (isDarkFromHtmlAttribute !== undefined) {
            return {
                "clientSideIsDark": isDarkFromHtmlAttribute,
                "ssrWasPerformedWithIsDark": isDarkFromHtmlAttribute
            };
        }

        const isDarkExplicitlyProvidedAsParameter = (() => {
            if (colorSchemeExplicitlyProvidedAsParameter === "system") {
                return undefined;
            }

            switch (colorSchemeExplicitlyProvidedAsParameter as ColorScheme) {
                case "dark":
                    return true;
                case "light":
                    return false;
            }
        })();

        const isDarkFromLocalStorage = (() => {
            const colorSchemeReadFromLocalStorage = localStorage.getItem("scheme");

            if (colorSchemeReadFromLocalStorage === null) {
                return undefined;
            }

            if (colorSchemeReadFromLocalStorage === "system") {
                return undefined;
            }

            switch (colorSchemeExplicitlyProvidedAsParameter as ColorScheme) {
                case "dark":
                    return true;
                case "light":
                    return false;
            }
        })();

        const isDarkFromOsPreference = (() => {
            if (!window.matchMedia) {
                return undefined;
            }

            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        })();

        const isDarkFallback = false;

        return {
            "ssrWasPerformedWithIsDark": isDarkExplicitlyProvidedAsParameter ?? isDarkFallback,
            "clientSideIsDark":
                isDarkFromLocalStorage ??
                isDarkExplicitlyProvidedAsParameter ??
                isDarkFromOsPreference ??
                isDarkFallback
        };
    })();

    ssrWasPerformedWithIsDark = ssrWasPerformedWithIsDark_;

    $clientSideIsDark.current = clientSideIsDark;

    registerEffectAction(() => ($isAfterFirstEffect.current = true));

    [data_fr_scheme, data_fr_theme].forEach(attr =>
        document.documentElement.setAttribute(attr, clientSideIsDark ? "dark" : "light")
    );

    new MutationObserver(() => {
        const isDarkFromHtmlAttribute = getCurrentIsDarkFromHtmlAttribute();

        assert(isDarkFromHtmlAttribute !== undefined);

        $clientSideIsDark.current = isDarkFromHtmlAttribute;
    }).observe(document.documentElement, {
        "attributes": true,
        "attributeFilter": [data_fr_theme]
    });

    {
        const setColorSchemeCookie = (isDark: boolean) => {
            if (!doPersistDarkModePreferenceWithCookie) {
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

        setColorSchemeCookie($clientSideIsDark.current);

        $clientSideIsDark.subscribe(setColorSchemeCookie);
    }

    {
        const setRootColorScheme = (isDark: boolean) => {
            document.getElementById(rootColorSchemeStyleTagId)?.remove();

            document.head.insertAdjacentHTML(
                "afterend",
                `<style id="${rootColorSchemeStyleTagId}">:root { color-scheme: ${
                    isDark ? "dark" : "light"
                }; }</style>`
            );
        };

        setRootColorScheme($clientSideIsDark.current);

        $clientSideIsDark.subscribe(setRootColorScheme);
    }

    {
        const setThemeColor = (isDark: boolean) => {
            document.querySelector("meta[name=theme-color]")?.remove();

            document.head.insertAdjacentHTML(
                "afterend",
                `<meta name="theme-color" content="${
                    getColors(isDark).decisions.background.default.grey.default
                }">`
            );
        };

        setThemeColor($clientSideIsDark.current);

        $clientSideIsDark.subscribe(setThemeColor);
    }
}
