import { assert } from "tsafe/assert";
let defaultColorSchemeServerSide = undefined;
export function getDefaultColorSchemeServerSide() {
    assert(defaultColorSchemeServerSide !== undefined);
    return defaultColorSchemeServerSide;
}
export function setDefaultColorSchemeServerSide(params) {
    const { defaultColorScheme } = params;
    defaultColorSchemeServerSide = defaultColorScheme;
}
let defaultColorSchemeClientSide = undefined;
export function getDefaultColorSchemeClientSide() {
    assert(defaultColorSchemeClientSide !== undefined);
    return defaultColorSchemeClientSide;
}
export function setDefaultColorSchemeClientSide(params) {
    const { defaultColorScheme } = params;
    defaultColorSchemeClientSide = defaultColorScheme;
}
//# sourceMappingURL=defaultColorScheme.js.map