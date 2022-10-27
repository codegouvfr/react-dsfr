import { describe, it, expect } from "vitest";
import { spacing } from "../../../src/lib/spacing";

describe("Testing the replacer function", () => {
    it("with one argument", () => {
        const got = spacing("1v");

        const expected = "0.25rem";

        expect(got).toBe(expected);
    });

    it("Works with margin topBottom", () => {
        const got = spacing("margin", { "topBottom": "13w" });

        const expected = {
            "marginTop": "6.5rem",
            "marginBottom": "6.5rem"
        };

        expect(got).toStrictEqual(expected);
    });

    it("Works with margin topBottom and left", () => {
        const got = spacing("margin", { "topBottom": "13w", "left": 3 });

        const expected = {
            "marginTop": "6.5rem",
            "marginBottom": "6.5rem",
            "marginLeft": 3
        };

        expect(got).toStrictEqual(expected);
    });

    it("Works with margin topBottom overwriting bottom", () => {
        const got = spacing("margin", { "topBottom": "13w", "bottom": 3 });

        const expected = {
            "marginTop": "6.5rem",
            "marginBottom": 3
        };

        expect(got).toStrictEqual(expected);
    });

    it("Works with padding and rightLeft", () => {
        const got = spacing("padding", { "rightLeft": "1v" });

        const expected = {
            "paddingRight": "0.25rem",
            "paddingLeft": "0.25rem"
        };

        expect(got).toStrictEqual(expected);
    });
});
