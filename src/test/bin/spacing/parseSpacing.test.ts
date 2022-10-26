import { parseSpacing } from "../../../bin/css_to_ts/spacing";
import type { SpacingTokenAndValue } from "../../../bin/css_to_ts/spacing";
import { assert } from "tsafe/assert";
import { same } from "evt/tools/inDepth/same";

console.log(`Running test ${__filename}`);

const input = `
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
`;

const expected: SpacingTokenAndValue[] = [
    {
        "token": "7v",
        "value": "1.75rem"
    },
    {
        "token": "7v",
        "value": "1.75rem"
    }
];

const got = parseSpacing(input);

assert(same(got, expected));

console.log("PASS");
