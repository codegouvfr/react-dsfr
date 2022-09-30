import { generateGetColorDecisionsTsCode } from "../../../bin/css_to_ts/colorDecisions";
import type { ColorDecision } from "../../../bin/css_to_ts/colorDecisions";
import { assert } from "tsafe/assert";

console.log(`Running test ${__filename}`);

const input: ColorDecision[] = [
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

assert(got === expected, "xxxx::");

console.log("PASS");
