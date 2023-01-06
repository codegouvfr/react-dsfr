import { it, expect } from "vitest";
import { resolveColorHexCodeToDecision } from "../../../src/fr/colorResolver";

it("Resolve to the correct color decision", () => {
    const got = resolveColorHexCodeToDecision({
        "hexColorCode": "#474747"
    });

    const expected = [
        {
            "cssVarName": "--background-default-grey-active",
            "decisionObjectPath": ["background", "default", "grey", "active"],
            "option": {
                "color": {
                    "light": "#ededed",
                    "dark": "#474747"
                },
                "optionObjectPath": ["grey", "_1000_50", "active"],
                "cssVarName": "--grey-1000-50-active"
            }
        },
        {
            "cssVarName": "--background-contrast-grey-hover",
            "decisionObjectPath": ["background", "contrast", "grey", "hover"],
            "option": {
                "color": {
                    "light": "#d2d2d2",
                    "dark": "#474747"
                },
                "optionObjectPath": ["grey", "_950_100", "hover"],
                "cssVarName": "--grey-950-100-hover"
            }
        },
        {
            "cssVarName": "--background-overlap-grey-hover",
            "decisionObjectPath": ["background", "overlap", "grey", "hover"],
            "option": {
                "color": {
                    "light": "#f6f6f6",
                    "dark": "#474747"
                },
                "optionObjectPath": ["grey", "_1000_100", "hover"],
                "cssVarName": "--grey-1000-100-hover"
            }
        },
        {
            "cssVarName": "--background-alt-raised-grey-hover",
            "decisionObjectPath": ["background", "altRaised", "grey", "hover"],
            "option": {
                "color": {
                    "light": "#dfdfdf",
                    "dark": "#474747"
                },
                "optionObjectPath": ["grey", "_975_100", "hover"],
                "cssVarName": "--grey-975-100-hover"
            }
        }
    ];

    expect(got).toStrictEqual(expected);
});
