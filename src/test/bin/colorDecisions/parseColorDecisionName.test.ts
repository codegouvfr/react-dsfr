import { createParseColorDecisionName } from "../../../bin/css_to_ts/colorDecisions";
import type { ParsedColorDecisionName } from "../../../bin/css_to_ts/colorDecisions";
import { assert } from "tsafe/assert";
import { same } from "evt/tools/inDepth/same";

console.log(`Running test ${__filename}`);

const rawCssCode = `
:root {
  --grey-1000-50-hover: #ffffff;
  --grey-1000-50: #ffffff;
  --orange-terre-battue-850-200: #ffffff;
  --grey-975-100-hover: #ffffff;
  --grey-950-150: #ffffff;
  --blue-france-sun-113-625: #ffffff;

  --background-default-grey-hover: var(--grey-1000-50-hover);
  --background-default-grey: var(--grey-1000-50);
  --border-action-low-orange-terre-battue: var(--orange-terre-battue-850-200);
  --background-alt-raised-grey-hover: var(--grey-975-100-hover);
  --background-contrast-overlap-grey: var(--grey-950-150);
  --background-action-high-blue-france: var(--blue-france-sun-113-625);

}

:root:where([data-fr-theme="dark"]) {
  --grey-1000-50-hover: #000000;
  --grey-1000-50: #000000;
  --orange-terre-battue-850-200: #000000;
  --grey-975-100-hover: #000000;
  --grey-950-150: #000000;
  --blue-france-sun-113-625: #000000;
}

@media (min-width: 36em) { }
@media (min-width: 48em) { }
@media (min-width: 62em) { }
@media (min-width: 78em) { }
`;

const { parseColorDecisionName } = createParseColorDecisionName(rawCssCode);

{
    const expected: ParsedColorDecisionName = {
        "context": "background",
        "usage": "default",
        "variant": undefined,
        "colorName": "grey",
        "state": "hover"
    };

    const got = parseColorDecisionName("--background-default-grey-hover");

    assert(same(got, expected));

    console.log("PASS 1");
}

{
    const expected: ParsedColorDecisionName = {
        "context": "background",
        "usage": "default",
        "variant": undefined,
        "colorName": "grey",
        "state": undefined
    };

    const got = parseColorDecisionName("--background-default-grey");

    assert(same(got, expected));

    console.log("PASS 2");
}

{
    const expected: ParsedColorDecisionName = {
        "context": "border",
        "usage": "action",
        "variant": "low",
        "colorName": "orangeTerreBattue",
        "state": undefined
    };

    const got = parseColorDecisionName("--border-action-low-orange-terre-battue");

    assert(same(got, expected));

    console.log("PASS 3");
}

{
    const expected: ParsedColorDecisionName = {
        "context": "background",
        "usage": "altRaised",
        "variant": undefined,
        "colorName": "grey",
        "state": "hover"
    };

    const got = parseColorDecisionName("--background-alt-raised-grey-hover");

    assert(same(got, expected));

    console.log("PASS 4");
}

{
    const expected: ParsedColorDecisionName = {
        "context": "background",
        "usage": "contrastOverlap",
        "variant": undefined,
        "colorName": "grey",
        "state": undefined
    };

    const got = parseColorDecisionName("--background-contrast-overlap-grey");

    assert(same(got, expected));

    console.log("PASS 5");
}

{
    const expected: ParsedColorDecisionName = {
        "context": "background",
        "usage": "action",
        "variant": "high",
        "colorName": "blueFrance",
        "state": undefined
    };

    const got = parseColorDecisionName("--background-action-high-blue-france");

    assert(same(got, expected));

    console.log("PASS 6");
}
