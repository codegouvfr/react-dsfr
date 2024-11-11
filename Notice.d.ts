import React, { type ReactNode, type CSSProperties } from "react";
export type NoticeProps = NoticeProps.NonClosable | NoticeProps.Closable;
export declare namespace NoticeProps {
    type Common = {
        id?: string;
        className?: string;
        classes?: Partial<Record<"root" | "title" | "close", string>>;
        title: NonNullable<ReactNode>;
        style?: CSSProperties;
    };
    export type NonClosable = Common & {
        isClosable?: false;
        isClosed?: never;
        onClose?: never;
    };
    export type Closable = Closable.Controlled | Closable.Uncontrolled;
    export namespace Closable {
        type Controlled = Common & {
            isClosable: true;
            isClosed: boolean;
            onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
        };
        type Uncontrolled = Common & {
            isClosable: true;
            onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
            isClosed?: never;
        };
    }
    export {};
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-notice> */
export declare const Notice: React.MemoExoticComponent<React.ForwardRefExoticComponent<NoticeProps & React.RefAttributes<HTMLDivElement>>>;
export default Notice;
declare const addNoticeTranslations: (params: {
    lang: string;
    messages: Partial<{
        "hide message": string;
    }>;
}) => void;
export { addNoticeTranslations };
