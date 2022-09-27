import { parseColorOptions } from "../../../bin/css_to_ts/colorOptions";
import type { ColorOption } from "../../../bin/css_to_ts/colorOptions";
import { same } from "evt/tools/inDepth/same";
import { assert } from "tsafe/assert";

console.log(`Running test ${__filename}`);

const rawCssCode = `
:root {
  --name1-name2-111: #000000;
  --name1-name2-111-hover: #000001;
  --name1-name2-sun-111: #000002;
  --name1-name2-sun-111-hover: #000003;
  --name1-name2-111-222: #000004;
  --name1-name2-111-222-hover: #000005;
  --name1-name2-sun-111-222: #000006;
  --name1-name2-sun-111-222-hover: #000007;
  --name1-name2-111-moon-222: #000008;
  --name1-name2-111-moon-222-hover: #000009;
  --name1-name2-sun-111-moon-222: #00000a;
  --name1-name2-sun-111-moon-222-hover: #00000b;
  --grey-1000-50-hover: #00000c;
  --blue-france-sun-113-625: #00000d;
  --blue-france-sun-113-625-active: #00000e;
  --blue-france-main-525: #00000f;
  --purple-glycine-sun-319-moon-630-hover: #000010;

  --title-spacing: 0 0 1.5rem;
  --display-spacing: 0 0 2rem;
  --background-default-grey: var(--grey-1000-50);
  --background-default-grey-hover: var(--grey-1000-50-hover);
}
:root:where([data-fr-theme="dark"]) {
  --name1-name2-111-222: #100000;
  --name1-name2-111-222-hover: #200000;
  --name1-name2-sun-111-222: #300000;
  --name1-name2-sun-111-222-hover: #400000;
  --name1-name2-111-moon-222: #500000;
  --name1-name2-111-moon-222-hover: #600000;
  --name1-name2-sun-111-moon-222: #700000;
  --name1-name2-sun-111-moon-222-hover: #800000;
  --grey-1000-50-hover: #900000;
  --blue-france-sun-113-625: #a00000;
  --blue-france-sun-113-625-active: #b00000;
  --purple-glycine-sun-319-moon-630-hover: #c00000;

  --name1-name2-111: #000000;
  --name1-name2-111-hover: #000001;
  --name1-name2-sun-111: #000002;
  --name1-name2-sun-111-hover: #000003;
  --blue-france-main-525: #00000f;
}
`;

const got = parseColorOptions(rawCssCode);

const expected: ColorOption[] = [
    {
        "themePath": ["name1Name2", "_111", "default"],
        "color": "#000000"
    },
    {
        "themePath": ["name1Name2", "_111", "hover"],
        "color": "#000001"
    },
    {
        "themePath": ["name1Name2", "sun111", "default"],
        "color": "#000002"
    },
    {
        "themePath": ["name1Name2", "sun111", "hover"],
        "color": "#000003"
    },
    {
        "themePath": ["name1Name2", "_111_222", "default"],
        "color": { "light": "#000004", "dark": "#100000" }
    },
    {
        "themePath": ["name1Name2", "_111_222", "hover"],
        "color": { "light": "#000005", "dark": "#200000" }
    },
    {
        "themePath": ["name1Name2", "sun111_222", "default"],
        "color": { "light": "#000006", "dark": "#300000" }
    },
    {
        "themePath": ["name1Name2", "sun111_222", "hover"],
        "color": { "light": "#000007", "dark": "#400000" }
    },
    {
        "themePath": ["name1Name2", "_111moon222", "default"],
        "color": { "light": "#000008", "dark": "#500000" }
    },
    {
        "themePath": ["name1Name2", "_111moon222", "hover"],
        "color": { "light": "#000009", "dark": "#600000" }
    },
    {
        "themePath": ["name1Name2", "sun111moon222", "default"],
        "color": { "light": "#00000a", "dark": "#700000" }
    },
    {
        "themePath": ["name1Name2", "sun111moon222", "hover"],
        "color": { "light": "#00000b", "dark": "#800000" }
    },
    {
        "themePath": ["grey", "_1000_50", "hover"],
        "color": { "light": "#00000c", "dark": "#900000" }
    },
    {
        "themePath": ["blueFrance", "sun113_625", "default"],
        "color": { "light": "#00000d", "dark": "#a00000" }
    },
    {
        "themePath": ["blueFrance", "sun113_625", "active"],
        "color": { "light": "#00000e", "dark": "#b00000" }
    },
    {
        "themePath": ["blueFrance", "main525", "default"],
        "color": "#00000f"
    },
    {
        "themePath": ["purpleGlycine", "sun319moon630", "hover"],
        "color": { "light": "#000010", "dark": "#c00000" }
    }
];

assert(same(expected, got));

console.log("PASS");
