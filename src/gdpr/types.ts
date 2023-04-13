type UnknownMapping = string & {
    _?: never & symbol;
};

/**
 * format: `<serviceName>: <isMandatory>`
 * @example
 * ```ts
 * declare module "@codegouvfr/react-dsfr/gdpr" {
 *   interface RegisterGdprServices {
 *     matomo: true;
 *     youtube: false;
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegisterGdprServices {}
export type GdprServiceName = keyof RegisterGdprServices extends never
    ? string
    : keyof RegisterGdprServices | UnknownMapping;
export type Consents = Record<GdprServiceName, boolean | undefined>;

export interface GdprService {
    description: string;
    mandatory?: boolean;
    name: GdprServiceName;
    title: string;
}
