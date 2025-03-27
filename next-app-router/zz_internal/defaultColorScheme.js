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
//# sourceMappingURL=defaultColorScheme.js.map