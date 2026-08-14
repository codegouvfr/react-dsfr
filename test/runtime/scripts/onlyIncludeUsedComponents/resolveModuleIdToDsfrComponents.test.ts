import { it, expect, describe } from "vitest";
import {
    resolveModuleIdToDsfrComponents,
    REACT_DSFR_MODULE_TO_DSFR_COMPONENTS,
    DSFR_COMPONENTS_CASCADE_ORDER
} from "../../../../src/bin/only-include-used-components";

describe("resolveModuleIdToDsfrComponents", () => {
    it("resolves a component module with its transitive dependencies", () => {
        const dsfrComponents = resolveModuleIdToDsfrComponents({ "moduleId": "Header" });

        expect(dsfrComponents).not.toBe(undefined);

        for (const expected of ["header", "navigation", "modal", "logo", "search"]) {
            expect(dsfrComponents).toContain(expected);
        }
    });

    it("resolves known non component modules to no component", () => {
        for (const moduleId of ["fr", "i18n", "spa", "mui", "next-appdir", "useIsDark"]) {
            expect(resolveModuleIdToDsfrComponents({ moduleId })).toStrictEqual([]);
        }
    });

    it("resolves direct dsfr component stylesheet imports", () => {
        expect(
            resolveModuleIdToDsfrComponents({ "moduleId": "dsfr/component/table" })
        ).toStrictEqual(["table"]);

        expect(
            resolveModuleIdToDsfrComponents({ "moduleId": "dsfr/utility/colors" })
        ).toStrictEqual([]);
    });

    it("returns undefined for unknown component looking modules", () => {
        expect(resolveModuleIdToDsfrComponents({ "moduleId": "BrandNewComponent" })).toBe(
            undefined
        );
    });

    it("only maps to components that exist in the cascade order", () => {
        for (const dsfrComponents of Object.values(REACT_DSFR_MODULE_TO_DSFR_COMPONENTS)) {
            for (const componentName of dsfrComponents) {
                expect(DSFR_COMPONENTS_CASCADE_ORDER).toContain(componentName);
            }
        }
    });
});
