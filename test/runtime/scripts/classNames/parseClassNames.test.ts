import { it, expect } from "vitest";
import { parseClassNames } from "../../../../src/scripts/build/cssToTs/classNames";

it("Parsing of fr classnames", () => {
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

.fr-header__navbar .fr-btn--menu {
  color: #3a3a3a;
}

@media (min-width: 36em) { }
@media (min-width: 48em) { }
@media (min-width: 62em) { }
@media (min-width: 78em) { }

`;

    const expected = [
        "fr-text--light",
        "fr-text--xl",
        "fr-text--lead",
        "fr-grid-row--gutters",
        "fr-col",
        "fr-header__navbar",
        "fr-btn--menu"
    ];

    const got = parseClassNames(input);

    expect(got).toStrictEqual(expected);
});
