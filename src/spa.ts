import type { ReactNode } from "react";
import { start } from "./start";
import type { RegisterLink, RegisteredLinkProps } from "./link";
import { setLink } from "./link";
import { setUseLang } from "./i18n";
import type { ColorScheme } from "./useIsDark";

export type { RegisterLink, RegisteredLinkProps };

export function startReactDsfr(params: {
    defaultColorScheme: ColorScheme | "system";
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: (props: RegisteredLinkProps & { children: ReactNode }) => ReturnType<React.FC>;
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
        trustedTypesPolicyName
    } = params;

    if (Link !== undefined) {
        setLink({ Link });
    }

    if (useLang !== undefined) {
        setUseLang({ useLang });
    }

    const checkNonce = !!nonce;
    if (checkNonce) {
        window.ssrNonce = nonce;
    }

    start({
        defaultColorScheme,
        verbose,
        "nextParams": undefined,
        checkNonce,
        trustedTypesPolicyName
    });
}

export { setUseLang };
