import { it, expect, describe } from "vitest";
import * as fs from "fs";
import { join as pathJoin } from "path";
import { DSFR_COMPONENTS_CASCADE_ORDER } from "../../../../src/bin/only-include-css-of-used-components";

/**
 * DSFR_COMPONENTS_CASCADE_ORDER only has a reason to exist if it matches the order in
 * which the upstream bundle concatenates the components. This test is what makes a
 * silent drift on a @gouvfr/dsfr bump impossible.
 *
 * dsfr.main.css does carry section banners (`/* ¯¯¯ *\ NAME \* ˍˍˍ *\/`), but they are a
 * defective index: 44 of them for 45 components, `badge`, `consent`, `notice` and `radio`
 * have none, and `notice` is labelled ALERT so the list contains `alert` twice.
 * The source map is read instead: its `sources` list the scss files in emission order,
 * and only `radio` has no `main.scss` entry point to key on.
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
        // Deliberately an assertion and not a skip: @gouvfr/dsfr is a direct dependency of
        // this repo, so there is no legitimate case where the map is absent. Skipping would
        // let the guard silently evaporate on a future DSFR that stops shipping source maps.
        expect(fs.existsSync(sourceMapFilePath), `${sourceMapFilePath} not found`).toBe(true);

        expect([...DSFR_COMPONENTS_CASCADE_ORDER]).toStrictEqual(getUpstreamCascadeOrder());
    });
});
