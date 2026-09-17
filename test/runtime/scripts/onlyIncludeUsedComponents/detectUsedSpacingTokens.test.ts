import { it, expect, describe } from "vitest";
import { detectUsedSpacingTokens } from "../../../../src/bin/trimSpacingUtilities";

const spacingTokens = new Set([
    "fr-mt-2v",
    "fr-mt-2w",
    "fr-mb-4v",
    "fr-m-auto",
    "fr-mx-md-n4w",
    "fr-p-1-5v",
    "fr-pb-md-9w"
]);

// The false positive shaped inputs come first: a detector is only trustworthy
// once the inputs that should NOT count (or that count on purpose) are pinned down.
describe("detectUsedSpacingTokens, near misses and assumed false positives", () => {
    it("does not count a longer class of which a token is a prefix", () => {
        // Maximal run matching: the run is "fr-mt-2vfoo" / "fr-mt-2v-legacy",
        // neither is a spacing token.
        expect(
            detectUsedSpacingTokens({
                "rawFileContent": `<div className="fr-mt-2vfoo fr-mt-2v-legacy" />`,
                spacingTokens
            })
        ).toStrictEqual([]);
    });

    it("does not count a bare family or side prefix", () => {
        expect(
            detectUsedSpacingTokens({
                "rawFileContent": `const doc = "the fr-m and fr-mb and fr-modal classes";`,
                spacingTokens
            })
        ).toStrictEqual([]);
    });

    it("does count a mention in a comment or an url (assumed fail-safe: over-including only costs bytes)", () => {
        expect(
            detectUsedSpacingTokens({
                "rawFileContent": [
                    `// see https://www.systeme-de-design.gouv.fr/fr-mt-2v.png`,
                    `/* fr-mb-4v is documented here */`
                ].join("\n"),
                spacingTokens
            }).sort()
        ).toStrictEqual(["fr-mb-4v", "fr-mt-2v"]);
    });

    it("returns every token on an over-broad file that contains the whole grid", () => {
        expect(
            detectUsedSpacingTokens({
                "rawFileContent": Array.from(spacingTokens).join(" "),
                spacingTokens
            }).sort()
        ).toStrictEqual(Array.from(spacingTokens).sort());
    });

    it("returns nothing on a file with no fr- occurrence at all", () => {
        expect(
            detectUsedSpacingTokens({
                "rawFileContent": `export const margin = "mt-2v";`,
                spacingTokens
            })
        ).toStrictEqual([]);
    });
});

describe("detectUsedSpacingTokens, nominal cases", () => {
    it("detects tokens used as literal class names", () => {
        expect(
            detectUsedSpacingTokens({
                "rawFileContent": [
                    `<div className={fr.cx("fr-mt-2w", "fr-m-auto")}>`,
                    `<p class="fr-pb-md-9w fr-p-1-5v">`
                ].join("\n"),
                spacingTokens
            }).sort()
        ).toStrictEqual(["fr-m-auto", "fr-mt-2w", "fr-p-1-5v", "fr-pb-md-9w"]);
    });

    it("detects breakpoint and negative variants", () => {
        expect(
            detectUsedSpacingTokens({
                "rawFileContent": `classes.push("fr-mx-md-n4w");`,
                spacingTokens
            })
        ).toStrictEqual(["fr-mx-md-n4w"]);
    });

    it("deduplicates", () => {
        expect(
            detectUsedSpacingTokens({
                "rawFileContent": `"fr-mt-2v fr-mt-2v fr-mt-2v"`,
                spacingTokens
            })
        ).toStrictEqual(["fr-mt-2v"]);
    });
});
