export * from "./colors";
export type { BreakpointKeys } from "./breakpoints";
import { spacing } from "./spacing";
export type { SpacingToken } from "./spacing";
export type { FrCxArg } from "./cx";
export type { ColorTheme } from "./colors";
export type { FrClassName, FrIconClassName, RiIconClassName } from "./generatedFromCss/classNames";
export declare const fr: {
    breakpoints: {
        up: (key: "sm" | "md" | "lg" | "xl") => "@media (min-width:36em)" | "@media (min-width:48em)" | "@media (min-width:62em)" | "@media (min-width:78em)";
        down: (key: "sm" | "md" | "lg" | "xl") => `@media (max-width:${number}em)`;
        between: (start: "xs" | "sm" | "md" | "lg" | "xl", end: "xs" | "sm" | "md" | "lg" | "xl") => `@media (min-width:0em) and (max-width:${number}em)` | `@media (min-width:36em) and (max-width:${number}em)` | `@media (min-width:48em) and (max-width:${number}em)` | `@media (min-width:62em) and (max-width:${number}em)` | `@media (min-width:78em) and (max-width:${number}em)`;
        only: (key: "xs" | "sm" | "md" | "lg" | "xl") => "@media (min-width:36em)" | "@media (min-width:48em)" | "@media (min-width:62em)" | "@media (min-width:78em)" | `@media (min-width:0em) and (max-width:${number}em)` | `@media (min-width:36em) and (max-width:${number}em)` | `@media (min-width:48em) and (max-width:${number}em)` | `@media (min-width:62em) and (max-width:${number}em)` | `@media (min-width:78em) and (max-width:${number}em)`;
        not: (key: "xs" | "sm" | "md" | "lg" | "xl") => string;
        getBreakpointsValues: () => import("./breakpoints").BreakpointsValues;
    };
    spacing: typeof spacing;
    cx: (...args: import("./cx").FrCxArg[]) => string;
    getColors: (isDark: boolean) => import("./colors").ColorTheme;
    typography: readonly [{
        readonly selector: "h6";
        readonly style: {
            readonly [x: string]: "1.5rem" | 700 | "1.125rem" | "var(--title-spacing)" | "var(--text-title-grey)" | {
                readonly fontSize: "1.25rem";
                readonly lineHeight: "1.75rem";
            };
            readonly fontWeight: 700;
            readonly fontSize: "1.125rem";
            readonly lineHeight: "1.5rem";
            readonly margin: "var(--title-spacing)";
            readonly color: "var(--text-title-grey)";
        };
    }, {
        readonly selector: "h5";
        readonly style: {
            readonly [x: string]: "1.25rem" | "1.75rem" | 700 | "var(--title-spacing)" | "var(--text-title-grey)" | {
                readonly fontSize: "1.375rem";
                readonly lineHeight: "1.75rem";
            };
            readonly fontWeight: 700;
            readonly fontSize: "1.25rem";
            readonly lineHeight: "1.75rem";
            readonly margin: "var(--title-spacing)";
            readonly color: "var(--text-title-grey)";
        };
    }, {
        readonly selector: "h4";
        readonly style: {
            readonly [x: string]: "1.75rem" | 700 | "var(--title-spacing)" | "var(--text-title-grey)" | "1.375rem" | {
                readonly fontSize: "1.5rem";
                readonly lineHeight: "2rem";
            };
            readonly fontWeight: 700;
            readonly fontSize: "1.375rem";
            readonly lineHeight: "1.75rem";
            readonly margin: "var(--title-spacing)";
            readonly color: "var(--text-title-grey)";
        };
    }, {
        readonly selector: "h3";
        readonly style: {
            readonly [x: string]: "1.5rem" | "2rem" | 700 | "var(--title-spacing)" | "var(--text-title-grey)" | {
                readonly fontSize: "1.75rem";
                readonly lineHeight: "2.25rem";
            };
            readonly fontWeight: 700;
            readonly fontSize: "1.5rem";
            readonly lineHeight: "2rem";
            readonly margin: "var(--title-spacing)";
            readonly color: "var(--text-title-grey)";
        };
    }, {
        readonly selector: "h2";
        readonly style: {
            readonly [x: string]: "1.75rem" | "2.25rem" | 700 | "var(--title-spacing)" | "var(--text-title-grey)" | {
                readonly fontSize: "2rem";
                readonly lineHeight: "2.5rem";
            };
            readonly fontWeight: 700;
            readonly fontSize: "1.75rem";
            readonly lineHeight: "2.25rem";
            readonly margin: "var(--title-spacing)";
            readonly color: "var(--text-title-grey)";
        };
    }, {
        readonly selector: "h1";
        readonly style: {
            readonly [x: string]: "2rem" | "2.5rem" | 700 | "var(--title-spacing)" | "var(--text-title-grey)" | {
                readonly fontSize: "2.5rem";
                readonly lineHeight: "3rem";
            };
            readonly fontWeight: 700;
            readonly fontSize: "2rem";
            readonly lineHeight: "2.5rem";
            readonly margin: "var(--title-spacing)";
            readonly color: "var(--text-title-grey)";
        };
    }, {
        readonly selector: "p";
        readonly style: {
            readonly fontSize: "1rem";
            readonly lineHeight: "1.5rem";
            readonly margin: "var(--text-spacing)";
        };
    }, {
        readonly selector: ".fr-text--light";
        readonly style: {
            readonly fontWeight: "300 !important";
        };
    }, {
        readonly selector: ".fr-text--regular";
        readonly style: {
            readonly fontWeight: "400 !important";
        };
    }, {
        readonly selector: ".fr-text--bold";
        readonly style: {
            readonly fontWeight: "700 !important";
        };
    }, {
        readonly selector: ".fr-text--heavy";
        readonly style: {
            readonly fontWeight: "900 !important";
        };
    }, {
        readonly selector: ".fr-display--xs";
        readonly style: {
            readonly [x: string]: "700 !important" | "2.5rem !important" | "3rem !important" | "var(--display-spacing)" | {
                readonly fontSize: "3rem !important";
                readonly lineHeight: "3.5rem !important";
            };
            readonly fontWeight: "700 !important";
            readonly fontSize: "2.5rem !important";
            readonly lineHeight: "3rem !important";
            readonly margin: "var(--display-spacing)";
        };
    }, {
        readonly selector: ".fr-display--sm";
        readonly style: {
            readonly [x: string]: "700 !important" | "3rem !important" | "var(--display-spacing)" | "3.5rem !important" | {
                readonly fontSize: "3.5rem !important";
                readonly lineHeight: "4rem !important";
            };
            readonly fontWeight: "700 !important";
            readonly fontSize: "3rem !important";
            readonly lineHeight: "3.5rem !important";
            readonly margin: "var(--display-spacing)";
        };
    }, {
        readonly selector: ".fr-display--md";
        readonly style: {
            readonly [x: string]: "700 !important" | "var(--display-spacing)" | "3.5rem !important" | "4rem !important" | {
                readonly fontSize: "4rem !important";
                readonly lineHeight: "4.5rem !important";
            };
            readonly fontWeight: "700 !important";
            readonly fontSize: "3.5rem !important";
            readonly lineHeight: "4rem !important";
            readonly margin: "var(--display-spacing)";
        };
    }, {
        readonly selector: ".fr-display--lg";
        readonly style: {
            readonly [x: string]: "700 !important" | "var(--display-spacing)" | "4rem !important" | "4.5rem !important" | {
                readonly fontSize: "4.5rem !important";
                readonly lineHeight: "5rem !important";
            };
            readonly fontWeight: "700 !important";
            readonly fontSize: "4rem !important";
            readonly lineHeight: "4.5rem !important";
            readonly margin: "var(--display-spacing)";
        };
    }, {
        readonly selector: ".fr-display--xl";
        readonly style: {
            readonly [x: string]: "700 !important" | "var(--display-spacing)" | "4.5rem !important" | "5rem !important" | {
                readonly fontSize: "5rem !important";
                readonly lineHeight: "5.5rem !important";
            };
            readonly fontWeight: "700 !important";
            readonly fontSize: "4.5rem !important";
            readonly lineHeight: "5rem !important";
            readonly margin: "var(--display-spacing)";
        };
    }, {
        readonly selector: ".fr-text--alt";
        readonly style: {
            readonly fontFamily: "\"Spectral\", georgia, serif !important";
        };
    }, {
        readonly selector: ".fr-text--xs";
        readonly style: {
            readonly fontSize: "0.75rem !important";
            readonly lineHeight: "1.25rem !important";
            readonly margin: "var(--text-spacing)";
        };
    }, {
        readonly selector: ".fr-text--sm";
        readonly style: {
            readonly fontSize: "0.875rem !important";
            readonly lineHeight: "1.5rem !important";
            readonly margin: "var(--text-spacing)";
        };
    }, {
        readonly selector: ".fr-text--md";
        readonly style: {
            readonly fontSize: "1rem !important";
            readonly lineHeight: "1.5rem !important";
            readonly margin: "var(--text-spacing)";
        };
    }, {
        readonly selector: ".fr-text--lg";
        readonly style: {
            readonly fontSize: "1.125rem !important";
            readonly lineHeight: "1.75rem !important";
            readonly margin: "var(--text-spacing)";
        };
    }, {
        readonly selector: ".fr-text--xl";
        readonly style: {
            readonly fontSize: "1.25rem !important";
            readonly lineHeight: "2rem !important";
            readonly margin: "var(--text-spacing)";
        };
    }, {
        readonly selector: ".fr-text--lead";
        readonly style: {
            readonly fontSize: "1.25rem !important";
            readonly lineHeight: "2rem !important";
            readonly margin: "var(--text-spacing)";
        };
    }];
};
