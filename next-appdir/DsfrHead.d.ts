import React, { type ReactNode } from "react";
import { fontUrlByFileBasename } from "./zz_internal/fontUrlByFileBasename";
import { type RegisteredLinkProps } from "../link";
import "../assets/dsfr_plus_icons.css";
export type DsfrHeadProps = {
    /** If not provided no fonts are preloaded.
     * Preloading of fonts is only enabled in production.
     */
    preloadFonts?: (keyof typeof fontUrlByFileBasename)[];
    /** Default: <a /> */
    Link?: (props: RegisteredLinkProps & {
        children: ReactNode;
    }) => ReturnType<React.FC>;
};
export declare function DsfrHead(props: DsfrHeadProps): JSX.Element;
