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
    type ModalButtonProps = Pick<ButtonProps, "onClick" | "nativeButtonProps">;
}
declare const addModalTranslations: (params: {
    lang: string;
    messages: Partial<{
        close: string;
    }>;
}) => void;
export { addModalTranslations };
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-modal> */
export declare function createModal<Name extends string>(params: {
    name: Name;
    isOpenedByDefault: boolean;
}): Record<`${Uncapitalize<Name>}ModalButtonProps`, ModalProps.ModalButtonProps> & Record<`${Capitalize<Name>}Modal`, (props: ModalProps) => JSX.Element>;
