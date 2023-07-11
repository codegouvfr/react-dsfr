import type { ReactNode } from "react";
import { type EulerianAnalytics } from "../../start";
import type { RegisteredLinkProps } from "../../link";
import { type DefaultColorScheme } from "./defaultColorScheme";
export declare function startReactDsfr(params: {
    defaultColorScheme: DefaultColorScheme;
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: (props: RegisteredLinkProps & {
        children: ReactNode;
    }) => ReturnType<React.FC>;
    eulerianAnalytics?: EulerianAnalytics;
}): void;
export declare function dsfrEffect(): void;
