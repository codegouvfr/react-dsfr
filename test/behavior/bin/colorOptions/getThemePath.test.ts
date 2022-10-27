import { describe, it, expect } from "vitest";
import { getThemePath } from "../../../../src/bin/css_to_ts/colorOptions";
import type { ParsedColorOptionName } from "../../../../src/bin/css_to_ts/colorOptions";

describe("", () => {
    it("test 1", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 2", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 3", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 4", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 5", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 6", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 7", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 8", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 9", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 10", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 11", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 12", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 13", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 14", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 15", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 16", () => {
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

        expect(got).toStrictEqual(expected);
    });

    it("test 17", () => {
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

        expect(got).toStrictEqual(expected);
    });
});
