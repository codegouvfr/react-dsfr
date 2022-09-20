
import { createStatefulObservable, useRerenderOnChange } from "./tools/StatefulObservable";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { assert } from "tsafe/assert";

const isBrowser = typeof window !== "undefined";

export type ColorScheme = "light" | "dark";

const attributeQualifiedName = "data-fr-theme";

export const $colorScheme = createStatefulObservable<ColorScheme>(
    getCurrentColorSchemeFromHtmlAttribute
);

if (isBrowser) {
    new MutationObserver(() => {
        console.log("update!");
        $colorScheme.current = getCurrentColorSchemeFromHtmlAttribute();
    }).observe(document.documentElement, {
        "attributes": true,
        "attributeFilter": [attributeQualifiedName]
    });
}

export const useColorScheme: () => {
    colorScheme: ColorScheme;
    setColorScheme: (colorSchemeOrSystem: ColorScheme | "system") => void;
} = !isBrowser
    ? //TODO: Provide alternate implementation that would play nice with Next.js SSR
      () => ({
          "colorScheme": "light",
          "setColorScheme": () => {
              /*nothing*/
          }
      })
    : () => {
          useRerenderOnChange($colorScheme);

          const setColorScheme = useConstCallback((colorSchemeOrSystem: ColorScheme | "system") =>
              document.documentElement.setAttribute("data-fr-scheme", colorSchemeOrSystem)
          );

          return { "colorScheme": $colorScheme.current, setColorScheme };
      };

function getCurrentColorSchemeFromHtmlAttribute(): ColorScheme {
    if (!isBrowser) {
        return "light";
    }

    const colorSchemeReadFromDom = document.documentElement.getAttribute(attributeQualifiedName);

    switch (colorSchemeReadFromDom) {
        case "light":
        case "dark":
            return colorSchemeReadFromDom;
    }

    assert(false);
}

if (isBrowser) {
    $colorScheme.subscribe(colorScheme => {
        //TODO: Submit an issue on gouvfr/dsfr, this should be their responsibility.
        {
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
        }
    });

	console.log("init by calling", $colorScheme.current);

}
