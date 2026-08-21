import { join as pathJoin } from "path";
import { fnv1aHashToHex } from "./tools/fnv1aHashToHex";

/**
 * Everything needed by the opt-in `--trim-spacing-utilities` mode of
 * only-include-used-components: the DSFR ships the exhaustive spacing utility
 * grid (fr-m*-* / fr-p*-*, ~2500 classes) inside the core stylesheet, this
 * module removes the rules of the utilities a project does not use.
 *
 * Unlike component trimming (whole pre-split files are included or excluded),
 * this is rule level surgery on core.*.css. It is kept safe by doing the
 * risky part at react-dsfr build time: scripts/build/generateSpacingUtilitiesManifest.ts
 * cross-checks extractSpacingCssRules() against a real CSS parser on the exact
 * files that get published, and records their content hash in
 * dsfr/core/spacing-utilities.json. At runtime, in the consumer's node_modules,
 * trimming only happens when the core file's hash matches the manifest: the
 * extraction is then guaranteed to be the one that was validated at build time.
 * On any mismatch the stylesheet is left untouched (fail-safe, when in doubt include).
 */

export const PATH_OF_SPACING_UTILITIES_JSON = pathJoin("core", "spacing-utilities.json");

/**
 * A DSFR spacing utility class selector, and nothing else.
 * Grammar derived from @gouvfr/dsfr dist/core/core.main.css and asserted against
 * it (via a real CSS parser) at build time by generateSpacingUtilitiesManifest:
 * margin/padding, optional side (t r b l x y), optional breakpoint (first, md),
 * value in v/w units (possibly negative "n", possibly half step "-5"), 0 or auto.
 * e.g. .fr-mt-2w, .fr-p-1-5v, .fr-mx-md-n4w, .fr-m-auto, .fr-mb-0
 */
export const SPACING_UTILITY_CLASS_REGEX =
    /^\.fr-[mp][trblxy]?-(?:(?:first|md)-)?(?:n?\d+(?:-5)?[vw]|0|auto)$/;

export type SpacingCssRule = {
    /** Exact text of the rule, from the first character of the selector to the closing brace */
    ruleText: string;
    /** Offsets of ruleText within the stylesheet the rule was extracted from */
    start: number;
    end: number;
    /** The selectors without the leading dot, e.g. ["fr-mt-1v", "fr-my-1v"] */
    tokens: string[];
};

export type SpacingUtilitiesManifest = {
    dsfrVersion: string;
    /**
     * Spacing utilities used by react-dsfr's own components (their JSX is not
     * scanned at runtime, the whole package is excluded from the crawl).
     * Derived at build time from src/, never written by hand.
     */
    alwaysKeepTokens: string[];
    /**
     * One entry per core stylesheet variant that generateDsfrCssCode may pick.
     * contentHash (fnv1a) is the proof that the file is byte for byte the one
     * the extraction was validated against at build time.
     */
    coreFiles: Record<string, { contentHash: string; spacingRuleCount: number }>;
};

/**
 * Parses and shape-checks a spacing-utilities.json source. Returns undefined on
 * invalid JSON or an unexpected shape: a malformed manifest is the same failure
 * as a missing one (broken or tampered installation), the caller warns and
 * ships untrimmed instead of surfacing a raw stack trace.
 */
export function parseSpacingUtilitiesManifest(params: {
    manifestSourceCode: string;
}): SpacingUtilitiesManifest | undefined {
    const { manifestSourceCode } = params;

    try {
        const parsed = JSON.parse(manifestSourceCode);

        if (
            parsed === null ||
            typeof parsed !== "object" ||
            parsed["coreFiles"] === null ||
            typeof parsed["coreFiles"] !== "object" ||
            !Array.isArray(parsed["alwaysKeepTokens"])
        ) {
            return undefined;
        }

        return parsed;
    } catch {
        return undefined;
    }
}

/**
 * Extracts the CSS rules whose selectors are ALL spacing utility classes.
 * A rule with a selector that is anything else (another class, a descendant
 * combinator, a comment in the selector list...) is never extracted: removing
 * it could not be proven safe, so it stays (fail-safe).
 *
 * This is a string level scanner, not a CSS parser. It is only trusted on
 * stylesheets whose content hash was recorded by the build time manifest,
 * where it has been cross-checked against a real parser.
 */
