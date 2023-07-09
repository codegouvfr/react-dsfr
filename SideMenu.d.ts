import React, { type ReactNode, type CSSProperties } from "react";
import type { RegisteredLinkProps } from "./link";
export type SideMenuProps = {
    title?: ReactNode;
    className?: string;
    style?: CSSProperties;
    align?: "left" | "right";
    items: SideMenuProps.Item[];
    burgerMenuButtonText: ReactNode;
    /** Default: false */
    sticky?: boolean;
    /** Default: false, only relevent when sticky */
    fullHeight?: boolean;
    classes?: Partial<Record<"root" | "inner" | "title" | "list" | "item" | "link" | "button", string>>;
};
export declare namespace SideMenuProps {
    type Item = Item.Link | Item.SubMenu;
    namespace Item {
        type Common = {
            text: ReactNode;
            /** Default: false */
            isActive?: boolean;
        };
        export type Link = Common & {
            linkProps: RegisteredLinkProps;
        };
        export type SubMenu = Common & {
            items: Item[];
            /** Default: false */
            expandedByDefault?: boolean;
            linkProps?: RegisteredLinkProps;
        };
        export {};
    }
}
/** @see <https://components.react-dsfr.fr/?path=/docs/components-sidemenu> */
export declare const SideMenu: React.MemoExoticComponent<React.ForwardRefExoticComponent<SideMenuProps & React.RefAttributes<HTMLDivElement>>>;
export default SideMenu;
