import type { ReactNode } from "react";
import { start, type EulerianAnalytics } from "./start";
import type { RegisterLink, RegisteredLinkProps } from "./link";
import { setLink } from "./link";
import { setUseLang } from "./i18n";
import type { ColorScheme } from "./useIsDark";

export type { EulerianAnalytics };

export type { RegisterLink, RegisteredLinkProps };

export function startReactDsfr(params: {
    defaultColorScheme: ColorScheme | "system";
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: (props: RegisteredLinkProps & { children: ReactNode }) => ReturnType<React.FC>;
    /** Default: ()=> "fr" */
    useLang?: () => string;
    eulerianAnalytics?: EulerianAnalytics;
}) {
    const { defaultColorScheme, verbose = false, Link, useLang, eulerianAnalytics } = params;

    if (Link !== undefined) {
        setLink({ Link });
    }

    if (useLang !== undefined) {
        setUseLang({ useLang });
    }

    start({
        defaultColorScheme,
        verbose,
        eulerianAnalytics,
        "nextParams": undefined
    });
}

export { setUseLang };
