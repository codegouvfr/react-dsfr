import { assert, type Equals } from "tsafe/assert";
import { isAmong } from "tsafe/isAmong";
import { createStatefulObservable, useRerenderOnChange } from "../tools/StatefulObservable";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import { fr } from "../fr";
import { data_fr_scheme, data_fr_theme, rootColorSchemeStyleTagId } from "./constants";

export type ColorScheme = "light" | "dark";

const $clientSideIsDark = createStatefulObservable<boolean>(() => {
    if (typeof process === "object" && process.env.JEST_WORKER_ID !== undefined) {
        return false;
    }

    throw new Error(
        [
            "react-dsfr not initialized.",
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

export function getIsDarkClientSide() {
    return $isAfterFirstEffect.current ? $clientSideIsDark.current : ssrWasPerformedWithIsDark;
}

function getSystemColorScheme() {
    return typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

export const useIsDarkClientSide: UseIsDark = () => {
    useRerenderOnChange($clientSideIsDark);
    useRerenderOnChange($isAfterFirstEffect);

    const isDark = $isAfterFirstEffect.current
        ? $clientSideIsDark.current
        : ssrWasPerformedWithIsDark;

    const setIsDark = useConstCallback<ReturnType<UseIsDark>["setIsDark"]>(
        newIsDarkOrDeduceNewIsDarkFromCurrentIsDark => {
            const data_fr_js_value = document.documentElement.getAttribute("data-fr-js");

            const newColorScheme = ((): ColorScheme | "system" => {
                switch (
                    typeof newIsDarkOrDeduceNewIsDarkFromCurrentIsDark === "function"
                        ? newIsDarkOrDeduceNewIsDarkFromCurrentIsDark(isDark)
                        : newIsDarkOrDeduceNewIsDarkFromCurrentIsDark
                ) {
                    case "system":
                        return "system";
                    case true:
                        return "dark";
                    case false:
                        return "light";
                }
            })();

            document.documentElement.setAttribute(data_fr_scheme, newColorScheme);

            if (data_fr_js_value !== "true") {
                //NOTE: DSFR not started yet.
                document.documentElement.setAttribute(
                    data_fr_theme,
                    newColorScheme === "system" ? getSystemColorScheme() : newColorScheme
                );
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

    assert(false, `Unrecognized ${data_fr_theme} attribute value: ${colorSchemeFromHtmlAttribute}`);
}

export function startClientSideIsDarkLogic(params: {
    registerEffectAction: (action: () => void) => void;
    doPersistDarkModePreferenceWithCookie: boolean;
    colorSchemeExplicitlyProvidedAsParameter: ColorScheme | "system";
    doCheckNonce: boolean;
    trustedTypesPolicyName: string;
}) {
    const {
        doPersistDarkModePreferenceWithCookie,
        registerEffectAction,
        colorSchemeExplicitlyProvidedAsParameter,
        doCheckNonce = false,
        trustedTypesPolicyName
    } = params;

    reset_persisted_value_if_website_config_changed: {
        const localStorageKey = "scheme-website-config-default";

        const localStorageValue = localStorage.getItem(localStorageKey);

        if (localStorageValue === colorSchemeExplicitlyProvidedAsParameter) {
            break reset_persisted_value_if_website_config_changed;
        }

        localStorage.removeItem("scheme");

        localStorage.setItem(localStorageKey, colorSchemeExplicitlyProvidedAsParameter);
    }

    const { clientSideIsDark, ssrWasPerformedWithIsDark: ssrWasPerformedWithIsDark_ } = ((): {
        clientSideIsDark: boolean;
        ssrWasPerformedWithIsDark: boolean;
    } => {
        const isDarkFromHtmlAttribute = getCurrentIsDarkFromHtmlAttribute();

        if (isDarkFromHtmlAttribute !== undefined) {
            return {
                "clientSideIsDark": isDarkFromHtmlAttribute,
                "ssrWasPerformedWithIsDark":
                    window.ssrWasPerformedWithIsDark ?? isDarkFromHtmlAttribute
            };
        }

        const isDarkExplicitlyProvidedAsParameter = (() => {
            if (colorSchemeExplicitlyProvidedAsParameter === "system") {
                return undefined;
            }

            switch (colorSchemeExplicitlyProvidedAsParameter) {
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

            assert(
                isAmong<ColorScheme | "system">(
                    ["dark", "light", "system"],
                    colorSchemeReadFromLocalStorage
                )
            );

            if (colorSchemeReadFromLocalStorage === "system") {
                return undefined;
            }

            switch (colorSchemeReadFromLocalStorage) {
                case "dark":
                    return true;
                case "light":
                    return false;
            }

            assert<Equals<typeof colorSchemeReadFromLocalStorage, never>>;
        })();

        const isDarkFromOsPreference = getSystemColorScheme() === "dark";

        return {
            "ssrWasPerformedWithIsDark": isDarkExplicitlyProvidedAsParameter ?? false,
            "clientSideIsDark":
                isDarkFromLocalStorage ??
                isDarkExplicitlyProvidedAsParameter ??
                isDarkFromOsPreference
        };
    })();

    ssrWasPerformedWithIsDark = ssrWasPerformedWithIsDark_;

    const trustedTypes = (window as any).trustedTypes;
    const sanitizer =
        typeof trustedTypes !== "undefined"
            ? trustedTypes.createPolicy(trustedTypesPolicyName, { createHTML: (s: string) => s })
            : {
                  createHTML: (s: string) => s
              };

    $clientSideIsDark.current = clientSideIsDark;

    document.documentElement.setAttribute(
        data_fr_scheme,
        ((): ColorScheme | "system" => {
            const colorSchemeReadFromLocalStorage = localStorage.getItem("scheme");

            if (colorSchemeReadFromLocalStorage === null) {
                return colorSchemeExplicitlyProvidedAsParameter;
            }

            assert(
                isAmong<ColorScheme | "system">(
                    ["dark", "light", "system"],
                    colorSchemeReadFromLocalStorage
                )
            );

            return colorSchemeReadFromLocalStorage;
        })()
    );
    document.documentElement.setAttribute(data_fr_theme, clientSideIsDark ? "dark" : "light");

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
            const nonce = window.ssrNonce;
            if (doCheckNonce && !nonce) {
                return;
            }
            document.getElementById(rootColorSchemeStyleTagId)?.remove();

            const element = document.createElement("style");

            element.id = rootColorSchemeStyleTagId;

            if (nonce) {
                element.setAttribute("nonce", nonce);
            }

            element.innerHTML = sanitizer.createHTML(
                `:root { color-scheme: ${isDark ? "dark" : "light"}; }`
            );

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

            element.content = fr.colors.getHex({
                isDark
            }).decisions.background.default.grey.default;

            document.head.appendChild(element);
        };

        setThemeColor($clientSideIsDark.current);

        $clientSideIsDark.subscribe(setThemeColor);
    }

    registerEffectAction(() => ($isAfterFirstEffect.current = true));
}
