import { generateGetColorDecisionsTsCode } from "../../../bin/css_to_ts/colorDecisions";
import type { ColorDecision } from "../../../bin/css_to_ts/colorDecisions";
import { assert } from "tsafe/assert";

console.log(`Running test ${__filename}`);

const input: ColorDecision[] = [
    {
        "themePath": ["background", "default", "normal", "grey", "hover"],
        "optionThemePath": ["grey", "_1000_50", "hover"]
    },
    {
        "themePath": ["background", "default", "normal", "grey", "default"],
        "optionThemePath": ["grey", "_1000_50", "default"]
    },
    {
        "themePath": ["border", "action", "low", "orangeTerreBattue", "default"],
        "optionThemePath": ["orangeTerreBattue", "_850_200", "default"]
    },
    {
        "themePath": ["background", "altRaised", "normal", "grey", "hover"],
        "optionThemePath": ["grey", "_975_100", "hover"]
    },
    {
        "themePath": ["background", "contrastOverlap", "normal", "grey", "default"],
        "optionThemePath": ["grey", "_950_150", "default"]
    }
];

const expected = `
export function getColorDecisions(
    params: {
        colorOptions: ColorOptions;
    }
) {

    const { colorOptions } = params;

    return {
        "background": {
          "default": {
            "normal": {
              "grey": {
                "hover": colorOptions.grey._1000_50.hover,
                "default": colorOptions.grey._1000_50.default
              }
            }
          },
          "altRaised": {
            "normal": {
              "grey": {
                "hover": colorOptions.grey._975_100.hover
              }
            }
          },
          "contrastOverlap": {
            "normal": {
              "grey": {
                "default": colorOptions.grey._950_150.default
              }
            }
          }
        },
        "border": {
          "action": {
            "low": {
              "orangeTerreBattue": {
                "default": colorOptions.orangeTerreBattue._850_200.default
              }
            }
          }
        }
    } as const;
}`.replace(/^\n/, "");

const got = generateGetColorDecisionsTsCode(input);

assert(got === expected);

console.log("PASS");
