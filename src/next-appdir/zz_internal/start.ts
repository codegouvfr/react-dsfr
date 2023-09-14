import type { ReactNode } from "react";
import { start } from "../../start";
import type { RegisteredLinkProps } from "../../link";
import { setLink } from "../../link";
import { type DefaultColorScheme, setDefaultColorSchemeClientSide } from "./defaultColorScheme";
import { isBrowser } from "../../tools/isBrowser";

let isAfterFirstEffect = false;
const actions: (() => void)[] = [];

export function startReactDsfr(params: {
    defaultColorScheme: DefaultColorScheme;
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: (props: RegisteredLinkProps & { children: ReactNode }) => ReturnType<React.FC>;
    nonce?: string;
    trustedTypesPolicyName?: string;
}) {
    const { defaultColorScheme, verbose = false, Link, nonce, trustedTypesPolicyName } = params;

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
            nonce,
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