export function extractSpacingCssRules(params: { rawCssCode: string }): SpacingCssRule[] {
    const { rawCssCode } = params;

    const spacingCssRules: SpacingCssRule[] = [];

    /** Position right after the last rule/at-rule boundary: where the current selector text starts */
    let selectorStart = 0;
    /** A comment in a selector list makes it unprovable, the rule is then kept */
    let selectorContainsComment = false;
    let i = 0;

    const skipString = (openingQuoteIndex: number): number => {
        const stringEnd = rawCssCode.indexOf(rawCssCode[openingQuoteIndex], openingQuoteIndex + 1);
        return stringEnd === -1 ? rawCssCode.length : stringEnd + 1;
    };

    while (i < rawCssCode.length) {
        const char = rawCssCode[i];

        if (char === "/" && rawCssCode[i + 1] === "*") {
            const commentEnd = rawCssCode.indexOf("*/", i + 2);
            selectorContainsComment = true;
            i = commentEnd === -1 ? rawCssCode.length : commentEnd + 2;
            continue;
        }

        if (char === '"' || char === "'") {
            i = skipString(i);
            continue;
        }

        if (char === "}" || char === ";") {
            selectorStart = i + 1;
            selectorContainsComment = false;
            i++;
            continue;
        }

        if (char !== "{") {
            i++;
            continue;
        }

        const selectorText = rawCssCode.slice(selectorStart, i);

        if (selectorText.trimStart().startsWith("@")) {
            // At-rule opening a block (@media, @supports, @font-face...): scan inside it.
            selectorStart = i + 1;
            selectorContainsComment = false;
            i++;
            continue;
        }

        const bodyEnd = (() => {
            let j = i + 1;

            while (j < rawCssCode.length) {
                const bodyChar = rawCssCode[j];

                if (bodyChar === "/" && rawCssCode[j + 1] === "*") {
                    const commentEnd = rawCssCode.indexOf("*/", j + 2);
                    j = commentEnd === -1 ? rawCssCode.length : commentEnd + 2;
                    continue;
                }

                if (bodyChar === '"' || bodyChar === "'") {
                    j = skipString(j);
                    continue;
                }

                if (bodyChar === "}") {
                    return j;
                }

                j++;
            }

            return undefined;
        })();

        if (bodyEnd === undefined) {
            break;
        }

        extract: {
            if (selectorContainsComment) {
                break extract;
            }

            const selectors = selectorText.split(",").map(selector => selector.trim());

            if (!selectors.every(selector => SPACING_UTILITY_CLASS_REGEX.test(selector))) {
                break extract;
            }

            const start = selectorStart + (selectorText.length - selectorText.trimStart().length);
            const end = bodyEnd + 1;

            spacingCssRules.push({
                "ruleText": rawCssCode.slice(start, end),
                start,
                end,
                "tokens": selectors.map(selector => selector.slice(1))
            });
        }

        i = bodyEnd + 1;
        selectorStart = i;
        selectorContainsComment = false;
    }

    return spacingCssRules;
}

/**
 * The spacing utility classes appearing as literals in a source file.
 * Matching is done on maximal fr-* character runs so that fr-mt-2vfoo or
 * fr-mt-2v-legacy is not mistaken for fr-mt-2v. A mention in a comment or an
 * url does count as a usage: over-including is the assumed fail-safe, the same
 * trade-off as the component class name detection.
 */
export function detectUsedSpacingTokens(params: {
    rawFileContent: string;
    spacingTokens: Set<string>;
}): string[] {
    const { rawFileContent, spacingTokens } = params;

    if (!rawFileContent.includes("fr-")) {
        return [];
    }

    const usedTokens = new Set<string>();

    for (const [run] of rawFileContent.matchAll(/fr-[a-zA-Z0-9-]+/g)) {
        if (spacingTokens.has(run)) {
            usedTokens.add(run);
        }
    }

    return Array.from(usedTokens);
}

