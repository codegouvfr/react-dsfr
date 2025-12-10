import type { JSX } from "../tools/JSX";
import React, { type CSSProperties, type ReactNode } from "react";
import type { FrIconClassName, RiIconClassName } from "../fr/generatedFromCss/classNames";
import { ButtonProps } from "../Button";
export type ModalProps = {
    className?: string;
    /** Default: "medium" */
    size?: "small" | "medium" | "large";
    title: ReactNode;
    titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
    titleProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    children: ReactNode;
    /** Default: true */
    concealingBackdrop?: boolean;
    topAnchor?: boolean;
    iconId?: FrIconClassName | RiIconClassName;
    buttons?: [ModalProps.ActionAreaButtonProps, ...ModalProps.ActionAreaButtonProps[]] | ModalProps.ActionAreaButtonProps;
    style?: CSSProperties;
};
export declare namespace ModalProps {
    type ActionAreaButtonProps = ButtonProps & {
        /** Default: true */
        doClosesModal?: boolean;
    };
}
declare const addModalTranslations: (params: {
    lang: string;
    messages: Partial<{
        close: string;
    }>;
}) => void;
export { addModalTranslations };
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-modal> */
export declare function createModal(params: {
    isOpenedByDefault: boolean;
    id: string;
}): {
    buttonProps: {
        /** Only for analytics, feel free to overwrite */
        id: string;
        "aria-controls": string;
        "data-fr-opened": boolean;
    };
    Component: (props: ModalProps) => JSX.Element;
    close: () => void;
    open: () => void;
    isOpenedByDefault: boolean;
    id: string;
};
