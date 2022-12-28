import { isBrowser } from "../tools/isBrowser";
import { useIsDarkServerSide } from "./server";
import { useIsDarkClientSide } from "./client";
export type { ColorScheme } from "./client";

export const useIsDark = isBrowser ? useIsDarkClientSide : useIsDarkServerSide;
