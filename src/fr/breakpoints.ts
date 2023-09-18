import type { BreakpointKeys } from "./generatedFromCss/breakpoints";
import {
    breakpointsValues as values,
    breakpointsValuesUnit as unit,
    breakpointKeys as keys
} from "./generatedFromCss/breakpoints";
import { type Equals, assert } from "tsafe/assert";
import { getBaseFontSizePx } from "../tools/getBaseFontSizePx";

export type { BreakpointKeys };

/** Breakpoint values in px */
export type BreakpointsValues = Record<BreakpointKeys, number>;

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
    },
    "values": (() => {
        const out = {
            ...(() => {
                const key = "xs" satisfies BreakpointKeys;

                return { [key]: `${values[key]}${unit}` as const };
            })(),
            ...(() => {
                const key = "sm" satisfies BreakpointKeys;

                return { [key]: `${values[key]}${unit}` as const };
            })(),
            ...(() => {
                const key = "md" satisfies BreakpointKeys;

                return { [key]: `${values[key]}${unit}` as const };
            })(),
            ...(() => {
                const key = "lg" satisfies BreakpointKeys;

                return { [key]: `${values[key]}${unit}` as const };
            })(),
            ...(() => {
                const key = "xl" satisfies BreakpointKeys;

                return { [key]: `${values[key]}${unit}` as const };
            })()
        } as const;

        assert<Equals<keyof typeof out, BreakpointKeys>>();

        return out;
    })(),
    "valuesUnit": unit,
    "emValues": (() => {
        assert<Equals<typeof unit, "em">>();

        return values;
    })(),
    /**
     * Returns the breakpoint values in px.
     *
     * Warning: It reflects the values at a given time, if the root font size changes so will the breakpointsValues.
     * Plus this function is rather expensive to call.
     * If you're in react you should use the
     * import { useBreakpointsValuesPx } from "@codegouvfr/react-dsfr/useBreakpointsValuesPx";
     */
    "getPxValues": (): BreakpointsValues => {
        assert<Equals<typeof unit, "em">>();

        const factor = getBaseFontSizePx();

        return Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value * factor])
        ) as any;
    },
    /** @deprecated use breakpoints.values if you're ok with getting the value in em or breakpoints.getPxValues() if you want the value in pixel */
    "getBreakpointsValues": () => breakpoints.getPxValues()
};
