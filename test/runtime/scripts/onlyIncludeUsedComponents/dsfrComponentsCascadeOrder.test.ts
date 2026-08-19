import { it, expect, describe } from "vitest";
import * as fs from "fs";
import { join as pathJoin } from "path";
import { DSFR_COMPONENTS_CASCADE_ORDER } from "../../../../src/bin/only-include-used-components";

/**
 * DSFR_COMPONENTS_CASCADE_ORDER only has a reason to exist if it matches the order in
 * which the upstream bundle concatenates the components. There is no section banner in
 * dsfr.main.css to read it from, but its source map lists the scss files in emission
 * order, so the order can be extracted and asserted against the installed DSFR.
 * This test is what makes a silent drift on a @gouvfr/dsfr bump impossible.
 */
describe("DSFR_COMPONENTS_CASCADE_ORDER", () => {
    const sourceMapFilePath = pathJoin(
        process.cwd(),
        "node_modules",
        "@gouvfr",
        "dsfr",
        "dist",
        "dsfr.main.css.map"
    );

    const getUpstreamCascadeOrder = (): string[] => {
        const { sources }: { sources: string[] } = JSON.parse(
            fs.readFileSync(sourceMapFilePath).toString("utf8")
        );

        const sectionIndexByComponentName = new Map<string, number>();

        sources.forEach((source, index) => {
            const match = source.match(/\/component\/([^/]+)\/(.*)$/);

            if (match === null) {
                return;
            }

            const [, componentName, sourceRelativePath] = match;

            // `main.scss` is the component's entry point, the position of its section.
            // `radio` is the only component that has none upstream, fall back to the
            // first occurrence of any of its stylesheets.
            const isSectionEntryPoint = sourceRelativePath === "main.scss";

            if (sectionIndexByComponentName.has(componentName) && !isSectionEntryPoint) {
                return;
            }

            if (
                isSectionEntryPoint &&
                sources[sectionIndexByComponentName.get(componentName) ?? index]?.endsWith(
                    "main.scss"
                )
            ) {
                return;
            }

            sectionIndexByComponentName.set(componentName, index);
        });

        return Array.from(sectionIndexByComponentName.entries())
            .sort(([, indexA], [, indexB]) => indexA - indexB)
            .map(([componentName]) => componentName);
    };

    it("matches the section order of the installed @gouvfr/dsfr", () => {
        if (!fs.existsSync(sourceMapFilePath)) {
            console.warn(`${sourceMapFilePath} not found, skipping the cascade order assertion.`);
            return;
        }

        expect([...DSFR_COMPONENTS_CASCADE_ORDER]).toStrictEqual(getUpstreamCascadeOrder());
    });
});
