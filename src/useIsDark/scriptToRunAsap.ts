import type { ColorScheme } from "./client";
import { data_fr_scheme, data_fr_theme, rootColorSchemeStyleTagId } from "./constants";
import { fr } from "../fr";

type GetScriptToRunAsap = (props: {
    defaultColorScheme: ColorScheme | "system";
    nonce?: string;
    trustedTypesPolicyName?: string;
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
    nonce,
    trustedTypesPolicyName = "react-dsfr"
}) => `
{

    window.ssrWasPerformedWithIsDark = "${defaultColorScheme}" === "dark";
	const sanitizer = typeof trustedTypes !== "undefined" ? trustedTypes.createPolicy("${trustedTypesPolicyName}-asap", { createHTML: s => s }) : {
		createHTML: s => s,
	};
    
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
    			return undefined;
    		}
    
    		return window.matchMedia("(prefers-color-scheme: dark)").matches;
    	})();
    
    	const isDarkFallback = false;
    
    	return (
    		isDarkFromLocalStorage ??
    		isDarkExplicitlyProvidedAsParameter ??
    		isDarkFromOsPreference ??
    		isDarkFallback
    	);
    
    })();
    
    ["${data_fr_scheme}", "${data_fr_theme}"].forEach(attr => document.documentElement.setAttribute(attr, isDark ? "dark" : "light"));

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
        }" : "${fr.colors.getHex({ "isDark": false }).decisions.background.default.grey.default}";

        document.head.appendChild(element);

    }

}
`;
