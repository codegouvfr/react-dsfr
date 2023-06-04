import { assert } from "tsafe/assert";

import type { ColorScheme } from "../../useIsDark";

export type DefaultColorScheme = ColorScheme | "system";

let defaultColorSchemeServerSide: DefaultColorScheme | undefined = undefined;

export function getDefaultColorSchemeServerSide(): DefaultColorScheme {
    assert(defaultColorSchemeServerSide !== undefined);
    return defaultColorSchemeServerSide;
}

export function setDefaultColorSchemeServerSide(params: {
    defaultColorScheme: DefaultColorScheme;
}): void {
    const { defaultColorScheme } = params;

    defaultColorSchemeServerSide = defaultColorScheme;
}

let defaultColorSchemeClientSide: DefaultColorScheme | undefined = undefined;

export function getDefaultColorSchemeClientSide(): DefaultColorScheme {
    assert(defaultColorSchemeClientSide !== undefined);
    return defaultColorSchemeClientSide;
}

export function setDefaultColorSchemeClientSide(params: {
    defaultColorScheme: DefaultColorScheme;
}): void {
    const { defaultColorScheme } = params;

    defaultColorSchemeClientSide = defaultColorScheme;
}
