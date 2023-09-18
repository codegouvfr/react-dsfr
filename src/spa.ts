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
    checkNonce?: boolean;
    trustedTypesPolicyName?: string;
}) {
    const {
        defaultColorScheme,
        verbose = false,
        Link,
        useLang,
        checkNonce,
        trustedTypesPolicyName
    } = params;

    if (Link !== undefined) {
        setLink({ Link });
    }

    if (useLang !== undefined) {
        setUseLang({ useLang });
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
