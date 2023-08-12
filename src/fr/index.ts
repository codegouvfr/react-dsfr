export * from "./colors";
export type { BreakpointKeys } from "./breakpoints";
import { breakpoints } from "./breakpoints";
import { spacing } from "./spacing";
export type { SpacingToken } from "./spacing";
import { cx } from "./cx";
export type { FrCxArg } from "./cx";
export type { Colors } from "./colors";
export type { ColorOptions } from "./generatedFromCss/colorOptions";
export type { ColorDecisions } from "./generatedFromCss/getColorDecisions";
import { colors } from "./colors";
export type { FrClassName, FrIconClassName, RiIconClassName } from "./generatedFromCss/classNames";
import { typography } from "./generatedFromCss/typography";

export const fr = {
    breakpoints,
    spacing,
    cx,
    colors,
    typography
};
