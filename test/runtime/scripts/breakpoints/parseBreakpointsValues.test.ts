import { it, expect } from "vitest";
import { parseBreakpointsValues } from "../../../../scripts/build/cssToTs/breakpoints";
import type {
    BreakpointsValues,
    MediaQueryByBreakpoint
} from "../../../../scripts/build/cssToTs/breakpoints";
//import { assert } from "tsafe/assert";
//import { same } from "evt/tools/inDepth/same";
import { id } from "tsafe";

it("Parsing of breakpoint", () => {
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

    const expected = {
        "breakpointsValues": id<BreakpointsValues>({
            "unit": "em",
            "sm": 36,
            "md": 48,
            "lg": 62,
            "xl": 78
        }),
        "mediaQueryByBreakpoint": id<MediaQueryByBreakpoint>({
            "sm": "(min-width: 36em)",
            "md": "(min-width: 48em)",
            "lg": "(min-width: 62em)",
            "xl": "(min-width: 78em)"
        })
    };

    const got = parseBreakpointsValues(input);

    expect(got).toStrictEqual(expected);
});
