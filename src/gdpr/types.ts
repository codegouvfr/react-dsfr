/**
 * format: `<serviceName>: never`
 * @example
 * ```ts
 * declare module "@codegouvfr/react-dsfr/gdpr" {
 *   interface RegisterGdprServices {
 *     matomo: never;
 *     youtube: never;
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegisterGdprServices {}
export type GdprServiceName = keyof RegisterGdprServices extends never
    ? string
    :
          | keyof RegisterGdprServices
          | (string & {
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
