import { it, expect, describe } from "vitest";
import * as fs from "fs";
import { join as pathJoin } from "path";
import {
    DSFR_COMPONENT_DETECTION_CLASS_PREFIXES,
    DSFR_COMPONENT_CSS_FILE_EXTENSIONS
} from "../../../../src/bin/only-include-used-components";

/**
 * DSFR_COMPONENT_DETECTION_CLASS_PREFIXES is hand written, and a wrong entry is invisible:
 * it does not break a build, it just quietly includes a component's CSS in every project
 * that happens to use the class. This test re-derives it from the installed @gouvfr/dsfr.
 *
 * The rule: a prefix earns its place only if it *opens a selector* in that component's own
 * stylesheet. Merely appearing there is not enough, because a component also styles classes
 * it does not own: content.css has rules for fr-responsive-img, but all of them are scoped
 * under `.fr-content-media`, and the base `.fr-responsive-img` rule lives in core, which is
 * always included. Detecting `content` on fr-responsive-img therefore pulled in ~2.8 KB of
 * minified CSS for nothing, in every project using that core utility class.
 *
 * This is intentionally the one direction that is safe to assert. The opposite check, that
 * every DSFR class maps back to a component, would be a fail-safe over-inclusion, and the
 * union of the prefixes is deliberately not exhaustive over the DSFR class vocabulary.
 */
describe("DSFR_COMPONENT_DETECTION_CLASS_PREFIXES", () => {
    const componentsDirPath = pathJoin(
        process.cwd(),
        "node_modules",
        "@gouvfr",
        "dsfr",
        "dist",
        "component"
    );

    /** Same extension list, in the same order, as the availableDsfrComponents filter. */
    const getComponentCssFilePath = (componentName: string): string | undefined =>
        DSFR_COMPONENT_CSS_FILE_EXTENSIONS.map(ext =>
            pathJoin(componentsDirPath, componentName, `${componentName}.${ext}`)
        ).find(filePath => fs.existsSync(filePath));

    /**
     * True when `.<classPrefix>` starts a compound selector, i.e. at the very beginning of
     * the stylesheet or right after a `,` `{` `}`. Anchoring this way is what separates
     * `.fr-download {` from `.fr-content-media [class^=fr-responsive-img]`, where the class
     * only ever appears as a descendant of another component's class.
     */
    const doesClassPrefixOpenASelector = (params: {
        rawCssCode: string;
        classPrefix: string;
    }): boolean => {
        const { rawCssCode, classPrefix } = params;

        return new RegExp(
            `(?:^|[,{}]\\s*)\\.${classPrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
            "m"
        ).test(rawCssCode);
    };

    it("only detects on classes each component actually owns", () => {
        // Deliberately an assertion and not a skip: @gouvfr/dsfr is a direct dependency, so
        // there is no legitimate case where the stylesheets are absent. Skipping would let
        // this guard silently evaporate on a future layout change upstream.
        expect(fs.existsSync(componentsDirPath), `${componentsDirPath} not found`).toBe(true);

        const problems: string[] = [];

        for (const [componentName, classPrefixes] of Object.entries(
            DSFR_COMPONENT_DETECTION_CLASS_PREFIXES
        )) {
            const cssFilePath = getComponentCssFilePath(componentName);

            if (cssFilePath === undefined) {
                problems.push(`${componentName}: no stylesheet found in ${componentsDirPath}`);
                continue;
            }

            const rawCssCode = fs.readFileSync(cssFilePath).toString("utf8");

            for (const classPrefix of classPrefixes) {
                if (doesClassPrefixOpenASelector({ rawCssCode, classPrefix })) {
                    continue;
                }

                problems.push(
                    `${componentName}: "${classPrefix}" never opens a selector in ${componentName}.css`
                );
            }
        }

        expect(
            problems,
            [
                `These detection prefixes do not identify the component they are mapped to,`,
                `so matching one pulls in that component's CSS for nothing:`,
                ...problems.map(entry => `  - ${entry}`),
                ``,
                `Either the prefix belongs to another component (or to the always included`,
                `core), or it is only styled as a descendant. Drop it from`,
                `DSFR_COMPONENT_DETECTION_CLASS_PREFIXES in`,
                `src/bin/only-include-used-components.ts.`
            ].join("\n")
        ).toStrictEqual([]);
    });

    it("checks a meaningful number of prefixes", () => {
        // Guards the loop above: a wrong componentsDirPath, or an upstream rename, would
        // otherwise leave it iterating over stylesheets it never actually reads.
        const classPrefixes = Object.values(DSFR_COMPONENT_DETECTION_CLASS_PREFIXES).flat();

        expect(classPrefixes.length).toBeGreaterThan(40);

        expect(
            Object.keys(DSFR_COMPONENT_DETECTION_CLASS_PREFIXES).filter(
                componentName => getComponentCssFilePath(componentName) === undefined
            )
        ).toStrictEqual([]);
    });
});
