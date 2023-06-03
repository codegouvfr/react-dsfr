import { type CSSProperties, type ReactNode } from "react";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import { ButtonProps } from "./Button";
export type ModalProps = {
    className?: string;
    /** Default: "medium" */
    size?: "small" | "medium" | "large";
    title: ReactNode;
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
    type ModalButtonProps = {
        "nativeButtonProps": {
            "aria-controls": string;
            "data-fr-opened": boolean;
        };
    };
}
declare const addModalTranslations: (params: {
    lang: string;
    messages: Partial<{
        close: string;
    }>;
}) => void;
export { addModalTranslations };
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-modal> */
export declare function createModal(params: {
    isOpenedByDefault: boolean;
    id: string;
}): {
    buttonProps: {
        "aria-controls": string;
        "data-fr-opened": boolean;
    };
    Component: (props: ModalProps) => JSX.Element;
    close: () => void;
    open: () => void;
};
