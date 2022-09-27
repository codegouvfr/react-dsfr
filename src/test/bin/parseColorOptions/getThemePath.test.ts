import { getThemePath } from "../../../bin/generate_theme/parseColorOptions";
import type { ParsedColorOptionName } from "../../../bin/generate_theme/parseColorOptions";
import { same } from "evt/tools/inDepth/same";
import { assert } from "tsafe/assert";

console.log(`Running test ${__filename}`);

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": true,
            "value": 111,
            "variant": undefined
        },
        "state": undefined
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "_111", "default"];

    assert(same(expected, got));

    console.log("PASS 1");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": true,
            "value": 111,
            "variant": undefined
        },
        "state": "hover"
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "_111", "hover"];

    assert(same(expected, got));

    console.log("PASS 2");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": true,
            "value": 111,
            "variant": "sun"
        },
        "state": undefined
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "sun111", "default"];

    assert(same(expected, got));

    console.log("PASS 3");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": true,
            "value": 111,
            "variant": "sun"
        },
        "state": "hover"
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "sun111", "hover"];

    assert(same(expected, got));

    console.log("PASS 4");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 111,
                "variant": undefined
            },
            "dark": {
                "value": 222,
                "variant": undefined
            }
        },
        "state": undefined
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "_111_222", "default"];

    assert(same(expected, got));

    console.log("PASS 5");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 111,
                "variant": undefined
            },
            "dark": {
                "value": 222,
                "variant": undefined
            }
        },
        "state": "hover"
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "_111_222", "hover"];

    assert(same(expected, got));

    console.log("PASS 6");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 111,
                "variant": "sun"
            },
            "dark": {
                "value": 222,
                "variant": undefined
            }
        },
        "state": undefined
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "sun111_222", "default"];

    assert(same(expected, got));

    console.log("PASS 7");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 111,
                "variant": "sun"
            },
            "dark": {
                "value": 222,
                "variant": undefined
            }
        },
        "state": "hover"
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "sun111_222", "hover"];

    assert(same(expected, got));

    console.log("PASS 8");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 111,
                "variant": undefined
            },
            "dark": {
                "value": 222,
                "variant": "moon"
            }
        },
        "state": undefined
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "_111moon222", "default"];

    assert(same(expected, got));

    console.log("PASS 9");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 111,
                "variant": undefined
            },
            "dark": {
                "value": 222,
                "variant": "moon"
            }
        },
        "state": "hover"
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "_111moon222", "hover"];

    assert(same(expected, got));

    console.log("PASS 10");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 111,
                "variant": "sun"
            },
            "dark": {
                "value": 222,
                "variant": "moon"
            }
        },
        "state": undefined
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "sun111moon222", "default"];

    assert(same(expected, got));

    console.log("PASS 11");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 111,
                "variant": "sun"
            },
            "dark": {
                "value": 222,
                "variant": "moon"
            }
        },
        "state": "hover"
    };

    const got = getThemePath(input);

    const expected = ["name1Name2", "sun111moon222", "hover"];

    assert(same(expected, got));

    console.log("PASS 12");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "grey",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 1000,
                "variant": undefined
            },
            "dark": {
                "value": 50,
                "variant": undefined
            }
        },
        "state": "hover"
    };

    const got = getThemePath(input);

    const expected = ["grey", "_1000_50", "hover"];

    assert(same(expected, got));

    console.log("PASS 13");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "blueFrance",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 113,
                "variant": "sun"
            },
            "dark": {
                "value": 625,
                "variant": undefined
            }
        },
        "state": undefined
    };

    const got = getThemePath(input);

    const expected = ["blueFrance", "sun113_625", "default"];

    assert(same(expected, got));

    console.log("PASS 14");
}
{
    const input: ParsedColorOptionName = {
        "colorName": "blueFrance",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 113,
                "variant": "sun"
            },
            "dark": {
                "value": 625,
                "variant": undefined
            }
        },
        "state": "active"
    };

    const got = getThemePath(input);

    const expected = ["blueFrance", "sun113_625", "active"];

    assert(same(expected, got));

    console.log("PASS 15");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "blueFrance",
        "brightness": {
            "isInvariant": true,
            "value": 525,
            "variant": "main"
        },
        "state": undefined
    };

    const got = getThemePath(input);

    const expected = ["blueFrance", "main525", "default"];

    assert(same(expected, got));

    console.log("PASS 16");
}

{
    const input: ParsedColorOptionName = {
        "colorName": "purpleGlycine",
        "brightness": {
            "isInvariant": false,
            "light": {
                "value": 319,
                "variant": "sun"
            },
            "dark": {
                "value": 630,
                "variant": "moon"
            }
        },
        "state": "hover"
    };

    const got = getThemePath(input);

    const expected = ["purpleGlycine", "sun319moon630", "hover"];

    assert(same(expected, got));

    console.log("PASS 17");
}
