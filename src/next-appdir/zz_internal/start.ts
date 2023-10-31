import { start } from "../../start";
import type { RegisterLink } from "../../link";
import { setLink } from "../../link";
import { type DefaultColorScheme, setDefaultColorSchemeClientSide } from "./defaultColorScheme";
import { isBrowser } from "../../tools/isBrowser";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in doc
import { type DsfrHead } from "../DsfrHead";

let isAfterFirstEffect = false;
const actions: (() => void)[] = [];

export function startReactDsfr(params: {
    defaultColorScheme: DefaultColorScheme;
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: RegisterLink extends { Link: infer Link } ? Link : undefined;
    /**
     * When true, the nonce of the script tag will be checked, fetched from {@link DsfrHead} component and injected in react-dsfr scripts.
     *
     * @see https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/nonce
     * @default false
     */
    doCheckNonce?: boolean;
    /**
     * Enable Trusted Types with a custom policy name.
     *
     * Don't forget to also add the policy name in {@link DsfrHead} component.
     *
     * `<trustedTypesPolicyName>` and `<trustedTypesPolicyName>-asap` should be set in your Content-Security-Policy header.
     *
     * For example:
     * ```txt
     * With a policy name of "react-dsfr":
     * Content-Security-Policy:
     *  require-trusted-types-for 'script';
     *  trusted-types react-dsfr react-dsfr-asap nextjs nextjs#bundler;
     * ```
     *
     * @see https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types
     * @see {@link DEFAULT_TRUSTED_TYPES_POLICY_NAME}
     * @default "react-dsfr"
     */
    trustedTypesPolicyName?: string;
}) {
    const {
        defaultColorScheme,
        verbose = false,
        Link,
        doCheckNonce = false,
        trustedTypesPolicyName = "react-dsfr"
    } = params;

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
                    } else {
                        actions.push(action);
                    }
                }
            }
        });
    }
}

export function dsfrEffect(): void {
    if (isAfterFirstEffect) {
        return;
    }
    isAfterFirstEffect = true;
    actions.forEach(action => action());
}
