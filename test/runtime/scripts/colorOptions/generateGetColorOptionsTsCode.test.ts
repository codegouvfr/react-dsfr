import { it, expect } from "vitest";
import { generateGetColorOptionsTsCode } from "../../../../scripts/build/cssToTs/colorOptions";

it("Generate the correct TS code for colors options", () => {
    const input = `
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
:root:where([data-fr-theme=dark]) {
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

@media (min-width: 36em) { }
@media (min-width: 48em) { }
@media (min-width: 62em) { }
@media (min-width: 78em) { }
`;

    const expected = `
export function getColorOptions(
    params: {
        isDark: boolean;
    }
) {

    const { isDark } = params;

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

    expect(got).toBe(expected);
});
