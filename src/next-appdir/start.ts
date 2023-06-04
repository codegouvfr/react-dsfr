import type { ReactNode } from "react";
import { start } from "../start";
import type { RegisterLink, RegisteredLinkProps } from "../link";
import { setLink } from "../link";
import { setUseLang } from "../i18n";
import { type DefaultColorScheme, setDefaultColorSchemeClientSide } from "./zz_internal/defaultColorScheme";
import { isBrowser } from "../tools/isBrowser";

export type { RegisterLink, RegisteredLinkProps };

let isAfterFirstEffect = false;
const actions: (() => void)[] = [];

export function startReactDsfr(params: {
    defaultColorScheme: DefaultColorScheme;
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: (props: RegisteredLinkProps & { children: ReactNode }) => ReturnType<React.FC>;
    /** Default: ()=> "fr" */
    useLang?: () => string;
}) {
    const { defaultColorScheme, verbose = false, Link, useLang } = params;

    setDefaultColorSchemeClientSide({ defaultColorScheme });

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
