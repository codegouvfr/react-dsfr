import { assert } from "tsafe/assert";
import { isBrowser } from "../tools/isBrowser";
import { useIsDarkServerSide } from "./server";
import { useIsDarkClientSide, getIsDarkClientSide } from "./client";
export type { ColorScheme } from "./client";

export const useIsDark = isBrowser ? useIsDarkClientSide : useIsDarkServerSide;

export const getIsDark = () => {
    assert(isBrowser, "getIsDark can only be used on the client side");

    return getIsDarkClientSide();
};
