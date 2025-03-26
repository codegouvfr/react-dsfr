import { start } from "../../start";
import { isBrowser } from "../../tools/isBrowser";
let isAfterFirstEffect = false;
const actions = [];
export function startReactDsfr(params) {
    if (!isBrowser) {
        return;
    }
    const { defaultColorScheme, verbose = false, doCheckNonce = false, trustedTypesPolicyName = "react-dsfr" } = params;
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
export function dsfrEffect() {
    if (isAfterFirstEffect) {
        return;
    }
    isAfterFirstEffect = true;
    actions.forEach(action => action());
}
//# sourceMappingURL=start.js.map