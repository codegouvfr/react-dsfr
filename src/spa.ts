import type { ReactNode } from "react";
import { start } from "./start";
import type { RegisterLink, RegisteredLinkProps } from "./link";
import { setLink } from "./link";
import type { ColorScheme } from "./useIsDark";

export type { RegisterLink, RegisteredLinkProps };

export function startReactDsfr(params: {
    defaultColorScheme: ColorScheme | "system";
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: (props: RegisteredLinkProps & { children: ReactNode }) => ReturnType<React.FC>;
}) {
    const { defaultColorScheme, verbose = false, Link } = params;

    if (Link !== undefined) {
        setLink({ Link });
    }

    start({
        defaultColorScheme,
        verbose,
        "nextParams": undefined
    });
}
