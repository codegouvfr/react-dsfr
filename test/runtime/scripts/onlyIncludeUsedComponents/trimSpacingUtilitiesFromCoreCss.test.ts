import { it, expect, describe } from "vitest";
import {
    trimSpacingUtilitiesFromCoreCss,
    extractSpacingCssRules,
    type SpacingUtilitiesManifest
} from "../../../../src/bin/trimSpacingUtilities";
import { fnv1aHashToHex } from "../../../../src/bin/tools/fnv1aHashToHex";

const coreCssCode = [
    '@charset "UTF-8";',
    ".core{--x:1}",
    ".fr-mt-1v,.fr-my-1v{margin-top:.25rem!important}",
    ".fr-mt-2v{margin-top:.5rem!important}",
    ".fr-pb-4v{padding-bottom:1rem!important}",
    "@media (min-width:48em){.fr-mt-md-2v{margin-top:.5rem!important}}",
    ".after{color:red}"
].join("");

const makeManifest = (): SpacingUtilitiesManifest => ({
    "dsfrVersion": "0.0.0-test",
    "alwaysKeepTokens": [],
    "coreFiles": {
        "core/core.main.min.css": {
            "contentHash": fnv1aHashToHex(coreCssCode),
            "spacingRuleCount": extractSpacingCssRules({ "rawCssCode": coreCssCode }).length
        }
    }
});

const failOnCannotTrim = (reason: string) => {
    throw new Error(`onCannotTrim was not expected to be called: ${reason}`);
};

// The fail-safe paths come first: when anything is off, the stylesheet must
// ship byte identical to the input, and the caller must be told.
describe("trimSpacingUtilitiesFromCoreCss, fail-safe paths", () => {
    it("does not trim and reports when the file is not covered by the manifest", () => {
        const reasons: string[] = [];

        const { cssCode, wasTrimmed } = trimSpacingUtilitiesFromCoreCss({
            "rawCssCode": coreCssCode,
            "coreFileRelativePath": "core/core.min.css",
            "manifest": makeManifest(),
            "usedTokens": new Set(),
            "keptPrefixes": [],
            "onCannotTrim": reason => reasons.push(reason)
        });

        expect(cssCode).toBe(coreCssCode);
        expect(wasTrimmed).toBe(false);
        expect(reasons.length).toBe(1);
    });

    it("does not trim and reports on a content hash mismatch (single corrupted byte)", () => {
        const reasons: string[] = [];

        const corrupted = coreCssCode.replace(".core{--x:1}", ".core{--x:2}");

        const { cssCode, wasTrimmed } = trimSpacingUtilitiesFromCoreCss({
            "rawCssCode": corrupted,
            "coreFileRelativePath": "core/core.main.min.css",
            "manifest": makeManifest(),
            "usedTokens": new Set(),
            "keptPrefixes": [],
            "onCannotTrim": reason => reasons.push(reason)
        });

        expect(cssCode).toBe(corrupted);
        expect(wasTrimmed).toBe(false);
        expect(reasons.length).toBe(1);
    });

    it("does not trim and reports on a spacing rule count mismatch", () => {
        const reasons: string[] = [];

        const manifest = makeManifest();
        manifest.coreFiles["core/core.main.min.css"].spacingRuleCount += 1;

        const { cssCode, wasTrimmed } = trimSpacingUtilitiesFromCoreCss({
            "rawCssCode": coreCssCode,
            "coreFileRelativePath": "core/core.main.min.css",
            "manifest": manifest,
            "usedTokens": new Set(),
            "keptPrefixes": [],
            "onCannotTrim": reason => reasons.push(reason)
        });

        expect(cssCode).toBe(coreCssCode);
        expect(wasTrimmed).toBe(false);
        expect(reasons.length).toBe(1);
    });
});

