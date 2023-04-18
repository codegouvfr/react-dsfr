import { start } from "../start";
import { setLink } from "../link";
import { setUseLang } from "../i18n";
import { isBrowser } from "../tools/isBrowser";
let isAfterFirstEffect = false;
const actions = [];
export function startReactDsfr(params) {
    const { defaultColorScheme, verbose = false, Link, useLang } = params;
    if (Link !== undefined) {
        setLink({ Link });
    }
    if (useLang !== undefined) {
        setUseLang({ useLang });
    }
    if (isBrowser) {
        start({
            defaultColorScheme,
            verbose,
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