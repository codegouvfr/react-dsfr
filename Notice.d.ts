import React, { type ReactNode, type CSSProperties } from "react";
export type NoticeProps = {
    id?: string;
    className?: string;
    classes?: Partial<Record<"root" | "title" | "close", string>>;
    title: NonNullable<ReactNode>;
    style?: CSSProperties;
} & (NoticeProps.NonClosable | NoticeProps.Closable);
export declare namespace NoticeProps {
    type NonClosable = {
        isClosable?: false;
        isClosed?: undefined;
        onClose?: undefined;
    };
    type Closable = {
        isClosable: true;
    } & (Closable.Controlled | Closable.Uncontrolled);
    namespace Closable {
        type Controlled = {
            isClosed: boolean;
            onClose: () => void;
        };
        type Uncontrolled = {
            isClosed?: undefined;
            onClose?: () => void;
        };
    }
}
/** @see <https://components.react-dsfr.fr/?path=/docs/components-notice> */
export declare const Notice: React.MemoExoticComponent<React.ForwardRefExoticComponent<NoticeProps & React.RefAttributes<HTMLDivElement>>>;
export default Notice;
declare const addNoticeTranslations: (params: {
    lang: string;
    messages: Partial<{
        "hide message": string;
    }>;
}) => void;
export { addNoticeTranslations };
