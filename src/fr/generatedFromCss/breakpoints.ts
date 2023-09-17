// This file is generated automatically by scripts/build/cssToTs/cssToTs.ts, please don't edit.

import { assert } from "tsafe/assert";
import type { Extends } from "tsafe";

export const breakpointsValuesUnit = "em";

export const breakpointKeys = ["xs", "sm", "md", "lg", "xl"] as const;

export type BreakpointKeys = typeof breakpointKeys[number];

export const breakpointsValues = {
    "xs": 0,
    "sm": 36,
    "md": 48,
    "lg": 62,
    "xl": 78
} as const;

assert<Extends<typeof breakpointsValues, Record<BreakpointKeys, number>>>();
