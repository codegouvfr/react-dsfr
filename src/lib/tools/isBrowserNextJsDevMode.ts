import { isBrowser } from "./isBrowser";

export const isBrowserNextJsDevMode =
    isBrowser && (window as any).__NEXT_DATA__?.buildId === "development";
