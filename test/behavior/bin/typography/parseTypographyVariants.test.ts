import { it, expect } from "vitest";
import { parseTypographyVariants } from "../../../../src/bin/css_to_ts/typography";
import type { TypographyVariant } from "../../../../src/bin/css_to_ts/typography";

export default () =>
    it("Successfully parse typography variants", () => {
        const rawCssCode = `
:root {
    --title-spacing: 0 0 1.5rem;
    --text-spacing: 0 0 1.5rem;
}

h6 {
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.5rem;
  margin: var(--title-spacing);
}

h5 {
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin: var(--title-spacing);
}

h4 {
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1.75rem;
  margin: var(--title-spacing);
}

h3 {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
  margin: var(--title-spacing);
}

h2 {
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.25rem;
  margin: var(--title-spacing);
}

h1 {
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  margin: var(--title-spacing);
}

p {
  font-size: 1rem;
  line-height: 1.5rem;
  margin: var(--text-spacing);
}

ul,
ol {
  margin: 0;
  padding: 0;
  margin-block-start: var(--xl-block);
  margin-block-end: var(--xl-block);

  --xl-size: var(--xl-base);
}

ul {
  list-style-type: var(--ul-type);
  padding-inline-start: var(--ul-start);
}

ul > li::marker {
  font-size: calc(var(--xl-size) * 0.9);
}

ol {
  list-style-type: var(--ol-type);
  padding-inline-start: var(--ol-start);
  counter-reset: li-counter;
}

ol > li {
  counter-increment: li-counter;
}

ol > li::marker {
  content: var(--ol-content);
  font-size: var(--xl-size);
  font-weight: bold;
}

li {
  --xl-base: calc(var(--xl-size) * 0.9);
  padding-bottom: var(--li-bottom);
}

.fr-raw-list {
  --ul-type: none;
  --ol-type: none;
  --ul-start: 0;
  --ol-start: 0;
  --xl-block: 0;
  --li-bottom: 0;
  --ol-content: none;
}

.fr-list {
  --ul-type: disc;
  --ol-type: decimal;
  --ul-start: 1rem;
  --ol-start: 1.5rem;
  --xl-block: 0.5rem;
  --li-bottom: 0.25rem;
  --xl-base: 1em;
  --ol-content: counters(li-counter, ".") ". ";
}

sub {
  line-height: 1;
}

sup {
  line-height: 1;
}

.fr-text--light {
  font-weight: 300 !important;
}

.fr-text--regular {
  font-weight: 400 !important;
}

.fr-text--bold {
  font-weight: 700 !important;
}

.fr-text--heavy {
  font-weight: 900 !important;
}

.fr-h6 {
  font-weight: 700 !important;
  font-size: 1.125rem !important;
  line-height: 1.5rem !important;
  margin: var(--title-spacing);
}

.fr-h5 {
  font-weight: 700 !important;
  font-size: 1.25rem !important;
  line-height: 1.75rem !important;
  margin: var(--title-spacing);
}

.fr-h4 {
  font-weight: 700 !important;
  font-size: 1.375rem !important;
  line-height: 1.75rem !important;
  margin: var(--title-spacing);
}

.fr-h3 {
  font-weight: 700 !important;
  font-size: 1.5rem !important;
  line-height: 2rem !important;
  margin: var(--title-spacing);
}

.fr-h2 {
  font-weight: 700 !important;
  font-size: 1.75rem !important;
  line-height: 2.25rem !important;
  margin: var(--title-spacing);
}

.fr-h1 {
  font-weight: 700 !important;
  font-size: 2rem !important;
  line-height: 2.5rem !important;
  margin: var(--title-spacing);
}

.fr-display--xs {
  font-weight: 700 !important;
  font-size: 2.5rem !important;
  line-height: 3rem !important;
  margin: var(--display-spacing);
}

.fr-display--sm {
  font-weight: 700 !important;
  font-size: 3rem !important;
  line-height: 3.5rem !important;
  margin: var(--display-spacing);
}

.fr-display--md {
  font-weight: 700 !important;
  font-size: 3.5rem !important;
  line-height: 4rem !important;
  margin: var(--display-spacing);
}

.fr-display--lg {
  font-weight: 700 !important;
  font-size: 4rem !important;
  line-height: 4.5rem !important;
  margin: var(--display-spacing);
}

.fr-display--xl {
  font-weight: 700 !important;
  font-size: 4.5rem !important;
  line-height: 5rem !important;
  margin: var(--display-spacing);
}

.fr-text--alt {
  font-family: "Spectral", georgia, serif !important;
}

.fr-text--xs {
  font-size: 0.75rem !important;
  line-height: 1.25rem !important;
  margin: var(--text-spacing);
}

.fr-text--sm {
  font-size: 0.875rem !important;
  line-height: 1.5rem !important;
  margin: var(--text-spacing);
}

.fr-text--md {
  font-size: 1rem !important;
  line-height: 1.5rem !important;
  margin: var(--text-spacing);
}

.fr-text--lg {
  font-size: 1.125rem !important;
  line-height: 1.75rem !important;
  margin: var(--text-spacing);
}

.fr-text--xl,
.fr-text--lead {
  font-size: 1.25rem !important;
  line-height: 2rem !important;
  margin: var(--text-spacing);
}

@media (min-width: 48em) {
  /*! media md */

  /*! media md */
  h6 {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  h5 {
    font-size: 1.375rem;
    line-height: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  h3 {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }

  h2 {
    font-size: 2rem;
    line-height: 2.5rem;
  }

  h1 {
    font-size: 2.5rem;
    line-height: 3rem;
  }

  .fr-h6 {
    font-size: 1.25rem !important;
    line-height: 1.75rem !important;
  }

  .fr-h5 {
    font-size: 1.375rem !important;
    line-height: 1.75rem !important;
  }

  .fr-h4 {
    font-size: 1.5rem !important;
    line-height: 2rem !important;
  }

  .fr-h3 {
    font-size: 1.75rem !important;
    line-height: 2.25rem !important;
  }

  .fr-h2 {
    font-size: 2rem !important;
    line-height: 2.5rem !important;
  }

  .fr-h1 {
    font-size: 2.5rem !important;
    line-height: 3rem !important;
  }

  .fr-display--xs {
    font-size: 3rem !important;
    line-height: 3.5rem !important;
  }

  .fr-display--sm {
    font-size: 3.5rem !important;
    line-height: 4rem !important;
  }

  .fr-display--md {
    font-size: 4rem !important;
    line-height: 4.5rem !important;
  }

  .fr-display--lg {
    font-size: 4.5rem !important;
    line-height: 5rem !important;
  }

  .fr-display--xl {
    font-size: 5rem !important;
    line-height: 5.5rem !important;
  }

}

@media (min-width: 36em) { }


@media (min-width: 78em) { }

@media (min-width: 62em) { }

`;

        const got = parseTypographyVariants(rawCssCode);

        const expected: TypographyVariant[] = [
            {
                "selector": "h6",
                "style": {
                    "fontWeight": 700,
                    "fontSize": "1.125rem",
                    "lineHeight": "1.5rem",
                    "margin": "var(--title-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "1.25rem",
                        "lineHeight": "1.75rem"
                    }
                }
            },
            {
                "selector": "h5",
                "style": {
                    "fontWeight": 700,
                    "fontSize": "1.25rem",
                    "lineHeight": "1.75rem",
                    "margin": "var(--title-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "1.375rem",
                        "lineHeight": "1.75rem"
                    }
                }
            },
            {
                "selector": "h4",
                "style": {
                    "fontWeight": 700,
                    "fontSize": "1.375rem",
                    "lineHeight": "1.75rem",
                    "margin": "var(--title-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "1.5rem",
                        "lineHeight": "2rem"
                    }
                }
            },
            {
                "selector": "h3",
                "style": {
                    "fontWeight": 700,
                    "fontSize": "1.5rem",
                    "lineHeight": "2rem",
                    "margin": "var(--title-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "1.75rem",
                        "lineHeight": "2.25rem"
                    }
                }
            },
            {
                "selector": "h2",
                "style": {
                    "fontWeight": 700,
                    "fontSize": "1.75rem",
                    "lineHeight": "2.25rem",
                    "margin": "var(--title-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "2rem",
                        "lineHeight": "2.5rem"
                    }
                }
            },
            {
                "selector": "h1",
                "style": {
                    "fontWeight": 700,
                    "fontSize": "2rem",
                    "lineHeight": "2.5rem",
                    "margin": "var(--title-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "2.5rem",
                        "lineHeight": "3rem"
                    }
                }
            },
            {
                "selector": "p",
                "style": {
                    "fontSize": "1rem",
                    "lineHeight": "1.5rem",
                    "margin": "var(--text-spacing)"
                }
            },
            {
                "selector": ".fr-text--light",
                "style": {
                    "fontWeight": "300 !important"
                }
            },
            {
                "selector": ".fr-text--regular",
                "style": {
                    "fontWeight": "400 !important"
                }
            },
            {
                "selector": ".fr-text--bold",
                "style": {
                    "fontWeight": "700 !important"
                }
            },
            {
                "selector": ".fr-text--heavy",
                "style": {
                    "fontWeight": "900 !important"
                }
            },
            {
                "selector": ".fr-display--xs",
                "style": {
                    "fontWeight": "700 !important",
                    "fontSize": "2.5rem !important",
                    "lineHeight": "3rem !important",
                    "margin": "var(--display-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "3rem !important",
                        "lineHeight": "3.5rem !important"
                    }
                }
            },
            {
                "selector": ".fr-display--sm",
                "style": {
                    "fontWeight": "700 !important",
                    "fontSize": "3rem !important",
                    "lineHeight": "3.5rem !important",
                    "margin": "var(--display-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "3.5rem !important",
                        "lineHeight": "4rem !important"
                    }
                }
            },
            {
                "selector": ".fr-display--md",
                "style": {
                    "fontWeight": "700 !important",
                    "fontSize": "3.5rem !important",
                    "lineHeight": "4rem !important",
                    "margin": "var(--display-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "4rem !important",
                        "lineHeight": "4.5rem !important"
                    }
                }
            },
            {
                "selector": ".fr-display--lg",
                "style": {
                    "fontWeight": "700 !important",
                    "fontSize": "4rem !important",
                    "lineHeight": "4.5rem !important",
                    "margin": "var(--display-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "4.5rem !important",
                        "lineHeight": "5rem !important"
                    }
                }
            },
            {
                "selector": ".fr-display--xl",
                "style": {
                    "fontWeight": "700 !important",
                    "fontSize": "4.5rem !important",
                    "lineHeight": "5rem !important",
                    "margin": "var(--display-spacing)",
                    "@media (min-width: 48em)": {
                        "fontSize": "5rem !important",
                        "lineHeight": "5.5rem !important"
                    }
                }
            },
            {
                "selector": ".fr-text--alt",
                "style": {
                    "fontFamily": '"Spectral", georgia, serif !important'
                }
            },
            {
                "selector": ".fr-text--xs",
                "style": {
                    "fontSize": "0.75rem !important",
                    "lineHeight": "1.25rem !important",
                    "margin": "var(--text-spacing)"
                }
            },
            {
                "selector": ".fr-text--sm",
                "style": {
                    "fontSize": "0.875rem !important",
                    "lineHeight": "1.5rem !important",
                    "margin": "var(--text-spacing)"
                }
            },
            {
                "selector": ".fr-text--md",
                "style": {
                    "fontSize": "1rem !important",
                    "lineHeight": "1.5rem !important",
                    "margin": "var(--text-spacing)"
                }
            },
            {
                "selector": ".fr-text--lg",
                "style": {
                    "fontSize": "1.125rem !important",
                    "lineHeight": "1.75rem !important",
                    "margin": "var(--text-spacing)"
                }
            },
            {
                "selector": ".fr-text--xl",
                "style": {
                    "fontSize": "1.25rem !important",
                    "lineHeight": "2rem !important",
                    "margin": "var(--text-spacing)"
                }
            },
            {
                "selector": ".fr-text--lead",
                "style": {
                    "fontSize": "1.25rem !important",
                    "lineHeight": "2rem !important",
                    "margin": "var(--text-spacing)"
                }
            }
        ];

        expect(got).toStrictEqual(expected);
    });

console.log("PASS");
