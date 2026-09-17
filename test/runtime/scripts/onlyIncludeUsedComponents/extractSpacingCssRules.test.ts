import { it, expect, describe } from "vitest";
import { extractSpacingCssRules } from "../../../../src/bin/trimSpacingUtilities";

// The rules that must NOT be extracted come first: extracting a rule that is not
// purely made of spacing utility selectors would remove CSS that something else needs.
describe("extractSpacingCssRules, rules that must never be extracted", () => {
    it("never extracts a rule mixing a spacing selector with another selector", () => {
        expect(
            extractSpacingCssRules({
                "rawCssCode": ".fr-mt-2v,.fr-header{margin-top:.5rem}"
            })
        ).toStrictEqual([]);
    });

    it("never extracts a descendant or compound selector containing a spacing class", () => {
        for (const rawCssCode of [
            ".foo .fr-mt-2v{margin-top:.5rem}",
            ".fr-mt-2v .foo{margin-top:.5rem}",
            ".fr-mt-2v.fr-header{margin-top:.5rem}",
            ".fr-mt-2v>p{margin-top:.5rem}",
            "[dir=rtl] .fr-mt-2v{margin-top:.5rem}"
        ]) {
            expect(extractSpacingCssRules({ rawCssCode })).toStrictEqual([]);
        }
    });

    it("never extracts classes that merely look like spacing utilities", () => {
        for (const rawCssCode of [
            ".fr-menu{top:0}",
            ".fr-modal{top:0}",
            ".fr-message{top:0}",
            ".fr-mt-2vfoo{top:0}",
            ".fr-mt-2v-legacy{top:0}",
            ".fr-mt-lg-2v{top:0}", // unknown breakpoint, not part of the grammar
            ".fr-mt-{top:0}"
        ]) {
            expect(extractSpacingCssRules({ rawCssCode })).toStrictEqual([]);
        }
    });

    it("never extracts a rule whose selector list contains a comment (unprovable, kept)", () => {
        expect(
            extractSpacingCssRules({
                "rawCssCode": ".fr-mt-2v/* comment */,.fr-my-2v{margin-top:.5rem}"
            })
        ).toStrictEqual([]);
    });

    it("is not confused by braces inside strings", () => {
        const rawCssCode = '.foo{content:"}"}.bar .fr-mt-2v{margin-top:.5rem}';

        expect(extractSpacingCssRules({ "rawCssCode": rawCssCode })).toStrictEqual([]);
    });
});

describe("extractSpacingCssRules, extraction", () => {
    it("extracts a single selector rule with exact offsets", () => {
        const rawCssCode = '@charset "UTF-8";.fr-mt-2v{margin-top:.5rem!important}';

        const rules = extractSpacingCssRules({ rawCssCode });

        expect(rules.length).toBe(1);
        expect(rules[0].ruleText).toBe(".fr-mt-2v{margin-top:.5rem!important}");
        expect(rules[0].tokens).toStrictEqual(["fr-mt-2v"]);
        expect(rawCssCode.slice(rules[0].start, rules[0].end)).toBe(rules[0].ruleText);
    });

    it("extracts grouped selectors as one rule carrying every token", () => {
        const rules = extractSpacingCssRules({
            "rawCssCode": ".fr-ml-1v,.fr-mx-1v{margin-left:.25rem!important}"
        });

        expect(rules.length).toBe(1);
        expect(rules[0].tokens).toStrictEqual(["fr-ml-1v", "fr-mx-1v"]);
    });

    it("extracts rules inside a media query, not the media block itself", () => {
        const rawCssCode =
            ".before{color:red}@media (min-width:48em){.fr-mt-md-2v{margin-top:.5rem}.other{color:blue}}.after{color:green}";

        const rules = extractSpacingCssRules({ rawCssCode });

        expect(rules.length).toBe(1);
        expect(rules[0].ruleText).toBe(".fr-mt-md-2v{margin-top:.5rem}");
        expect(rawCssCode.slice(rules[0].start, rules[0].end)).toBe(rules[0].ruleText);
    });

    it("supports the whole token grammar: negatives, half steps, auto, 0, first and md breakpoints", () => {
        const rawCssCode = [
            ".fr-m-n4w{margin:-2rem!important}",
            ".fr-p-1-5v{padding:.375rem!important}",
            ".fr-m-auto{margin:auto!important}",
            ".fr-mb-0{margin-bottom:0!important}",
            ".fr-m-first-n4w{margin:-2rem!important}",
            ".fr-mx-md-n1-5v{margin-left:-.375rem!important}"
        ].join("");

        expect(extractSpacingCssRules({ rawCssCode }).map(({ tokens }) => tokens[0])).toStrictEqual(
            ["fr-m-n4w", "fr-p-1-5v", "fr-m-auto", "fr-mb-0", "fr-m-first-n4w", "fr-mx-md-n1-5v"]
        );
    });

    it("handles whitespace and newlines in non minified selector lists", () => {
        const rules = extractSpacingCssRules({
            "rawCssCode": ".fr-ml-1v,\n.fr-mx-1v {\n  margin-left: 0.25rem !important;\n}"
        });

        expect(rules.length).toBe(1);
        expect(rules[0].tokens).toStrictEqual(["fr-ml-1v", "fr-mx-1v"]);
        // The extracted range starts at the selector, not at the preceding whitespace.
        expect(rules[0].ruleText.startsWith(".fr-ml-1v")).toBe(true);
        expect(rules[0].ruleText.endsWith("}")).toBe(true);
    });

    it("extracts consecutive rules with contiguous, non overlapping offsets", () => {
        const rawCssCode = ".fr-mt-1v{margin-top:.25rem}.fr-mt-2v{margin-top:.5rem}";

        const rules = extractSpacingCssRules({ rawCssCode });

        expect(rules.length).toBe(2);
        expect(rules[0].end).toBe(rules[1].start);
        expect(rules.map(({ ruleText }) => ruleText).join("")).toBe(rawCssCode);
    });
});
