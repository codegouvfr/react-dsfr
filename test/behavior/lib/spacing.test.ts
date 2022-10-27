import { describe, it, expect } from "vitest";
import { spacing } from "../../../src/lib/spacing";

describe("Testing the replacer function", () => {
    it("with one argument", () => {
        const got = spacing("1v");

        const expected = "0.25rem";

        expect(got).toBe(expected);
    });
});
