export * from "./colors";
export type { BreakpointKeys } from "./breakpoints";
import { breakpoints } from "./breakpoints";
import { spacing } from "./spacing";
export type { SpacingToken } from "./spacing";
import { cx } from "./cx";
export type { FrCxArg } from "./cx";
export type { ColorTheme } from "./colors";
import { getColors } from "./colors";
export type { FrClassName, FrIconClassName, RiIconClassName } from "./generatedFromCss/classNames";

export const fr = {
    breakpoints,
    spacing,
    cx,
    getColors
};
