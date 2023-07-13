import React, { type ReactNode, type CSSProperties } from "react";
import type { RegisteredLinkProps } from "../link";
import type { MenuProps } from "./Menu";
import type { MegaMenuProps } from "./MegaMenu";
export type MainNavigationProps = {
    className?: string;
    id?: string;
    items: MainNavigationProps.Item[];
    classes?: Partial<Record<"root" | "list" | "item" | "link" | "btn" | "menu" | "menuList" | "megaMenu" | "megaMenuLeader" | "megaMenuCategory" | "megaMenuList", string>>;
    style?: CSSProperties;
};
export declare namespace MainNavigationProps {
    type Item = Item.Link | Item.Menu | Item.MegaMenu;
    namespace Item {
        type Common = {
            isActive?: boolean;
            className?: string;
            text: ReactNode;
        };
        type Link = Common & {
            linkProps: RegisteredLinkProps;
            menuLinks?: never;
            megaMenu?: never;
            buttonProps?: never;
        };
        type Menu = Common & {
            linkProps?: never;
            menuLinks: MenuProps.Link[];
            megaMenu?: never;
            /** @see <https://github.com/codegouvfr/react-dsfr/issues/38> */
            buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
        };
        type MegaMenu = Common & {
            linkProps?: never;
            menuLinks?: never;
            megaMenu: {
                leader?: MegaMenuProps.Leader;
                categories: MegaMenuProps.Category[];
            };
            /** @see <https://github.com/codegouvfr/react-dsfr/issues/38> */
            buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
        };
    }
}
export declare const MainNavigation: React.MemoExoticComponent<React.ForwardRefExoticComponent<MainNavigationProps & React.RefAttributes<HTMLDivElement>>>;
export default MainNavigation;
declare const addMainNavigationTranslations: (params: {
    lang: string;
    messages: Partial<{
        "main menu": string;
    }>;
}) => void;
export { addMainNavigationTranslations };
