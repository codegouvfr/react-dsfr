import { type BreakpointKeys, type BreakpointsValues } from "./fr/breakpoints";
import { useBreakpointsValuesPx } from "./useBreakpointsValuesPx";

export type { BreakpointKeys, BreakpointsValues };

/** @deprecated Use import { useBreakpointsValuesPx } from "@codegouvfr/react-dsfr/useBreakpointsValuesPx"; instead */
export const useBreakpointsValues = useBreakpointsValuesPx;