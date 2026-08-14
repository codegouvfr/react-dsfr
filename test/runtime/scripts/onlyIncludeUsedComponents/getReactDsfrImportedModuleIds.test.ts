import { it, expect, describe } from "vitest";
import { getReactDsfrImportedModuleIds } from "../../../../src/bin/only-include-used-components";

describe("getReactDsfrImportedModuleIds", () => {
    it("detects default and named imports from a component subpath", () => {
        const rawFileContent = `
            import { Button } from "@codegouvfr/react-dsfr/Button";
            import Badge from "@codegouvfr/react-dsfr/Badge";
            import { fr } from "@codegouvfr/react-dsfr";
        `;

        expect(getReactDsfrImportedModuleIds({ rawFileContent }).sort()).toStrictEqual([
            "Badge",
            "Button"
        ]);
    });

    it("detects deep imports and normalizes them to their module", () => {
        const rawFileContent = `
            import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
            import { createModal } from "@codegouvfr/react-dsfr/Modal";
            const { Header } = await import("@codegouvfr/react-dsfr/Header/index");
            const x = require("@codegouvfr/react-dsfr/Tabs.js");
        `;

        expect(getReactDsfrImportedModuleIds({ rawFileContent }).sort()).toStrictEqual([
            "Header",
            "Modal",
            "Tabs"
        ]);
    });

    it("keeps two segments for blocks and three for dsfr asset paths", () => {
        const rawFileContent = `
            import { PasswordInput } from "@codegouvfr/react-dsfr/blocks/PasswordInput";
            import "@codegouvfr/react-dsfr/dsfr/component/table/table.min.css";
            import "@codegouvfr/react-dsfr/dsfr/utility/colors/colors.min.css";
        `;

        expect(getReactDsfrImportedModuleIds({ rawFileContent }).sort()).toStrictEqual([
            "blocks/PasswordInput",
            "dsfr/component/table",
            "dsfr/utility/colors"
        ]);
    });

    it("returns no module for files that do not use react-dsfr", () => {
        const rawFileContent = `
            import { useState } from "react";
            import { z } from "zod";
        `;

        expect(getReactDsfrImportedModuleIds({ rawFileContent })).toStrictEqual([]);
    });
});
