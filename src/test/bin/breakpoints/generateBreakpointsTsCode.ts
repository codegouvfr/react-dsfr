import { generateBreakpointsTsCode } from "../../../bin/css_to_ts/breakpoints";
import type { BreakpointsValues } from "../../../bin/css_to_ts/breakpoints";
import { assert } from "tsafe/assert";

console.log(`Running test ${__filename}`);

const input: BreakpointsValues = {
    "unit": "em",
    "sm": 36,
    "md": 48,
    "lg": 62,
    "xl": 78
};

const expected = `
import { assert } from "tsafe/assert";
import type { Extends } from "tsafe";

export const breakpointValuesUnit = "em";

export const breakpointKeys = ["xs", "sm", "md", "lg", "xl"] as const;

export type BreakpointKeys = typeof breakpointKeys[number];

export const breakpointValues = {
    "xs": 0,
    "sm": 36,
    "md": 48,
    "lg": 62,
    "xl": 78
} as const;

assert<Extends<typeof breakpointValues, Record<BreakpointKeys, number>>>();
`.replace(/^\n/, "");

const got = generateBreakpointsTsCode(input);

console.log(JSON.stringify(got));
console.log(JSON.stringify(expected));

assert(got === expected);

console.log("PASS");
