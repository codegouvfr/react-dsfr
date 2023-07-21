import React, { ReactNode, type CSSProperties } from "react";
import type { FrClassName, FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import type { ButtonProps } from "./Button";
export type CallOutProps = {
    className?: string;
    id?: string;
    iconId?: FrIconClassName | RiIconClassName;
    title?: ReactNode;
    buttonProps?: ButtonProps;
    colorVariant?: CallOutProps.ColorVariant;
    classes?: Partial<Record<"root" | "title" | "text" | "button", string>>;
    style?: CSSProperties;
    children: ReactNode;
};
export declare namespace CallOutProps {
    type ExtractColorVariant<FrClassName> = FrClassName extends `fr-callout--${infer AccentColor}` ? AccentColor : never;
    export type ColorVariant = ExtractColorVariant<FrClassName>;
    export {};
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-callout> */
export declare const CallOut: React.MemoExoticComponent<React.ForwardRefExoticComponent<CallOutProps & React.RefAttributes<HTMLDivElement>>>;
export default CallOut;
