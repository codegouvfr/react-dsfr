import React, { type ReactNode, type CSSProperties } from "react";
import type { FrClassName } from "./fr/generatedFromCss/classNames";
export type AlertProps = {
    className?: string;
    severity: AlertProps.Severity;
    /** Default h3 */
    as?: `h${2 | 3 | 4 | 5 | 6}`;
    classes?: Partial<Record<"root" | "title" | "description" | "close", string>>;
    style?: CSSProperties;
} & (AlertProps.DefaultSize | AlertProps.Small) & (AlertProps.NonClosable | AlertProps.Closable);
export declare namespace AlertProps {
    export type DefaultSize = {
        /** Default false */
        small?: false;
        title: NonNullable<ReactNode>;
        description?: NonNullable<ReactNode>;
    };
    export type Small = {
        /** Default false */
        small: true;
        title?: NonNullable<ReactNode>;
        description: NonNullable<ReactNode>;
    };
    export type NonClosable = {
        /** Default false */
        closable?: false;
        isClosed?: never;
        onClose?: never;
    };
    export type Closable = {
        /** Default false */
        closable: true;
    } & (Closable.Controlled | Closable.Uncontrolled);
    export namespace Closable {
        type Controlled = {
            isClosed: boolean;
            onClose: () => void;
        };
        type Uncontrolled = {
            isClosed?: never;
            onClose?: () => void;
        };
    }
    type ExtractSeverity<FrClassName> = FrClassName extends `fr-alert--${infer Severity}` ? Exclude<Severity, "sm"> : never;
    export type Severity = ExtractSeverity<FrClassName>;
    export {};
}
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-alert> */
export declare const Alert: React.MemoExoticComponent<React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>>;
export default Alert;
declare const addAlertTranslations: (params: {
    lang: string;
    messages: Partial<{
        "hide message": string;
    }>;
}) => void;
export { addAlertTranslations };
