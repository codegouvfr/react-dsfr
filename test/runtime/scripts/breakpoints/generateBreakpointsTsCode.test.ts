import { it, expect } from "vitest";
import { generateBreakpointsTsCode } from "../../../../src/scripts/cssToTs/breakpoints";

it("Generation of TS code for breakpoints", () => {
    const input = `
@media (min-width: 36em) {
  /*! media sm */

  /*! media sm */
  .fr-hidden-sm {
    display: none !important;
  }
}

@media (min-width: 48em) {
	/*! media md */

	/*! media md */
	h6 {
	  font-size: 1.25rem;
	  line-height: 1.75rem;
	}
}

@media (min-width: 78em) {
	/*! media xl */
  
	/*! media xl */
	.fr-hidden-xl {
	  display: none !important;
	}
}

@media (min-width: 62em) {
	/*! media lg */
  
	/*! media lg */
	.fr-hidden-lg {
	  display: none !important;
	}
}
`;

    const expected = `
import { assert } from "tsafe/assert";
import type { Extends } from "tsafe";

export const breakpointValuesUnit = "em";

export const breakpointKeys = ["xs", "sm", "md", "lg", "xl"] as const;

export type BreakpointKeys = typeof breakpointKeys[number];

export const breakpointValues = {
    "xs": 0,
    "sm": 36,
    "md": 48,
    "lg": 62,
    "xl": 78
} as const;

assert<Extends<typeof breakpointValues, Record<BreakpointKeys, number>>>();
`.replace(/^\n/, "");

    const got = generateBreakpointsTsCode(input);

    expect(got).toBe(expected);
});
