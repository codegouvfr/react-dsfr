import { assert } from "tsafe/assert";
import { createStatefulObservable, useRerenderOnChange } from "../tools/StatefulObservable";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import { getColors } from "../fr/colors";
import { data_fr_scheme, data_fr_theme, rootColorSchemeStyleTagId } from "./constants";

export type ColorScheme = "light" | "dark";

const $clientSideIsDark = createStatefulObservable<boolean>(() => {
    throw new Error(
        [
            "react-dsfr not initialized",
            "Refer to the documentation for setup instructions",
            "If it used to work but after an update you're getting this error",
            "it usually means that you have multiple copies of @codegouvfr/react-dsfr in your node_modules",
            "@codegouvfr/react-dsfr is a singleton, try removing your lock file and node_module."
        ].join(" ")
    );
});

export type UseIsDark = () => {
    isDark: boolean;
    setIsDark: (
        isDark: boolean | "system" | ((currentIsDark: boolean) => boolean | "system")
    ) => void;
};

const $isAfterFirstEffect = createStatefulObservable(() => false);

export const useIsDarkClientSide: UseIsDark = () => {
    useRerenderOnChange($clientSideIsDark);
    useRerenderOnChange($isAfterFirstEffect);

    const isDark = $isAfterFirstEffect.current
        ? $clientSideIsDark.current
        : ssrWasPerformedWithIsDark;

    const setIsDark = useConstCallback<ReturnType<UseIsDark>["setIsDark"]>(
        newIsDarkOrDeduceNewIsDarkFromCurrentIsDark => {
            const data_fr_js_value = document.documentElement.getAttribute("data-fr-js");

            const newColorScheme = ((): ColorScheme => {
                switch (
                    typeof newIsDarkOrDeduceNewIsDarkFromCurrentIsDark === "function"
                        ? newIsDarkOrDeduceNewIsDarkFromCurrentIsDark(isDark)
                        : newIsDarkOrDeduceNewIsDarkFromCurrentIsDark
                ) {
                    case "system":
                        return typeof window.matchMedia === "function" &&
                            window.matchMedia("(prefers-color-scheme: dark)").matches
                            ? "dark"
                            : "light";
                    case true:
                        return "dark";
                    case false:
                        return "light";
                }
            })();

            document.documentElement.setAttribute(data_fr_scheme, newColorScheme);

            if (data_fr_js_value !== "true") {
                //NOTE: DSFR not started yet.
                document.documentElement.setAttribute(data_fr_theme, newColorScheme);
                localStorage.setItem("scheme", newColorScheme);
            }
        }
    );

    return {
        isDark,
        setIsDark
    };
};

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
                "ssrWasPerformedWithIsDark":
                    ((window as any).ssrWasPerformedWithIsDark as boolean | undefined) ??
                    isDarkFromHtmlAttribute
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

            switch (colorSchemeReadFromLocalStorage as ColorScheme) {
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

            const element = document.createElement("style");

            element.id = rootColorSchemeStyleTagId;

            element.innerHTML = `:root { color-scheme: ${isDark ? "dark" : "light"}; }`;

            document.head.appendChild(element);
        };

        setRootColorScheme($clientSideIsDark.current);

        $clientSideIsDark.subscribe(setRootColorScheme);
    }

    {
        const setThemeColor = (isDark: boolean) => {
            const name = "theme-color";

            document.querySelector(`meta[name=${name}]`)?.remove();

            const element = document.createElement("meta");

            element.name = name;

            element.content = getColors(isDark).decisions.background.default.grey.default;

            document.head.appendChild(element);
        };

        setThemeColor($clientSideIsDark.current);

        $clientSideIsDark.subscribe(setThemeColor);
    }

    registerEffectAction(() => ($isAfterFirstEffect.current = true));
}
