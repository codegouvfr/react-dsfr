import { createGetCssVariable } from "../../bin/css_to_ts/cssVariable";
import type { CssVariableValue } from "../../bin/css_to_ts/cssVariable";
import { same } from "evt/tools/inDepth";
import { assert } from "tsafe/assert";

const rawCssCode = `
:root {
	--my-var: #ffffff;
	--my-var-2: #ffffff;
	--my-var-3: #ffffff;
	--my-var-4: #ffffff;
}

:root:where([data-fr-theme="dark"]) {
	--my-var-2: #000000;
}


@media (min-width: 36em) { }

@media (min-width: 48em) { 

    :root:where([data-fr-theme="dark"]) {
        --my-var-4: #000000;
    }

}

@media (min-width: 78em) { 
	--my-var-3: #000001;
}

@media (min-width: 62em) { }
`;

const { getCssVariable } = createGetCssVariable(rawCssCode);

{
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

    const got = getCssVariable("--my-var");

    assert(same(got, expected));
}

{
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

    const got = getCssVariable("--my-var-2");

    assert(same(got, expected));
}

{
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

    const got = getCssVariable("--my-var-3");

    assert(same(got, expected));
}

{
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

    const got = getCssVariable("--my-var-4");

    assert(same(got, expected));
}
