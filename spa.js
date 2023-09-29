import { start } from "./start";
import { setLink } from "./link";
import { setUseLang } from "./i18n";
import { assert } from "tsafe/assert";
export function startReactDsfr(params) {
    const { defaultColorScheme, verbose = false, Link, useLang, nonce, trustedTypesPolicyName = "react-dsfr" } = params;
    if (Link !== undefined) {
        setLink({ Link });
    }
    if (useLang !== undefined) {
        setUseLang({ useLang });
    }
    assert(nonce !== "", "nonce cannot be an empty string");
    const doCheckNonce = nonce !== undefined;
    if (doCheckNonce) {
        window.ssrNonce = nonce;
    }
    start({
        defaultColorScheme,
        verbose,
        doCheckNonce,
        trustedTypesPolicyName,
        "nextParams": undefined
    });
}
export { setUseLang };
//# sourceMappingURL=spa.js.map