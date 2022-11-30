import { it, expect } from "vitest";
import { generateSpacingTsCode } from "../../../../src/scripts/build/cssToTs/spacing";

it("Generates spacing TS code", () => {
    const rawCssCode = `
.fr-m-7v {
  margin: 1.75rem !important;
}

.fr-m-12v,
.fr-m-6w {
  margin: 3rem !important;
}

@media (min-width: 36em) { }

@media (min-width: 48em) { }

@media (min-width: 62em) { }

@media (min-width: 78em) { }
`.replace(/^\n/, "");

    const got = generateSpacingTsCode(rawCssCode);

    const expected = `
export const spacingTokenByValue= {
    "7v": "1.75rem",
    "12v": "3rem",
    "6w": "3rem"
} as const;

export type SpacingTokenByValue = typeof spacingTokenByValue;

export type SpacingToken = keyof SpacingTokenByValue;
`.replace(/^\n/, "");

    expect(got).toBe(expected);
});
