import { assert } from "tsafe/assert";
import { isBrowser } from "./isBrowser";

export function getBaseFontSizePx(): number {
    if (!isBrowser) {
        return 16;
    }

    const htmlElement = document.querySelector("html");

    assert(htmlElement !== null);

    const computedStyle = window.getComputedStyle(htmlElement);
    const fontSize = computedStyle.getPropertyValue("font-size");

    const fontSizeInPixels = parseFloat(fontSize);

    return fontSizeInPixels;
}
