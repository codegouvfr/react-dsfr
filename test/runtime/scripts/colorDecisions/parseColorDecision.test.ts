import { it, expect } from "vitest";
import { parseColorDecision } from "../../../../scripts/build/cssToTs/colorDecisions";
import type { ColorDecision } from "../../../../scripts/build/cssToTs/colorDecisions";

it("Color decisions to be successfully parsed", () => {
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

:root[data-fr-theme=dark] {
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
            "colorDecisionName": "--background-default-grey-hover",
            "themePath": ["background", "default", "grey", "hover"],
            "parsedColorDecisionName": {
                "variant": undefined,
                "state": "hover",
                "context": "background",
                "colorName": "grey",
                "usage": "default"
            },
            "optionThemePath": ["grey", "_1000_50", "hover"]
        },
        {
            "colorDecisionName": "--background-default-grey",
            "themePath": ["background", "default", "grey", "default"],
            "parsedColorDecisionName": {
                "variant": undefined,
                "state": undefined,
                "context": "background",
                "colorName": "grey",
                "usage": "default"
            },
            "optionThemePath": ["grey", "_1000_50", "default"]
        },
        {
            "colorDecisionName": "--border-action-low-orange-terre-battue",
            "themePath": ["border", "actionLow", "orangeTerreBattue", "default"],
            "parsedColorDecisionName": {
                "variant": "low",
                "state": undefined,
                "context": "border",
                "colorName": "orangeTerreBattue",
                "usage": "action"
            },
            "optionThemePath": ["orangeTerreBattue", "_850_200", "default"]
        },
        {
            "colorDecisionName": "--background-alt-raised-grey-hover",
            "themePath": ["background", "altRaised", "grey", "hover"],
            "parsedColorDecisionName": {
                "variant": undefined,
                "state": "hover",
                "context": "background",
                "colorName": "grey",
                "usage": "altRaised"
            },
            "optionThemePath": ["grey", "_975_100", "hover"]
        },
        {
            "colorDecisionName": "--background-contrast-overlap-grey",
            "themePath": ["background", "contrastOverlap", "grey", "default"],
            "parsedColorDecisionName": {
                "variant": undefined,
                "state": undefined,
                "context": "background",
                "colorName": "grey",
                "usage": "contrastOverlap"
            },
            "optionThemePath": ["grey", "_950_150", "default"]
        }
    ];

    expect(got).toStrictEqual(expected);
});
