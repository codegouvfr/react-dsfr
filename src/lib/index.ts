export { startReactDsfr } from "./start";
export type { Params } from "./start";
export { useIsDark } from "./darkMode";
export * from "./colors";
export type { BreakpointKeys } from "./breakpoints";
import { breakpoints } from "./breakpoints";
import { spacing } from "./spacing";
export type { SpacingToken } from "./spacing";
import { cx } from "./cx";
export type { FrCxArg } from "./cx";
export { DsfrLangProvider } from "./i18n";
export { createDsfrLinkProvider } from "./routing";
export type { RegisterLink, RegisteredLinkProps, HTMLAnchorProps } from "./routing";

export const fr = {
    breakpoints,
    spacing,
    cx
};
