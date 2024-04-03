import { start } from "./start";
import type { RegisterLink, RegisteredLinkProps } from "./link";
import { setLink } from "./link";
import { setUseLang } from "./i18n";
import type { ColorScheme } from "./useIsDark";
import { assert } from "tsafe/assert";

export type { RegisterLink, RegisteredLinkProps };

export function startReactDsfr(params: {
    defaultColorScheme: ColorScheme | "system";
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: Function;
    /** Default: ()=> "fr" */
    useLang?: () => string;
    /**
     * When set, the value will be used as the nonce attribute of subsequent script tags.
     *
     * @see https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/nonce
     */
    nonce?: string;
    /**
     * Enable Trusted Types with a custom policy name.
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
        useLang,
        nonce,
        trustedTypesPolicyName = "react-dsfr"
    } = params;

    if (Link !== undefined) {
        setLink({ "Link": Link as any });
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
