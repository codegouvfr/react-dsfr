export * from "./start";
export { useIsDark, $isDark } from "./darkMode";
export * from "./colors";
export type { BreakpointKeys } from "./breakpoints";
import { breakpoints } from "./breakpoints";
import { spacing } from "./spacing";
export type { SpacingToken } from "./spacing";

export const fr = {
    breakpoints,
    spacing
};
