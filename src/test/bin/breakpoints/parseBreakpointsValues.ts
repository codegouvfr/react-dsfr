import { parseBreakpointsValues } from "../../../bin/css_to_ts/breakpoints";
import type { BreakpointsValues } from "../../../bin/css_to_ts/breakpoints";
import { assert } from "tsafe/assert";
import { same } from "evt/tools/inDepth/same";

console.log(`Running test ${__filename}`);

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

@media (min-width: 62em) {
	/*! media lg */
  
	/*! media lg */
	.fr-hidden-lg {
	  display: none !important;
	}
}

@media (min-width: 78em) {
	/*! media xl */
  
	/*! media xl */
	.fr-hidden-xl {
	  display: none !important;
	}
}
`;

const expected: BreakpointsValues = {
    "unit": "em",
    "sm": 36,
    "md": 48,
    "lg": 62,
    "xl": 78
};

const got = parseBreakpointsValues(input);

assert(same(got, expected));

console.log("PASS");
