import { fontUrlByFileBasename } from "./zz_internal/fontUrlByFileBasename";
import "../assets/dsfr_plus_icons.scss";
export type DsfrHeadProps = {
    /** If not provided no fonts are preloaded.
     * Preloading of fonts is only enabled in production.
     */
    preloadFonts?: (keyof typeof fontUrlByFileBasename)[];
    Link: Function;
    /**
     * When set, the value will be used as the nonce attribute of subsequent script tags.
     *
     * Don't forget to add `doCheckNonce: true` in {@link startReactDsfr} options.
     *
     * @see https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/nonce
     */
    nonce?: string;
    /**
     * Enable Trusted Types with a custom policy name.
     *
     * Don't forget to add `trustedTypesPolicyName` in {@link startReactDsfr} options.
     *
     * @see https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types
     * @see {@link DEFAULT_TRUSTED_TYPES_POLICY_NAME}
     * @default "react-dsfr"
     */
    trustedTypesPolicyName?: string;
    /**
     * Disable Marianne favicon import.
     * Enable this option if you want to use your own favicon.
     *
     * @default false
     */
    doDisableFavicon?: boolean;
};
export declare function DsfrHead(props: DsfrHeadProps): JSX.Element;
