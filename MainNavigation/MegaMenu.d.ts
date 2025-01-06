import React, { type ReactNode, type CSSProperties } from "react";
import type { RegisteredLinkProps } from "../link";
export type MegaMenuProps = {
    classes?: Partial<Record<"root" | "leader" | "category" | "list", string>>;
    style?: CSSProperties;
    leader?: MegaMenuProps.Leader;
    categories: MegaMenuProps.Category[];
};
export declare namespace MegaMenuProps {
    type Leader = {
        title: ReactNode;
        paragraph: ReactNode;
        link?: {
            linkProps: RegisteredLinkProps;
            text: ReactNode;
        };
    };
    type Category = {
        links: {
            text: ReactNode;
            linkProps: RegisteredLinkProps;
            isActive?: boolean;
        }[];
    } & ({
        categoryMainLink: {
            text: ReactNode;
            linkProps: RegisteredLinkProps;
        };
        categoryMainText?: never;
    } | {
        categoryMainText: ReactNode;
        categoryMainLink?: never;
    });
}
export declare const MegaMenu: React.MemoExoticComponent<React.ForwardRefExoticComponent<MegaMenuProps & {
    id: string;
} & React.RefAttributes<HTMLDivElement>>>;
declare const addMegaMenuTranslations: (params: {
    lang: string;
    messages: Partial<{
        close: string;
    }>;
}) => void;
export { addMegaMenuTranslations };
export default MegaMenu;
