import { parseColorDecision } from "../../../bin/css_to_ts/colorDecisions";
import type { ColorDecision } from "../../../bin/css_to_ts/colorDecisions";
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

  --background-default-grey-hover: var(--grey-1000-50-hover);
  --background-default-grey: var(--grey-1000-50);
  --border-action-low-orange-terre-battue: var(--orange-terre-battue-850-200);
  --background-alt-raised-grey-hover: var(--grey-975-100-hover);
  --background-contrast-overlap-grey: var(--grey-950-150);
}

:root:where([data-fr-theme="dark"]) {
  --grey-1000-50-hover: #000000;
  --grey-1000-50: #000000;
  --orange-terre-battue-850-200: #000000;
  --grey-975-100-hover: #000000;
  --grey-950-150: #000000;
}

@media (min-width: 36em) { }

@media (min-width: 48em) { }

@media (min-width: 62em) { }

@media (min-width: 78em) { }
`;

const got = parseColorDecision(rawCssCode);

const expected: ColorDecision[] = [
    {
        "themePath": ["background", "default", "grey", "hover"],
        "optionThemePath": ["grey", "_1000_50", "hover"]
    },
    {
        "themePath": ["background", "default", "grey", "default"],
        "optionThemePath": ["grey", "_1000_50", "default"]
    },
    {
        "themePath": ["border", "actionLow", "orangeTerreBattue", "default"],
        "optionThemePath": ["orangeTerreBattue", "_850_200", "default"]
    },
    {
        "themePath": ["background", "altRaised", "grey", "hover"],
        "optionThemePath": ["grey", "_975_100", "hover"]
    },
    {
        "themePath": ["background", "contrastOverlap", "grey", "default"],
        "optionThemePath": ["grey", "_950_150", "default"]
    }
];

assert(same(got, expected));

console.log("PASS");
