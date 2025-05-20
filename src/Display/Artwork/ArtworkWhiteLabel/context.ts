import { JSX } from "../../../tools/JSX";
import { createContext } from "react";

export const context = createContext<
    ((props: { theme: "light" | "dark" | "system"; sizePx: number }) => JSX.Element) | undefined
>(undefined);
