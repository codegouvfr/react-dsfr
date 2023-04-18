import { start } from "./start";
import { setLink } from "./link";
import { setUseLang } from "./i18n";
export function startReactDsfr(params) {
    const { defaultColorScheme, verbose = false, Link, useLang } = params;
    if (Link !== undefined) {
        setLink({ Link });
    }
    if (useLang !== undefined) {
        setUseLang({ useLang });
    }
    start({
        defaultColorScheme,
        verbose,
        "nextParams": undefined
    });
}
export { setUseLang };
//# sourceMappingURL=spa.js.map