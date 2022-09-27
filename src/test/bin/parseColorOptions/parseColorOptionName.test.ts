import { parseColorOptionName } from "../../../bin/generate_theme/parseColorOptions";
import type { ParsedColorOptionName } from "../../../bin/generate_theme/parseColorOptions";
import { same } from "evt/tools/inDepth/same";
import { assert } from "tsafe/assert";

{
    const expected: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": true,
            "value": 111,
            "variant": undefined
        },
        "state": undefined
    };

    const got = parseColorOptionName("--name1-name2-111");

    assert(same(expected, got));

    console.log("PASS 1");
}

{
    const expected: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": true,
            "value": 111,
            "variant": undefined
        },
        "state": "hover"
    };

    const got = parseColorOptionName("--name1-name2-111-hover");

    assert(same(expected, got));

    console.log("PASS 2");
}

{
    const expected: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": true,
            "value": 111,
            "variant": "sun"
        },
        "state": undefined
    };

    const got = parseColorOptionName("--name1-name2-sun-111");

    assert(same(expected, got));

    console.log("PASS 3");
}

{
    const expected: ParsedColorOptionName = {
        "colorName": "name1Name2",
        "brightness": {
            "isInvariant": true,
            "value": 111,
            "variant": "sun"
        },
        "state": "hover"
    };

    const got = parseColorOptionName("--name1-name2-sun-111-hover");

    assert(same(expected, got));

    console.log("PASS 4");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--name1-name2-111-222");

    assert(same(expected, got));

    console.log("PASS 5");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--name1-name2-111-222-hover");

    assert(same(expected, got));

    console.log("PASS 6");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--name1-name2-sun-111-222");

    assert(same(expected, got));

    console.log("PASS 7");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--name1-name2-sun-111-222-hover");

    assert(same(expected, got));

    console.log("PASS 8");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--name1-name2-111-moon-222");

    assert(same(expected, got));

    console.log("PASS 9");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--name1-name2-111-moon-222-hover");

    assert(same(expected, got));

    console.log("PASS 10");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--name1-name2-sun-111-moon-222");

    assert(same(expected, got));

    console.log("PASS 11");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--name1-name2-sun-111-moon-222-hover");

    assert(same(expected, got));

    console.log("PASS 12");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--grey-1000-50-hover");

    assert(same(expected, got));

    console.log("PASS 13");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--blue-france-sun-113-625");

    assert(same(expected, got));

    console.log("PASS 14");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--blue-france-sun-113-625-active");

    assert(same(expected, got));

    console.log("PASS 15");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--blue-france-sun-113-625-active");

    assert(same(expected, got));

    console.log("PASS 16");
}

{
    const expected: ParsedColorOptionName = {
        "colorName": "blueFrance",
        "brightness": {
            "isInvariant": true,
            "value": 525,
            "variant": "main"
        },
        "state": undefined
    };

    const got = parseColorOptionName("--blue-france-main-525");

    assert(same(expected, got));

    console.log("PASS 17");
}

{
    const expected: ParsedColorOptionName = {
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

    const got = parseColorOptionName("--purple-glycine-sun-319-moon-630-hover");

    assert(same(expected, got));

    console.log("PASS 18");
}
