import type { BreakpointKeys } from "./generatedFromCss/breakpoints";
export type { BreakpointKeys };
/** Breakpoint values in px */
export type BreakpointsValues = Record<BreakpointKeys, number>;
export declare const breakpoints: {
    up: (key: Exclude<BreakpointKeys, "xs">) => "@media (min-width:36em)" | "@media (min-width:48em)" | "@media (min-width:62em)" | "@media (min-width:78em)";
    down: (key: Exclude<BreakpointKeys, "xs">) => `@media (max-width:${number}em)`;
    between: (start: BreakpointKeys, end: BreakpointKeys) => `@media (min-width:0em) and (max-width:${number}em)` | `@media (min-width:36em) and (max-width:${number}em)` | `@media (min-width:48em) and (max-width:${number}em)` | `@media (min-width:62em) and (max-width:${number}em)` | `@media (min-width:78em) and (max-width:${number}em)`;
    only: (key: BreakpointKeys) => "@media (min-width:36em)" | "@media (min-width:48em)" | "@media (min-width:62em)" | "@media (min-width:78em)" | `@media (min-width:0em) and (max-width:${number}em)` | `@media (min-width:36em) and (max-width:${number}em)` | `@media (min-width:48em) and (max-width:${number}em)` | `@media (min-width:62em) and (max-width:${number}em)` | `@media (min-width:78em) and (max-width:${number}em)`;
    not: (key: BreakpointKeys) => string;
    /**
     * Returns the breakpoint values in px.
     *
     * Warning: It reflects the values at a given time, if the root font size changes so will the breakpointsValues.
     * Plus this function is rather expensive to call.
     * If you're in react you should use the
     * import { useBreakpointsValues } from "@codegouvfr/react-dsfr/useBreakpointsValues";
     */
    getBreakpointsValues: () => BreakpointsValues;
};