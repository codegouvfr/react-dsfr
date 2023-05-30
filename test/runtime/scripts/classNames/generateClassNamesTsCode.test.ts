import { it, expect } from "vitest";
import { generateClassNamesTsCode } from "../../../../scripts/build/cssToTs/classNames";

it("Generation of TS code for fr class names", () => {
    const input = `
.fr-text--light {
  font-weight: 300 !important;
}

.fr-text--xl,
.fr-text--lead {
  font-size: 1.25rem !important;
  line-height: 2rem !important;
  margin: var(--text-spacing);
}

.fr-grid-row--gutters > [class^=fr-col-],
.fr-grid-row--gutters > [class*=" fr-col-"],
.fr-grid-row--gutters > .fr-col {
  padding: 0.5rem;
}

@media (min-width: 36em) { }
@media (min-width: 48em) { }
@media (min-width: 62em) { }
@media (min-width: 78em) { }

`;

    const expected = `
export const frCoreClassNames= [
    "fr-text--light",
    "fr-text--xl",
    "fr-text--lead",
    "fr-grid-row--gutters",
    "fr-col"
] as const;

export type FrCoreClassName = typeof frCoreClassNames[number];

export const frIconClassNames= [
    "fr-icon-ancient-gate-fill"
] as const;

export type FrIconClassName = typeof frIconClassNames[number];

export const riIconClassNames= [
    "ri-airplay-fill",
    "ri-airplay-line"
] as const;

export type RiIconClassName = typeof riIconClassNames[number];

export type FrClassName = FrCoreClassName | FrIconClassName | RiIconClassName;
`.replace(/^\n/, "");

    const got = generateClassNamesTsCode({
        "rawCssCode": input,
        "dsfrIconClassNames": ["fr-icon-ancient-gate-fill"],
        "remixiconClassNames": ["ri-airplay-fill", "ri-airplay-line"]
    });

    expect(got).toBe(expected);
});
