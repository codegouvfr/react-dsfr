import { describe, it, expect } from "vitest";
import {
    createGetCssVariable,
    isInvariantAcrossTheme,
    isInvariantAcrossScreenSizes
} from "../../../scripts/build/cssToTs/cssVariable";
import type { CssVariableValue } from "../../../scripts/build/cssToTs/cssVariable";
import { assert } from "tsafe/assert";

const rawCssCode = `
:root {
	--my-var: #ffffff;
	--my-var-2: #ffffff;
	--my-var-3: #ffffff;
	--my-var-4: #ffffff;
}

:root[data-fr-theme=dark] {
	--my-var-2: #000000;
}


@media (min-width: 36em) { }

@media (min-width: 48em) { 

    :root[data-fr-theme=dark] {
        --my-var-4: #000000;
    }

}
@media (min-width: 62em) { 
    :root {
        --my-var-3: #000001;
    }
}

@media (min-width: 78em) { }

`;

describe("Resolution of CSS variables", () => {
    const { getCssVariable } = createGetCssVariable(rawCssCode);

    it("parses an invariable variable", () => {
        const expected: CssVariableValue = {
            "root": {
                "light": "#ffffff",
                "dark": "#ffffff"
            },
            "sm": {
                "light": "#ffffff",
                "dark": "#ffffff"
            },
            "md": {
                "light": "#ffffff",
                "dark": "#ffffff"
            },
            "lg": {
                "light": "#ffffff",
                "dark": "#ffffff"
            },
            "xl": {
                "light": "#ffffff",
                "dark": "#ffffff"
            }
        };

        assert(isInvariantAcrossScreenSizes(expected));
        assert(isInvariantAcrossTheme(expected));

        const got = getCssVariable("--my-var");

        expect(got).toStrictEqual(expected);
    });

    it("works when different values depending of the color scheme", () => {
        const expected: CssVariableValue = {
            "root": {
                "light": "#ffffff",
                "dark": "#000000"
            },
            "sm": {
                "light": "#ffffff",
                "dark": "#000000"
            },
            "md": {
                "light": "#ffffff",
                "dark": "#000000"
            },
            "lg": {
                "light": "#ffffff",
                "dark": "#000000"
            },
            "xl": {
                "light": "#ffffff",
                "dark": "#000000"
            }
        };

        assert(isInvariantAcrossScreenSizes(expected));
        assert(!isInvariantAcrossTheme(expected));

        const got = getCssVariable("--my-var-2");

        expect(got).toStrictEqual(expected);
    });

    it("works when the values change on different screen sizes", () => {
        const expected: CssVariableValue = {
            "root": {
                "light": "#ffffff",
                "dark": "#ffffff"
            },
            "sm": {
                "light": "#ffffff",
                "dark": "#ffffff"
            },
            "md": {
                "light": "#ffffff",
                "dark": "#ffffff"
            },
            "lg": {
                "light": "#000001",
                "dark": "#000001"
            },
            "xl": {
                "light": "#000001",
                "dark": "#000001"
            }
        };

        assert(!isInvariantAcrossScreenSizes(expected));
        assert(isInvariantAcrossTheme(expected));

        const got = getCssVariable("--my-var-3");

        expect(got).toStrictEqual(expected);
    });

    it("It works when depends of color scheme and screen size", () => {
        const expected: CssVariableValue = {
            "root": {
                "light": "#ffffff",
                "dark": "#ffffff"
            },
            "sm": {
                "light": "#ffffff",
                "dark": "#ffffff"
            },
            "md": {
                "light": "#ffffff",
                "dark": "#000000"
            },
            "lg": {
                "light": "#ffffff",
                "dark": "#000000"
            },
            "xl": {
                "light": "#ffffff",
                "dark": "#000000"
            }
        };

        assert(!isInvariantAcrossScreenSizes(expected));
        assert(!isInvariantAcrossTheme(expected));

        const got = getCssVariable("--my-var-4");

        expect(got).toStrictEqual(expected);
    });
});
