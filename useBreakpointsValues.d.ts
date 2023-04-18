import { type BreakpointKeys, type BreakpointsValues } from "./fr/breakpoints";
export type { BreakpointKeys, BreakpointsValues };
/** Return the breakpoint values in px, the values ger refreshed
 *  when the base font size change.  */
export declare function useBreakpointsValues(): {
    breakpointsValues: BreakpointsValues;
};
