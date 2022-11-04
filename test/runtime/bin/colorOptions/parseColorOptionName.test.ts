import { describe, it, expect } from "vitest";
import { parseColorOptionName } from "../../../../src/bin/css_to_ts/colorOptions";
import type { ParsedColorOptionName } from "../../../../src/bin/css_to_ts/colorOptions";

describe("Successfully parse color option names", () => {
    it("test 1", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 2", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 3", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 4", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 5", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 6", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 7", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 8", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 9", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 10", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 11", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 12", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 13", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 14", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 15", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 16", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 17", () => {
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

        expect(got).toStrictEqual(expected);
    });
});
