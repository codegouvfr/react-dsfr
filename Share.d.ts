import React, { CSSProperties, ReactNode } from "react";
import { CxArg } from "tss-react";
import { RegisteredLinkProps } from "./link";
export type ShareProps = {
    id?: string;
    className?: string;
    classes?: Partial<Record<"root" | "title" | "text" | "buttons-group" | "buttons-group-item" | "button", CxArg>>;
    style?: CSSProperties;
    title?: ReactNode;
    text?: ReactNode;
    buttons: [ShareProps.Button, ...ShareProps.Button[]];
};
export declare namespace ShareProps {
    type Type = "facebook" | "twitter-x" | "linkedin" | "mail" | "copy";
    type CommonButton = {
        type: Type;
        children?: ReactNode;
    };
    type LinkButton = CommonButton & {
        linkProps: RegisteredLinkProps;
        disabled?: boolean;
        buttonProps?: never;
    };
    type NativeButton = CommonButton & {
        buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
        linkProps?: never;
        disabled?: never;
    };
    type Button = LinkButton | NativeButton;
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-share> */
export declare const Share: React.MemoExoticComponent<React.ForwardRefExoticComponent<ShareProps & React.RefAttributes<HTMLDivElement>>>;
export default Share;
declare const addShareTranslations: (params: {
    lang: string;
    messages: Partial<{
        "share this page": string;
        "new window": string;
        facebook: string;
        "twitter-x": string;
        linkedin: string;
        mail: string;
        copy: string;
    }>;
}) => void;
export { addShareTranslations };
