import type { ReactNode } from "react";
import { start } from "../../start";
import type { RegisteredLinkProps } from "../../link";
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
    Link?: (props: RegisteredLinkProps & { children: ReactNode }) => ReturnType<React.FC>;
    /**
     * When true, the nonce of the script tag will be checked, fetched from {@link DsfrHead} component and injected in react-dsfr scripts.
     *
     * @see https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/nonce
     */
    checkNonce?: boolean;
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
     * @default "react-dsfr"
     */
    trustedTypesPolicyName?: string;
}) {
    const {
        defaultColorScheme,
        verbose = false,
        Link,
        checkNonce,
        trustedTypesPolicyName
    } = params;

    setDefaultColorSchemeClientSide({ defaultColorScheme });

    if (Link !== undefined) {
        setLink({ Link });
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
                    } else {
                        actions.push(action);
                    }
                }
            },
            checkNonce,
            trustedTypesPolicyName
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