describe("trimSpacingUtilitiesFromCoreCss, trimming", () => {
    it("is a byte identical no-op when every token is used", () => {
        const { cssCode, wasTrimmed, removedRuleCount } = trimSpacingUtilitiesFromCoreCss({
            "rawCssCode": coreCssCode,
            "coreFileRelativePath": "core/core.main.min.css",
            "manifest": makeManifest(),
            "usedTokens": new Set(["fr-mt-1v", "fr-my-1v", "fr-mt-2v", "fr-pb-4v", "fr-mt-md-2v"]),
            "keptPrefixes": [],
            "onCannotTrim": failOnCannotTrim
        });

        expect(cssCode).toBe(coreCssCode);
        expect(wasTrimmed).toBe(true);
        expect(removedRuleCount).toBe(0);
    });

    it("partitions exactly: output plus removed rules reassemble the input, nothing else moves", () => {
        const before = extractSpacingCssRules({ "rawCssCode": coreCssCode });

        const { cssCode } = trimSpacingUtilitiesFromCoreCss({
            "rawCssCode": coreCssCode,
            "coreFileRelativePath": "core/core.main.min.css",
            "manifest": makeManifest(),
            "usedTokens": new Set(["fr-mt-2v"]),
            "keptPrefixes": [],
            "onCannotTrim": failOnCannotTrim
        });

        const removedRules = before
            .filter(({ tokens }) => !tokens.includes("fr-mt-2v"))
            .sort((a, b) => a.start - b.start);

        // Reinsert the removed rules in ascending position order: everything before
        // each insertion point is already restored, so the original offset is exact.
        // The input must come back byte for byte.
        let reassembled = cssCode;
        for (const { start, ruleText } of removedRules) {
            reassembled = reassembled.slice(0, start) + ruleText + reassembled.slice(start);
        }

        expect(reassembled).toBe(coreCssCode);
    });

    it("keeps a grouped rule whole when a single one of its tokens is used", () => {
        const { cssCode, removedRuleCount } = trimSpacingUtilitiesFromCoreCss({
            "rawCssCode": coreCssCode,
            "coreFileRelativePath": "core/core.main.min.css",
            "manifest": makeManifest(),
            "usedTokens": new Set(["fr-my-1v"]),
            "keptPrefixes": [],
            "onCannotTrim": failOnCannotTrim
        });

        expect(cssCode).toContain(".fr-mt-1v,.fr-my-1v{");
        expect(cssCode).not.toContain(".fr-mt-2v{");
        expect(removedRuleCount).toBe(3);
    });

    it("keeps every token extending a kept prefix, trims the rest", () => {
        const { cssCode } = trimSpacingUtilitiesFromCoreCss({
            "rawCssCode": coreCssCode,
            "coreFileRelativePath": "core/core.main.min.css",
            "manifest": makeManifest(),
            "usedTokens": new Set(),
            "keptPrefixes": ["fr-mt-"],
            "onCannotTrim": failOnCannotTrim
        });

        // fr-mt- keeps fr-mt-1v (and its grouped sibling), fr-mt-2v, fr-mt-md-2v...
        expect(cssCode).toContain(".fr-mt-1v,.fr-my-1v{");
        expect(cssCode).toContain(".fr-mt-2v{");
        expect(cssCode).toContain(".fr-mt-md-2v{");
        // ...but not the paddings.
        expect(cssCode).not.toContain(".fr-pb-4v{");
    });

    it("removes everything spacing when nothing is used, leaving the rest untouched", () => {
        const { cssCode, removedRuleCount, spacingRuleCount } = trimSpacingUtilitiesFromCoreCss({
            "rawCssCode": coreCssCode,
            "coreFileRelativePath": "core/core.main.min.css",
            "manifest": makeManifest(),
            "usedTokens": new Set(),
            "keptPrefixes": [],
            "onCannotTrim": failOnCannotTrim
        });

        expect(removedRuleCount).toBe(spacingRuleCount);
        expect(cssCode).toBe(
            [
                '@charset "UTF-8";',
                ".core{--x:1}",
                "@media (min-width:48em){}",
                ".after{color:red}"
            ].join("")
        );
    });
});
