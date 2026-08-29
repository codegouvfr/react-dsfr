import { it, expect, describe } from "vitest";
import * as fs from "fs";
import { join as pathJoin } from "path";
import {
    getReactDsfrImportedModuleIds,
    resolveModuleIdToDsfrComponents
} from "../../../../src/bin/only-include-used-components";

/**
 * `only-include-used-components` maps every imported react-dsfr module to the DSFR CSS
 * components it renders. A module that is in neither REACT_DSFR_MODULE_TO_DSFR_COMPONENTS
 * nor NON_COMPONENT_MODULE_IDS makes resolveModuleIdToDsfrComponents() return undefined,
 * which trips the include-everything fail-safe: the script warns and exits 0, so a
 * consumer importing a component added after the map was written silently stops getting
 * any CSS trimmed at all. Nothing else in the test suite notices.
 *
 * This test is the guard: adding a component to `src/` without adding it to one of the
 * two maps fails here, naming the module.
 *
 * On what counts as a public module: package.json has NO `exports` field (checked below),
 * so the published subpaths are not an explicit list to compare against. They are exactly
 * whatever `tsc -p src` emits: the publish job runs denoify's `enable_short_npm_import_path`
 * (.github/workflows/ci.yaml), which moves the content of the tsconfig `outDir` up one level
 * onto the package root, so `@codegouvfr/react-dsfr/<subpath>` resolves straight into it.
 * The enumeration below therefore replays that emission: the entries of `src/`, minus what
 * `src/tsconfig.json` excludes (read from the file, not hardcoded, so a future exclude stays
 * in sync) and minus the files tsc does not emit a module for.
 */
describe("REACT_DSFR_MODULE_TO_DSFR_COMPONENTS exhaustiveness", () => {
    const projectRootDirPath = process.cwd();
    const srcDirPath = pathJoin(projectRootDirPath, "src");

    /**
     * Top level names excluded from the `tsc -p src` emission, e.g. "bin".
     * Only the first path segment is kept, so a pattern is still understood if it is ever
     * widened to a glob ("./bin" and "./bin/**" both yield "bin").
     */
    const getSrcTsconfigExcludedNames = (): Set<string> => {
        const { exclude }: { exclude?: string[] } = JSON.parse(
            fs.readFileSync(pathJoin(srcDirPath, "tsconfig.json")).toString("utf8")
        );

        return new Set((exclude ?? []).map(pattern => pattern.replace(/^\.\//, "").split("/")[0]));
    };

    const isModuleSourceFileName = (fileName: string): boolean =>
        /\.tsx?$/.test(fileName) && !fileName.endsWith(".d.ts");

    const removeExtension = (fileName: string): string => fileName.replace(/\.tsx?$/, "");

    /**
     * The `@codegouvfr/react-dsfr/<subpath>` a consumer can import.
     * A directory with an index is importable as is; one without (Chart, blocks, shared,
     * tools...) is only reachable through a deeper path, so its direct children are listed
     * instead. That second case is what produces the two segment "blocks/PasswordInput".
     */
    const getPublicSubpaths = (): string[] => {
        const excludedNames = getSrcTsconfigExcludedNames();

        const subpaths: string[] = [];

        for (const dirent of fs.readdirSync(srcDirPath, { "withFileTypes": true })) {
            if (excludedNames.has(dirent.name)) {
                continue;
            }

            if (!dirent.isDirectory()) {
                if (isModuleSourceFileName(dirent.name)) {
                    subpaths.push(removeExtension(dirent.name));
                }
                continue;
            }

            const dirPath = pathJoin(srcDirPath, dirent.name);
            const childNames = fs.readdirSync(dirPath);

            if (childNames.some(childName => /^index\.tsx?$/.test(childName))) {
                subpaths.push(dirent.name);
                continue;
            }

            for (const childName of childNames) {
                subpaths.push(`${dirent.name}/${removeExtension(childName)}`);
            }
        }

        return subpaths;
    };

    /**
     * Goes through the production extraction rather than reimplementing it, so the module
     * ids asserted here are the ones the script will actually resolve at run time.
     */
    const getModuleIdBySubpath = (): Map<string, string[]> =>
        new Map(
            getPublicSubpaths().map(subpath => [
                subpath,
                getReactDsfrImportedModuleIds({
                    "rawFileContent": `import "@codegouvfr/react-dsfr/${subpath}";`
                })
            ])
        );

    it("covers every module publicly exposed by src/", () => {
        // One list, one assertion: every problem found in this run is reported at once.
        // Asserting inside the loop, or once per category, would abort on the first
        // offender and hide the rest, turning a single fix-and-rerun cycle into several.
        const problems: string[] = [];

        for (const [subpath, moduleIds] of getModuleIdBySubpath()) {
            // A public subpath must yield exactly one module id, otherwise the extraction
            // dropped it and its coverage would go unchecked, vacuously passing.
            if (moduleIds.length !== 1) {
                problems.push(
                    `src/${subpath}: extraction yielded ${moduleIds.length} module ids, expected 1`
                );
                continue;
            }

            const [moduleId] = moduleIds;

            if (resolveModuleIdToDsfrComponents({ moduleId }) === undefined) {
                problems.push(`${moduleId} (from src/${subpath}): resolves to undefined`);
            }
        }

        expect(
            problems,
            [
                `only-include-used-components would fall back to including every DSFR`,
                `component because of:`,
                ...problems.map(entry => `  - ${entry}`),
                ``,
                `Add each unresolved module to REACT_DSFR_MODULE_TO_DSFR_COMPONENTS (with the`,
                `DSFR components its markup renders, transitive dependencies included) or to`,
                `NON_COMPONENT_MODULE_IDS if it renders no DSFR markup, in`,
                `src/bin/only-include-used-components.ts.`
            ].join("\n")
        ).toStrictEqual([]);
    });

    it("enumerates the public modules from the real src/ layout", () => {
        // Guards the enumeration itself: were getPublicSubpaths() to return nothing (a bad
        // path, a changed layout), the coverage assertion above would pass on an empty set.
        const subpaths = getPublicSubpaths();

        expect(subpaths.length).toBeGreaterThan(40);

        for (const expected of ["Header", "Highlight", "blocks/PasswordInput", "i18n"]) {
            expect(subpaths).toContain(expected);
        }

        // `src/tsconfig.json` excludes `./bin`: the CLI is not a public import subpath.
        expect(subpaths.some(subpath => subpath.startsWith("bin"))).toBe(false);
    });

    it("has no package.json exports field to compare against", () => {
        // The premise of the enumeration above. If an `exports` map is ever added, this
        // fails and the public subpaths must be read from it instead of from src/.
        const packageJsonParsed = JSON.parse(
            fs.readFileSync(pathJoin(projectRootDirPath, "package.json")).toString("utf8")
        );

        expect(packageJsonParsed["exports"]).toBe(undefined);
    });
});
