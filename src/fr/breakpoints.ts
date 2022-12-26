import type { BreakpointKeys } from "./generatedFromCss/breakpoints";
import {
    breakpointValues as values,
    breakpointValuesUnit as unit,
    breakpointKeys as keys
} from "./generatedFromCss/breakpoints";
import { assert } from "tsafe/assert";

export type { BreakpointKeys };

const epsilon = 0.003125;

export const breakpoints = {
    "up": (key: Exclude<BreakpointKeys, "xs">) =>
        `@media (min-width:${values[key]}${unit})` as const,
    "down": (key: Exclude<BreakpointKeys, "xs">) =>
        `@media (max-width:${values[key] - epsilon}${unit})` as const,
    "between": (start: BreakpointKeys, end: BreakpointKeys) =>
        `@media (min-width:${values[start]}${unit}) and (max-width:${
            values[end] - epsilon
        }${unit})` as const,
    "only": (key: BreakpointKeys) =>
        keys.indexOf(key) + 1 < keys.length
            ? breakpoints.between(key, keys[keys.indexOf(key) + 1])
            : breakpoints.up((assert(key !== "xs"), key)),
    "not": (key: BreakpointKeys) => {
        // handle first and last key separately, for better readability
        const keyIndex = keys.indexOf(key);
        if (keyIndex === 0) {
            return breakpoints.up(keys[1]);
        }
        if (keyIndex === keys.length - 1) {
            const key = keys[keyIndex];
            assert(key !== "xs");
            return breakpoints.down(key);
        }

        return breakpoints
            .between(key, keys[keys.indexOf(key) + 1])
            .replace("@media", "@media not all and");
    }
};
