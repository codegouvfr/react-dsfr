import { it, expect, describe } from "vitest";
import * as fs from "fs";
import { join as pathJoin } from "path";
import {
    generateSpacingUtilitiesManifest,
    SPACING_MANIFEST_CORE_FILE_RELATIVE_PATHS
} from "../../../../scripts/build/generateSpacingUtilitiesManifest";
import {
    SPACING_UTILITY_CLASS_REGEX,
    extractSpacingCssRules
} from "../../../../src/bin/trimSpacingUtilities";

/**
 * Runs the build time generator against the actually installed @gouvfr/dsfr:
 * its internal asserts are the cross-check of the string level extraction
 * against a real CSS parser (grammar exhaustiveness, no mixed rule, rule text
 * uniqueness, identical token sets across variants). A @gouvfr/dsfr bump that
 * breaks any of those assumptions fails here, it cannot drift silently.
 *
 * If @gouvfr/dsfr is not installed this test must fail, not skip: a skipped
 * drift guard is a guard that no longer guards anything.
 */
describe("spacing utilities manifest", () => {
    const dsfrDistDirPath = pathJoin(process.cwd(), "node_modules", "@gouvfr", "dsfr", "dist");

    const readDsfrDistFile = (fileRelativePath: string) =>
        fs.readFileSync(pathJoin(dsfrDistDirPath, ...fileRelativePath.split("/"))).toString("utf8");

    const getReactDsfrSrcFilesContents = () => {
        const contents: string[] = [];

        (function walk(dirPath: string) {
            for (const dirent of fs.readdirSync(dirPath, { "withFileTypes": true })) {
                const path = pathJoin(dirPath, dirent.name);

                if (dirent.isDirectory()) {
                    if (dirent.name === "generatedFromCss" || dirent.name === "bin") {
                        continue;
                    }
                    walk(path);
                    continue;
                }

                if (!/\.tsx?$/.test(dirent.name)) {
                    continue;
                }

                contents.push(fs.readFileSync(path).toString("utf8"));
            }
        })(pathJoin(process.cwd(), "src"));

        return contents;
    };

    it("the installed @gouvfr/dsfr satisfies every assumption of the extraction (cross-check against a real CSS parser)", () => {
        expect(fs.existsSync(dsfrDistDirPath)).toBe(true);

        const manifest = generateSpacingUtilitiesManifest({
            readDsfrDistFile,
            "dsfrVersion": "0.0.0-irrelevant-here",
            "reactDsfrSrcFilesContents": getReactDsfrSrcFilesContents()
        });

        expect(Object.keys(manifest.coreFiles)).toStrictEqual([
            ...SPACING_MANIFEST_CORE_FILE_RELATIVE_PATHS
        ]);
    });

    it("finds the exhaustive spacing grid (re-derived value for dsfr 1.14.2, adjust on a dsfr bump)", () => {
        const manifest = generateSpacingUtilitiesManifest({
            readDsfrDistFile,
            "dsfrVersion": "0.0.0-irrelevant-here",
            "reactDsfrSrcFilesContents": []
        });

        for (const fileRelativePath of SPACING_MANIFEST_CORE_FILE_RELATIVE_PATHS) {
            expect(manifest.coreFiles[fileRelativePath].spacingRuleCount).toBe(1215);
        }

        const tokens = new Set(
            extractSpacingCssRules({
                "rawCssCode": readDsfrDistFile(SPACING_MANIFEST_CORE_FILE_RELATIVE_PATHS[0])
            }).flatMap(({ tokens }) => tokens)
        );

        expect(tokens.size).toBe(2457);

        for (const token of tokens) {
            expect(SPACING_UTILITY_CLASS_REGEX.test(`.${token}`)).toBe(true);
        }
    });

    it("alwaysKeepTokens covers the spacing utilities that react-dsfr's own components render", () => {
        const manifest = generateSpacingUtilitiesManifest({
            readDsfrDistFile,
            "dsfrVersion": "0.0.0-irrelevant-here",
            "reactDsfrSrcFilesContents": getReactDsfrSrcFilesContents()
        });

        // The tokens rendered by src/ components at the time of writing
        // (AgentConnectButton, MegaMenu, consentManagement Placeholder).
        // New usages in src/ extend the generated list on their own, this only
        // pins that the mechanism keeps deriving them.
        for (const token of ["fr-mt-1v", "fr-mb-2v", "fr-mb-4v", "fr-mb-6v"]) {
            expect(manifest.alwaysKeepTokens).toContain(token);
        }

        // Derived from sources, deterministic: sorted and duplicate free.
        expect([...manifest.alwaysKeepTokens].sort()).toStrictEqual(manifest.alwaysKeepTokens);
        expect(new Set(manifest.alwaysKeepTokens).size).toBe(manifest.alwaysKeepTokens.length);
    });
});
