import { it, expect } from "vitest";
import { parseClassNames } from "../../../../scripts/build/cssToTs/classNames";

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

@supports (aspect-ratio: 16/9) {
  .fr-ratio-32x9 {
    aspect-ratio: 3.5555555556 !important;
  }

  .fr-ratio-16x9 {
    aspect-ratio: 1.7777777778 !important;
  }
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
        "fr-btn--menu",
        "fr-ratio-32x9",
        "fr-ratio-16x9"
    ];

    const got = parseClassNames(input);

    expect(got).toStrictEqual(expected);
});
