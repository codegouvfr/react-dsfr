import { generateGetColorOptionsTsCode } from "../../../bin/css_to_ts/colorOptions";
import type { ColorOption } from "../../../bin/css_to_ts/colorOptions";
import { assert } from "tsafe/assert";

console.log(`Running test ${__filename}`);

const input: ColorOption[] = [
    {
        "colorOptionName": "--name1-name2-111",
        "themePath": ["name1Name2", "_111", "default"],
        "color": "#000000"
    },
    {
        "colorOptionName": "--name1-name2-111-hover",
        "themePath": ["name1Name2", "_111", "hover"],
        "color": "#000001"
    },
    {
        "colorOptionName": "--name1-name2-sun-111",
        "themePath": ["name1Name2", "sun111", "default"],
        "color": "#000002"
    },
    {
        "colorOptionName": "--name1-name2-sun-111-hover",
        "themePath": ["name1Name2", "sun111", "hover"],
        "color": "#000003"
    },
    {
        "colorOptionName": "--name1-name2-111-222",
        "themePath": ["name1Name2", "_111_222", "default"],
        "color": { "light": "#000004", "dark": "#100000" }
    },
    {
        "colorOptionName": "--name1-name2-111-222-hover",
        "themePath": ["name1Name2", "_111_222", "hover"],
        "color": { "light": "#000005", "dark": "#200000" }
    },
    {
        "colorOptionName": "--name1-name2-sun-111-222",
        "themePath": ["name1Name2", "sun111_222", "default"],
        "color": { "light": "#000006", "dark": "#300000" }
    },
    {
        "colorOptionName": "--name1-name2-sun-111-222-hover",
        "themePath": ["name1Name2", "sun111_222", "hover"],
        "color": { "light": "#000007", "dark": "#400000" }
    },
    {
        "colorOptionName": "--name1-name2-111-moon-222",
        "themePath": ["name1Name2", "_111moon222", "default"],
        "color": { "light": "#000008", "dark": "#500000" }
    },
    {
        "colorOptionName": "--name1-name2-111-moon-222-hover",
        "themePath": ["name1Name2", "_111moon222", "hover"],
        "color": { "light": "#000009", "dark": "#600000" }
    },
    {
        "colorOptionName": "--name1-name2-sun-111-moon-222",
        "themePath": ["name1Name2", "sun111moon222", "default"],
        "color": { "light": "#00000a", "dark": "#700000" }
    },
    {
        "colorOptionName": "--name1-name2-sun-111-moon-222-hover",
        "themePath": ["name1Name2", "sun111moon222", "hover"],
        "color": { "light": "#00000b", "dark": "#800000" }
    },
    {
        "colorOptionName": "--grey-1000-50-hover",
        "themePath": ["grey", "_1000_50", "hover"],
        "color": { "light": "#00000c", "dark": "#900000" }
    },
    {
        "colorOptionName": "--blue-france-sun-113-625",
        "themePath": ["blueFrance", "sun113_625", "default"],
        "color": { "light": "#00000d", "dark": "#a00000" }
    },
    {
        "colorOptionName": "--blue-france-sun-113-625-active",
        "themePath": ["blueFrance", "sun113_625", "active"],
        "color": { "light": "#00000e", "dark": "#b00000" }
    },
    {
        "colorOptionName": "--blue-france-main-525",
        "themePath": ["blueFrance", "main525", "default"],
        "color": "#00000f"
    },
    {
        "colorOptionName": "--purple-glycine-sun-319-moon-630-hover",
        "themePath": ["purpleGlycine", "sun319moon630", "hover"],
        "color": { "light": "#000010", "dark": "#c00000" }
    }
];

const expected = `
export function getColorOptions(colorScheme: ColorScheme) {
    const isDark: boolean = (() => {
        switch (colorScheme) {
            case "dark": return true;
            case "light": return false;
        }
    })();

    return {
        "name1Name2": {
          "_111": {
            "default": "#000000",
            "hover": "#000001"
          },
          "sun111": {
            "default": "#000002",
            "hover": "#000003"
          },
          "_111_222": {
            "default": isDark ? "#100000" : "#000004",
            "hover": isDark ? "#200000" : "#000005"
          },
          "sun111_222": {
            "default": isDark ? "#300000" : "#000006",
            "hover": isDark ? "#400000" : "#000007"
          },
          "_111moon222": {
            "default": isDark ? "#500000" : "#000008",
            "hover": isDark ? "#600000" : "#000009"
          },
          "sun111moon222": {
            "default": isDark ? "#700000" : "#00000a",
            "hover": isDark ? "#800000" : "#00000b"
          }
        },
        "grey": {
          "_1000_50": {
            "hover": isDark ? "#900000" : "#00000c"
          }
        },
        "blueFrance": {
          "sun113_625": {
            "default": isDark ? "#a00000" : "#00000d",
            "active": isDark ? "#b00000" : "#00000e"
          },
          "main525": {
            "default": "#00000f"
          }
        },
        "purpleGlycine": {
          "sun319moon630": {
            "hover": isDark ? "#c00000" : "#000010"
          }
        }
    } as const;
}`.replace(/^\n/, "");

const got = generateGetColorOptionsTsCode(input);

assert(got === expected);

console.log("PASS");
