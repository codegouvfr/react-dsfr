import { it, expect, describe } from "vitest";
import { parseSpacingUtilitiesManifest } from "../../../../src/bin/trimSpacingUtilities";

// A malformed manifest must degrade like a missing one (undefined, the caller
// warns and ships untrimmed), never surface as a raw stack trace.
describe("parseSpacingUtilitiesManifest, malformed inputs", () => {
    it("returns undefined on invalid JSON", () => {
        for (const manifestSourceCode of ["{invalid", "", "null", '"a string"', "42"]) {
            expect(parseSpacingUtilitiesManifest({ manifestSourceCode })).toBe(undefined);
        }
    });

    it("returns undefined on an unexpected shape", () => {
        for (const manifestSourceCode of [
            "{}",
            '{"dsfrVersion":"x"}',
            '{"coreFiles":null,"alwaysKeepTokens":[]}',
            '{"coreFiles":"not an object","alwaysKeepTokens":[]}',
            '{"coreFiles":{},"alwaysKeepTokens":"not an array"}'
        ]) {
            expect(parseSpacingUtilitiesManifest({ manifestSourceCode })).toBe(undefined);
        }
    });
});

describe("parseSpacingUtilitiesManifest, nominal case", () => {
    it("returns the parsed manifest", () => {
        const manifest = {
            "dsfrVersion": "1.14.2",
            "alwaysKeepTokens": ["fr-mt-1v"],
            "coreFiles": {
                "core/core.main.min.css": { "contentHash": "d931172e", "spacingRuleCount": 1215 }
            }
        };

        expect(
            parseSpacingUtilitiesManifest({ "manifestSourceCode": JSON.stringify(manifest) })
        ).toStrictEqual(manifest);
    });
});
