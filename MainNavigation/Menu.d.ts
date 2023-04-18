import React, { type CSSProperties, type ReactNode } from "react";
import type { RegisteredLinkProps } from "../link";
export type MenuProps = {
    classes?: Partial<Record<"root" | "list", string>>;
    style?: CSSProperties;
    links: MenuProps.Link[];
};
export declare namespace MenuProps {
    type Link = {
        text: ReactNode;
        linkProps: RegisteredLinkProps;
        isActive?: boolean;
    };
}
export declare const Menu: React.MemoExoticComponent<React.ForwardRefExoticComponent<MenuProps & {
    id: string;
} & React.RefAttributes<HTMLDivElement>>>;
export default Menu;
