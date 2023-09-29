import { start } from "../../start";
import { setLink } from "../../link";
import { setDefaultColorSchemeClientSide } from "./defaultColorScheme";
import { isBrowser } from "../../tools/isBrowser";
let isAfterFirstEffect = false;
const actions = [];
export function startReactDsfr(params) {
    const { defaultColorScheme, verbose = false, Link, doCheckNonce = false, trustedTypesPolicyName = "react-dsfr" } = params;
    setDefaultColorSchemeClientSide({ defaultColorScheme });
    if (Link !== undefined) {
        setLink({ Link });
    }
    if (isBrowser) {
        start({
            defaultColorScheme,
            verbose,
            doCheckNonce,
            trustedTypesPolicyName,
            "nextParams": {
                "doPersistDarkModePreferenceWithCookie": false,
                "registerEffectAction": action => {
                    if (isAfterFirstEffect) {
                        action();
                    }
                    else {
                        actions.push(action);
                    }
                }
            }
        });
    }
}
export function dsfrEffect() {
    if (isAfterFirstEffect) {
        return;
    }
    isAfterFirstEffect = true;
    actions.forEach(action => action());
}
//# sourceMappingURL=start.js.map