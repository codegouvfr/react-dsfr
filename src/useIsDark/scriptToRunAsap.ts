import type { ColorScheme } from "./client";
import { data_fr_scheme, data_fr_theme, rootColorSchemeStyleTagId } from "./constants";
import { getColors } from "../fr/colors";

export const getScriptToRunAsap = (defaultColorScheme: ColorScheme | "system") => `
{

    window.ssrWasPerformedWithIsDark = "${defaultColorScheme}" === "dark";
    
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

        const element = document.createElement("style");

        element.id = "${rootColorSchemeStyleTagId}";

        element.innerHTML = \`:root { color-scheme: \${isDark ? "dark" : "light"}; }\`;

        document.head.appendChild(element);

    }

    {

        const element = document.createElement("meta");

        element.name = "theme-color";

        element.content = isDark ? "${
            getColors(true).decisions.background.default.grey.default
        }" : "${getColors(false).decisions.background.default.grey.default}";

        document.head.appendChild(element);

    }

}
`;
