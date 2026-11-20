import { assert } from "tsafe/assert";
import { parseCss } from "./parseCss";
import {
    SPACING_UTILITY_CLASS_REGEX,
    extractSpacingCssRules,
    detectUsedSpacingTokens,
    type SpacingUtilitiesManifest
} from "../../src/bin/trimSpacingUtilities";
import { fnv1aHashToHex } from "../../src/bin/tools/fnv1aHashToHex";
import type { Rule as CssRule, Media as CssMedia } from "css";

/**
 * The core stylesheet variants that generateDsfrCssCode may pick
 * (the candidates of its readCssChunks, minified and not, "main" and legacy).
 */
export const SPACING_MANIFEST_CORE_FILE_RELATIVE_PATHS = [
    "core/core.main.min.css",
    "core/core.min.css",
    "core/core.main.css",
    "core/core.css"
] as const;

/**
 * A wider net than SPACING_UTILITY_CLASS_REGEX: anything that even vaguely
 * looks like a spacing utility selector. Every selector caught by this net
 * must also match the strict regex, otherwise the DSFR introduced a spacing
 * class shape the runtime grammar does not know, and trimming would wrongly
 * keep it forever (or worse, half of a family). Build fails instead.
 */
const LOOKS_LIKE_SPACING_SELECTOR_REGEX = /^\.fr-[mp][a-z]?-/;

/**
 * Generates dsfr/core/spacing-utilities.json, and more importantly proves,
 * with a real CSS parser (the css package, a devDependency unavailable at
 * runtime), that the string level extractSpacingCssRules() is exact on the
 * exact files that get published. Every assert here is a build failure:
 * a @gouvfr/dsfr bump that breaks any assumption cannot ship silently.
 */
export function generateSpacingUtilitiesManifest(params: {
    /** Returns the raw content of a file of the @gouvfr/dsfr dist copy (the dsfr/ directory) */
    readDsfrDistFile: (fileRelativePath: string) => string;
    dsfrVersion: string;
    /**
     * Contents of react-dsfr's own runtime src/ files. The caller must exclude
     * src/fr/generatedFromCss (it lists every fr-* class) and src/bin (the CLI
     * scripts render no markup, and their doc comments cite spacing classes as
     * examples, which detectUsedSpacingTokens would count as usages).
     */
    reactDsfrSrcFilesContents: string[];
}): SpacingUtilitiesManifest {
    const { readDsfrDistFile, dsfrVersion, reactDsfrSrcFilesContents } = params;

    const coreFiles: SpacingUtilitiesManifest["coreFiles"] = {};

    let referenceTokens: Set<string> | undefined = undefined;

    for (const fileRelativePath of SPACING_MANIFEST_CORE_FILE_RELATIVE_PATHS) {
        const rawCssCode = readDsfrDistFile(fileRelativePath);

        // Parser side: the ground truth.
        const parserSelectorLists: string[] = [];

        {
            const walkRules = (rules: (CssRule | CssMedia)[]) => {
                for (const rule of rules) {
                    if (rule.type === "media") {
                        walkRules((rule as CssMedia).rules ?? []);
                        continue;
                    }

                    if (rule.type !== "rule") {
                        continue;
                    }

                    const selectors = (rule as CssRule).selectors ?? [];

                    const matching = selectors.filter(selector =>
                        SPACING_UTILITY_CLASS_REGEX.test(selector)
                    );

                    for (const selector of selectors) {
                        assert(
                            !LOOKS_LIKE_SPACING_SELECTOR_REGEX.test(selector) ||
                                SPACING_UTILITY_CLASS_REGEX.test(selector),
                            [
                                `${fileRelativePath}: selector "${selector}" looks like a spacing`,
                                `utility but is not matched by SPACING_UTILITY_CLASS_REGEX,`,
                                `the spacing grammar needs to be updated`
                            ].join(" ")
                        );
                    }

                    if (matching.length === 0) {
                        continue;
                    }

                    assert(
                        matching.length === selectors.length,
                        [
                            `${fileRelativePath}: rule "${selectors.join(",")}" mixes spacing`,
                            `utility selectors with other selectors, rule level trimming`,
                            `cannot be done safely`
                        ].join(" ")
                    );

                    parserSelectorLists.push([...selectors].sort().join(","));
                }
            };

            walkRules(parseCss(rawCssCode).stylesheet?.rules ?? []);
        }

        // Extractor side: what the runtime will do on this very content.
        const extractedRules = extractSpacingCssRules({ rawCssCode });

        assert(
            extractedRules.length === parserSelectorLists.length,
            [
                `${fileRelativePath}: extractSpacingCssRules found ${extractedRules.length}`,
                `spacing rules, the CSS parser found ${parserSelectorLists.length}`
            ].join(" ")
        );

        {
            const toCountByKey = (keys: string[]) => {
                const countByKey = new Map<string, number>();
                keys.forEach(key => countByKey.set(key, (countByKey.get(key) ?? 0) + 1));
                return countByKey;
            };

            const parserCounts = toCountByKey(parserSelectorLists);
            const extractorCounts = toCountByKey(
                extractedRules.map(rule =>
                    rule.tokens
                        .map(token => `.${token}`)
                        .sort()
                        .join(",")
                )
            );

            for (const [key, count] of parserCounts) {
                assert(
                    extractorCounts.get(key) === count,
                    `${fileRelativePath}: extractor and parser disagree on rule "${key}"`
                );
            }

            assert(
                parserCounts.size === extractorCounts.size,
                `${fileRelativePath}: extractor found rules the parser did not`
            );
        }

        for (const rule of extractedRules) {
            assert(
                rawCssCode.indexOf(rule.ruleText) === rawCssCode.lastIndexOf(rule.ruleText),
                `${fileRelativePath}: spacing rule "${rule.ruleText}" is not unique`
            );
        }

        assert(
            extractedRules.length >= 1000,
            [
                `${fileRelativePath}: only ${extractedRules.length} spacing rules found,`,
                `the spacing grid is expected to be exhaustive (~1200 rules), something is off`
            ].join(" ")
        );

        {
            const tokens = new Set(extractedRules.flatMap(rule => rule.tokens));

            if (referenceTokens === undefined) {
                referenceTokens = tokens;
            } else {
                const nonUndefinedReferenceTokens = referenceTokens;

                assert(
                    tokens.size === nonUndefinedReferenceTokens.size &&
                        Array.from(tokens).every(token => nonUndefinedReferenceTokens.has(token)),
                    [
                        `${fileRelativePath}: its spacing token set differs from`,
                        `${SPACING_MANIFEST_CORE_FILE_RELATIVE_PATHS[0]}'s, the variants`,
                        `were assumed interchangeable`
                    ].join(" ")
                );
            }
        }

        coreFiles[fileRelativePath] = {
            "contentHash": fnv1aHashToHex(rawCssCode),
            "spacingRuleCount": extractedRules.length
        };
    }

    assert(referenceTokens !== undefined);

    const alwaysKeepTokens = new Set<string>();

    for (const rawFileContent of reactDsfrSrcFilesContents) {
        detectUsedSpacingTokens({
            rawFileContent,
            "spacingTokens": referenceTokens
        }).forEach(token => alwaysKeepTokens.add(token));
    }

    return {
        dsfrVersion,
        "alwaysKeepTokens": Array.from(alwaysKeepTokens).sort(),
        coreFiles
    };
}
