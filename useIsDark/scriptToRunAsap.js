import { data_fr_scheme, data_fr_theme, rootColorSchemeStyleTagId } from "./constants";
import { fr } from "../fr";
// TODO enhance to use DOMPurify with trustedTypes
export const getScriptToRunAsap = ({ defaultColorScheme, nonce = "", trustedTypesPolicyName }) => `
{

    window.ssrWasPerformedWithIsDark = "${defaultColorScheme}" === "dark";
	const sanitizer = typeof trustedTypes !== "undefined" ? trustedTypes.createPolicy("${trustedTypesPolicyName}-asap", { createHTML: s => s }) : {
		createHTML: s => s,
	};

    reset_persisted_value_if_website_config_changed: {
        const localStorageKey = "scheme-website-config-default";

        const localStorageValue = localStorage.getItem(localStorageKey);

        if (localStorageValue === "${defaultColorScheme}") {
            break reset_persisted_value_if_website_config_changed;
        }

        localStorage.removeItem("scheme");

        localStorage.setItem(localStorageKey, "${defaultColorScheme}");
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
    		const colorSchemeReadFromLocalStorage = localStorage.getItem("scheme");
    
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

    document.documentElement.setAttribute(
        "${data_fr_scheme}",
        (() => {
            const colorSchemeReadFromLocalStorage = localStorage.getItem("scheme");

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

        element.content = isDark ? "${fr.colors.getHex({ "isDark": true }).decisions.background.default.grey.default}" : "${fr.colors.getHex({ "isDark": false }).decisions.background.default.grey.default}";

        document.head.appendChild(element);

    }

}
`;
//# sourceMappingURL=scriptToRunAsap.js.map