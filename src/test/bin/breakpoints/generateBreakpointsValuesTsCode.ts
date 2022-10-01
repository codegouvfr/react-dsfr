import { generateBreakpointsValuesTsCode } from "../../../bin/css_to_ts/breakpoints";
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
export const breakpointsValues = {
    "unit": "em",
    "sm": 36,
    "md": 48,
    "lg": 62,
    "xl": 78
} as const;`.replace(/^\n/, "");

const got = generateBreakpointsValuesTsCode(input);

assert(got === expected);

console.log("PASS");