/**
 * Static prefixes of dynamically constructed class names that could produce a
 * spacing utility: `fr-mt-${size}w`, "fr-m" + side... A prefix is only
 * reported if at least one actual spacing token starts with it, so
 * `fr-modal-title-${id}` or `fr-icon-${name}` never trigger anything.
 * The caller keeps every token extending a reported prefix (fail-safe):
 * `fr-m${x}` keeps all margins but still trims the paddings, and a bare
 * `fr-${x}` degenerates into keeping the whole grid.
 */
export function detectDynamicSpacingClassPrefixes(params: {
    rawFileContent: string;
    spacingTokens: Set<string>;
}): string[] {
    const { rawFileContent, spacingTokens } = params;

    if (!rawFileContent.includes("fr-")) {
        return [];
    }

    const prefixes = new Set<string>();

    for (const regex of [
        // Template literal interpolation right after the prefix: `fr-mt-${size}w`
        /(fr-[a-zA-Z0-9-]*)\$\{/g,
        // String concatenation right after the prefix: "fr-mt-" + size
        /(fr-[a-zA-Z0-9-]*)["']\s*\+/g
    ]) {
        for (const [, prefix] of rawFileContent.matchAll(regex)) {
            prefixes.add(prefix);
        }
    }

    return Array.from(prefixes).filter(prefix => {
        for (const token of spacingTokens) {
            if (token.startsWith(prefix)) {
                return true;
            }
        }
        return false;
    });
}

/**
 * Removes from a core stylesheet the spacing utility rules of which every
 * token is unused. Grouped selectors are kept whole if any of their tokens is
 * used. Positions of the kept rules are preserved (removal by offset splicing),
 * so the cascade is exactly the original one and the output is byte identical
 * to the input when everything is used.
 *
 * If the stylesheet is not the one the manifest was generated against
 * (hash or rule count mismatch: patched file, manifest drift, unknown variant),
 * nothing is removed and onCannotTrim is called with the reason.
 */
export function trimSpacingUtilitiesFromCoreCss(params: {
    rawCssCode: string;
    coreFileRelativePath: string;
    manifest: SpacingUtilitiesManifest;
    usedTokens: Set<string>;
    keptPrefixes: string[];
    onCannotTrim: (reason: string) => void;
}): { cssCode: string; wasTrimmed: boolean; removedRuleCount: number; spacingRuleCount: number } {
    const { rawCssCode, coreFileRelativePath, manifest, usedTokens, keptPrefixes, onCannotTrim } =
        params;

    const cannotTrim = (reason: string) => {
        onCannotTrim(reason);
        return {
            "cssCode": rawCssCode,
            "wasTrimmed": false,
            "removedRuleCount": 0,
            "spacingRuleCount": 0
        };
    };

    const manifestEntry = manifest.coreFiles[coreFileRelativePath];

    if (manifestEntry === undefined) {
        return cannotTrim(
            `${coreFileRelativePath} is not covered by the spacing utilities manifest`
        );
    }

    if (fnv1aHashToHex(rawCssCode) !== manifestEntry.contentHash) {
        return cannotTrim(
            [
                `${coreFileRelativePath} is not the file the spacing utilities manifest`,
                `was generated against (patched or corrupted file, or manifest drift)`
            ].join(" ")
        );
    }

    const spacingCssRules = extractSpacingCssRules({ rawCssCode });

    if (spacingCssRules.length !== manifestEntry.spacingRuleCount) {
        return cannotTrim(
            [
                `Expected ${manifestEntry.spacingRuleCount} spacing utility rules in`,
                `${coreFileRelativePath}, found ${spacingCssRules.length}`
            ].join(" ")
        );
    }

    const isTokenKept = (token: string) =>
        usedTokens.has(token) || keptPrefixes.some(prefix => token.startsWith(prefix));

    const removedRules = spacingCssRules.filter(rule => !rule.tokens.some(isTokenKept));

    let cssCode = "";
    let cursor = 0;

    for (const rule of removedRules) {
        cssCode += rawCssCode.slice(cursor, rule.start);
        cursor = rule.end;
    }

    cssCode += rawCssCode.slice(cursor);

    return {
        cssCode,
        "wasTrimmed": true,
        "removedRuleCount": removedRules.length,
        "spacingRuleCount": spacingCssRules.length
    };
}
