import React, { type ReactNode, type CSSProperties } from "react";
import type { FrClassName } from "./fr/generatedFromCss/classNames";
export type AlertProps = {
    className?: string;
    id?: string;
    severity: AlertProps.Severity;
    /** Default h3 */
    as?: `h${2 | 3 | 4 | 5 | 6}`;
    classes?: Partial<Record<"root" | "title" | "description" | "close", string>>;
    style?: CSSProperties;
    /** Display the cross icon (understand isClosableByUser) */
    closable?: boolean;
    /** To provide if you want the Alert to be controlled */
    isClosed?: boolean;
    onClose?: () => void;
} & (AlertProps.DefaultSize | AlertProps.Small);
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
    type ExtractSeverity<FrClassName> = FrClassName extends `fr-alert--${infer Severity}` ? Exclude<Severity, "sm"> : never;
    export type Severity = ExtractSeverity<FrClassName>;
    export {};
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-alert> */
export declare const Alert: React.MemoExoticComponent<React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>>;
export default Alert;
declare const addAlertTranslations: (params: {
    lang: string;
    messages: Partial<{
        "hide message": string;
    }>;
}) => void;
export { addAlertTranslations };
