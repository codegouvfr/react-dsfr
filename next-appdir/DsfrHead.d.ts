import type { ColorScheme } from "../useIsDark";
import { fontUrlByFileBasename } from "./fontUrlByFileBasename";
import "../dsfr/utility/icons/icons.css";
import "../dsfr/dsfr.css";
export type DsfrHeadProps = {
    defaultColorScheme: ColorScheme | "system";
    /** If not provided no fonts are preloaded.
     * Preloading of fonts is only enabled in production.
     */
    preloadFonts?: (keyof typeof fontUrlByFileBasename)[];
};
export declare function DsfrHead(props: DsfrHeadProps): JSX.Element;
