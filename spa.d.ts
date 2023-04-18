import type { ReactNode } from "react";
import type { RegisterLink, RegisteredLinkProps } from "./link";
import { setUseLang } from "./i18n";
import type { ColorScheme } from "./useIsDark";
export type { RegisterLink, RegisteredLinkProps };
export declare function startReactDsfr(params: {
    defaultColorScheme: ColorScheme | "system";
    /** Default: false */
    verbose?: boolean;
    /** Default: <a /> */
    Link?: (props: RegisteredLinkProps & {
        children: ReactNode;
    }) => ReturnType<React.FC>;
    /** Default: ()=> "fr" */
    useLang?: () => string;
}): void;
export { setUseLang };
