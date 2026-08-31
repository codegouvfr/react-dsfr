import { it, expect, describe } from "vitest";
import { detectDsfrComponentsFromClassNames } from "../../../../src/bin/only-include-css-of-used-components";

describe("detectDsfrComponentsFromClassNames", () => {
    it("detects raw usage of DSFR component classes", () => {
        const rawFileContent = `
            export function MyTable() {
                return <div className="fr-table">
                    <span className={fr.cx("fr-badge", "fr-badge--success")} />
                </div>;
            }
        `;

        const detected = detectDsfrComponentsFromClassNames({ rawFileContent });

        expect(detected).toContain("table");
        expect(detected).toContain("badge");
        expect(detected).not.toContain("header");
    });

    it("detects modifier classes thanks to prefix matching", () => {
        const detected = detectDsfrComponentsFromClassNames({
            "rawFileContent": `<button class="fr-btn fr-btn--secondary">Ok</button>`
        });

        expect(detected).toStrictEqual(["button"]);
    });

    it("detects nothing in files without fr- classes", () => {
        expect(
            detectDsfrComponentsFromClassNames({
                "rawFileContent": `const theme = { "color": "blue" };`
            })
        ).toStrictEqual([]);
    });
});
