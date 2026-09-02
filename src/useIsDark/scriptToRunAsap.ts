import type { ColorScheme } from "./client";
import { data_fr_scheme, data_fr_theme, rootColorSchemeStyleTagId } from "./constants";
import { fr } from "../fr";

type GetScriptToRunAsap = (props: {
    defaultColorScheme: ColorScheme | "system";
    nonce: string | undefined;
    trustedTypesPolicyName: string;
}) => string;

declare global {
    interface Window {
        ssrWasPerformedWithIsDark?: boolean;
        ssrNonce?: string;
    }
}

// TODO enhance to use DOMPurify with trustedTypes
export const getScriptToRunAsap: GetScriptToRunAsap = ({
    defaultColorScheme,
    nonce = "",
    trustedTypesPolicyName
}) => `
{

    window.ssrWasPerformedWithIsDark = "${defaultColorScheme}" === "dark";

    // Never throw when storage is blocked for the document (Chromium raises a SecurityError as
    // soon as window.localStorage is read). Behave as if the storage was empty instead.
    // See https://github.com/codegouvfr/react-dsfr/issues/442
    const safeLocalStorage = {
        getItem: key => {
            try {
                return localStorage.getItem(key);
            } catch {
                return null;
            }
        },
        setItem: (key, value) => {
            try {
                localStorage.setItem(key, value);
            } catch {}
        },
        removeItem: key => {
            try {
                localStorage.removeItem(key);
            } catch {}
        }
    };
	const sanitizer = typeof trustedTypes !== "undefined" ? trustedTypes.createPolicy("${trustedTypesPolicyName}-asap", { createHTML: s => s }) : {
		createHTML: s => s,
	};

    reset_persisted_value_if_website_config_changed: {
        const localStorageKey = "scheme-website-config-default";

        const localStorageValue = safeLocalStorage.getItem(localStorageKey);

        if (localStorageValue === "${defaultColorScheme}") {
            break reset_persisted_value_if_website_config_changed;
        }

        safeLocalStorage.removeItem("scheme");

        safeLocalStorage.setItem(localStorageKey, "${defaultColorScheme}");
    }
    
    const isDark = (() => {
    
    	const isDarkExplicitlyProvidedAsParameter = (() => {
    		if ("${defaultColorScheme}" === "system") {
    			return undefined;
    		}
    
    		switch ("${defaultColorScheme}") {
    			case "dark": return true;
    			case "light": return false;
    		}
    	})();
    
    	const isDarkFromLocalStorage = (() => {
    		const colorSchemeReadFromLocalStorage = safeLocalStorage.getItem("scheme");
    
    		if (colorSchemeReadFromLocalStorage === null) {
    			return undefined;
    		}
    
    		if (colorSchemeReadFromLocalStorage === "system") {
    			return undefined;
    		}
    
    		switch (colorSchemeReadFromLocalStorage) {
    			case "dark":
    				return true;
    			case "light":
    				return false;
    		}
    	})();
    
    	const isDarkFromOsPreference = (() => {
    		if (!window.matchMedia) {
    			return false;
    		}
    
    		return window.matchMedia("(prefers-color-scheme: dark)").matches;
    	})();
    
    	return (
    		isDarkFromLocalStorage ??
    		isDarkExplicitlyProvidedAsParameter ??
    		isDarkFromOsPreference
    	);
    
    })();

    const effect = ()=> {

        document.documentElement.setAttribute(
            "${data_fr_scheme}",
            (() => {
                const colorSchemeReadFromLocalStorage = safeLocalStorage.getItem("scheme");

                if (colorSchemeReadFromLocalStorage === null) {
                    return "${defaultColorScheme}";
                }

                return colorSchemeReadFromLocalStorage;
            })()
        );
        document.documentElement.setAttribute("${data_fr_theme}", isDark ? "dark" : "light")

        {

            let element= document.getElementById("${rootColorSchemeStyleTagId}");

    		if( element !== null ){
    			element.remove()
    		}

            element = document.createElement("style");

    		if ("${nonce}" !== "") {
    			element.setAttribute("nonce", "${nonce}");
    		}

            element.id = "${rootColorSchemeStyleTagId}";

            element.innerHTML = sanitizer.createHTML(\`:root { color-scheme: \${isDark ? "dark" : "light"}; }\`);

            document.head.appendChild(element);

        }

        {

            const name = "theme-color";

            let element = document.querySelector(\`meta[name=\${name}]\`);
    
    		if( element !== null ){
    			element.remove();
    		}

            element = document.createElement("meta");

            element.name = name;

            element.content = isDark ? "${
                fr.colors.getHex({ "isDark": true }).decisions.background.default.grey.default
            }" : "${
    fr.colors.getHex({ "isDark": false }).decisions.background.default.grey.default
}";

            document.head.appendChild(element);

        }

    };

    effect();

    // NOTE: This is just for global-error.tsx support
    {

        const observer = new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "${data_fr_scheme}"
            ) {
              const htmlEl = mutation.target;

              if (htmlEl.hasAttribute("data-fr-js")) {
                observer.disconnect(); 
              }

              if (!htmlEl.hasAttribute("${data_fr_scheme}")) {
                effect();
                observer.disconnect(); 
              }
            }
          }
        });

        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["${data_fr_scheme}"],
        });

    }

}
`;
