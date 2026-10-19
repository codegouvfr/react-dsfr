import { it, expect, describe } from "vitest";
import { detectDynamicSpacingClassPrefixes } from "../../../../src/bin/trimSpacingUtilities";

const spacingTokens = new Set([
    "fr-mt-2v",
    "fr-mt-2w",
    "fr-mb-4v",
    "fr-m-auto",
    "fr-p-1-5v",
    "fr-pb-md-9w"
]);

// The near misses come first: this detector decides whether part of the spacing
// grid is retained, a prefix that cannot produce a spacing token must never trigger.
describe("detectDynamicSpacingClassPrefixes, near misses", () => {
    it("does not trigger on dynamic classes whose prefix cannot extend into a spacing token", () => {
        expect(
            detectDynamicSpacingClassPrefixes({
                "rawFileContent": [
                    "const titleId = `fr-modal-title-${id}`;",
                    "const icon = `fr-icon-${name}`;",
                    'const variant = "fr-btn--" + variantName;',
                    "const severityClass = `fr-message--${severity}`;"
                ].join("\n"),
                spacingTokens
            })
        ).toStrictEqual([]);
    });

    it("does not trigger on interpolations or concatenations with no fr- prefix at all", () => {
        expect(
            detectDynamicSpacingClassPrefixes({
                "rawFileContent": [
                    "const a = `${x}v`;",
                    'const b = "margin-" + side;',
                    "const c = `fr-mt-2v`;" // literal, not dynamic
                ].join("\n"),
                spacingTokens
            })
        ).toStrictEqual([]);
    });

    it("does not trigger on a mere fr- mention in an url without interpolation", () => {
        expect(
            detectDynamicSpacingClassPrefixes({
                "rawFileContent": `// https://example.com/fr-mt-2v.png`,
                spacingTokens
            })
        ).toStrictEqual([]);
    });
});

describe("detectDynamicSpacingClassPrefixes, dynamic constructions", () => {
    it("captures the static prefix of a template literal interpolation", () => {
        expect(
            detectDynamicSpacingClassPrefixes({
                "rawFileContent": "const cls = `fr-mt-${size}w`;",
                spacingTokens
            })
        ).toStrictEqual(["fr-mt-"]);
    });

    it("captures a bare fr- prefix (degenerates into keeping the whole grid, by design)", () => {
        expect(
            detectDynamicSpacingClassPrefixes({
                "rawFileContent": "const cls = `fr-${anything}`;",
                spacingTokens
            })
        ).toStrictEqual(["fr-"]);
    });

    it("captures a family prefix (keeps the margins, the paddings stay trimmable)", () => {
        expect(
            detectDynamicSpacingClassPrefixes({
                "rawFileContent": "const cls = `fr-m${sideAndValue}`;",
                spacingTokens
            })
        ).toStrictEqual(["fr-m"]);
    });

    it("captures the static prefix of a string concatenation", () => {
        expect(
            detectDynamicSpacingClassPrefixes({
                "rawFileContent": 'const cls = "fr-mt-" + size + "w";',
                spacingTokens
            })
        ).toStrictEqual(["fr-mt-"]);

        expect(
            detectDynamicSpacingClassPrefixes({
                "rawFileContent": "const cls = 'fr-pb-md-' + value;",
                spacingTokens
            })
        ).toStrictEqual(["fr-pb-md-"]);
    });

    it("captures a complete token being extended (the token itself is then kept)", () => {
        expect(
            detectDynamicSpacingClassPrefixes({
                "rawFileContent": 'const cls = "fr-mt-2v" + suffix;',
                spacingTokens
            })
        ).toStrictEqual(["fr-mt-2v"]);
    });

    it("deduplicates and reports each distinct prefix", () => {
        expect(
            detectDynamicSpacingClassPrefixes({
                "rawFileContent": [
                    "const a = `fr-mt-${x}`;",
                    "const b = `fr-mt-${y}`;",
                    'const c = "fr-mb-" + z;'
                ].join("\n"),
                spacingTokens
            }).sort()
        ).toStrictEqual(["fr-mb-", "fr-mt-"]);
    });
});
