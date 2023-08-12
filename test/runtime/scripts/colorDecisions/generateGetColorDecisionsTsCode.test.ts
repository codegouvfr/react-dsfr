import { it, expect } from "vitest";
import { generateGetColorDecisionsTsCode } from "../../../../scripts/build/cssToTs/colorDecisions";

it("Generates the correct TS code for breakpoints", () => {
    const input = `
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

    const expected = `
export function getColorDecisions<Format extends "css var" | "hex">(
    params: {
        colorOptions: ColorOptions<Format>;
    }
) {

    const { colorOptions } = params;

    return {
        "background": {
          "default": {
            "grey": {
              "hover": colorOptions.grey._1000_50.hover,
              "default": colorOptions.grey._1000_50.default
            }
          },
          "altRaised": {
            "grey": {
              "hover": colorOptions.grey._975_100.hover
            }
          },
          "contrastOverlap": {
            "grey": {
              "default": colorOptions.grey._950_150.default
            }
          }
        },
        "border": {
          "actionLow": {
            "orangeTerreBattue": {
              "default": colorOptions.orangeTerreBattue._850_200.default
            }
          }
        }
    } as const;
}`.replace(/^\n/, "");

    const got = generateGetColorDecisionsTsCode(input);

    expect(got).toBe(expected);
});
