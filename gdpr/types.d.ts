/**
 * format: `<serviceName>: never`
 *
 * The value can be anything (or `never`), but you can set `true`
 * as a reminder that this service is mandatory.
 * @example
 * ```ts
 * declare module "@codegouvfr/react-dsfr/gdpr" {
 *   interface RegisterGdprServices {
 *     matomo: true;
 *     youtube: never;
 *   }
 * }
 * ```
 */
export interface RegisterGdprServices {
}
export type GdprServiceName = keyof RegisterGdprServices extends never ? string : keyof RegisterGdprServices | (string & {
    _?: never & symbol;
});
export type Consents = Record<GdprServiceName, boolean | undefined>;
export interface GdprService {
    /** Will be displayed in consent modal. */
    description: string;
    /** If true, consent for this service will always be true and not switchable. */
    mandatory?: boolean;
    /** Technical name. Not displayed. */
    name: GdprServiceName;
    /** Displayed name. */
    title: string;
}
