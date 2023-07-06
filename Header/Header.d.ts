import React, { type ReactNode, type CSSProperties } from "react";
import type { RegisteredLinkProps } from "../link";
import type { FrIconClassName, RiIconClassName } from "../fr/generatedFromCss/classNames";
import type { MainNavigationProps } from "../MainNavigation";
export type HeaderProps = {
    className?: string;
    brandTop: ReactNode;
    homeLinkProps: RegisteredLinkProps & {
        title: string;
    };
    serviceTitle?: ReactNode;
    serviceTagline?: ReactNode;
    navigation?: MainNavigationProps.Item[] | ReactNode;
    /** There should be at most three of them */
    quickAccessItems?: (HeaderProps.QuickAccessItem | ReactNode)[];
    operatorLogo?: {
        orientation: "horizontal" | "vertical";
        /**
         * Expected ratio:
         * If "vertical": 9x16
         * If "horizontal": 16x9
         */
        imgUrl: string;
        /** Textual alternative of the image, it MUST include the text present in the image*/
        alt: string;
    };
    renderSearchInput?: (
    /**
     * id and name must be forwarded to the <input /> component
     * the others params can, but it's not mandatory.
     **/
    params: {
        id: string;
        type: "search";
        className: string;
        placeholder: string;
    }) => JSX.Element;
    /** Called when the search button is clicked */
    onSearchButtonClick?: (text: string) => void;
    classes?: Partial<Record<"root" | "body" | "bodyRow" | "brand" | "brandTop" | "logo" | "operator" | "navbar" | "service" | "serviceTitle" | "serviceTagline" | "toolsLinks" | "menu" | "menuLinks", string>>;
    style?: CSSProperties;
};
export declare namespace HeaderProps {
    type QuickAccessItem = QuickAccessItem.Link | QuickAccessItem.Button;
    namespace QuickAccessItem {
        type Common = {
            iconId: FrIconClassName | RiIconClassName;
            text: ReactNode;
        };
        type Link = Common & {
            linkProps: RegisteredLinkProps;
            buttonProps?: never;
        };
        type Button = Common & {
            linkProps?: never;
            buttonProps: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
        };
    }
}
export declare const headerMenuModalId = "header-menu-modal";
/** @see <https://components.react-dsfr.fr/?path=/docs/components-header> */
export declare const Header: React.MemoExoticComponent<React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLDivElement>>>;
export default Header;
export declare const useTranslation: () => {
    t: (<K extends "menu" | "close">(messageKey: K) => {
        menu: string;
        close: string;
    }[K] extends (params: any) => infer R ? R : {
        menu: string;
        close: string;
    }[K]) & (<K_1 extends never>(messageKey: K_1, params: {
        menu: string;
        close: string;
    }[K_1] extends infer T ? T extends {
        menu: string;
        close: string;
    }[K_1] ? T extends (params: any) => any ? Parameters<T>[0] : never : never : never) => {
        menu: string;
        close: string;
    }[K_1] extends (params: any) => infer R_1 ? R_1 : {
        menu: string;
        close: string;
    }[K_1]);
}, addHeaderTranslations: (params: {
    lang: string;
    messages: Partial<{
        menu: string;
        close: string;
    }>;
}) => void;
export type HeaderQuickAccessItemProps = {
    className?: string;
    quickAccessItem: HeaderProps.QuickAccessItem;
};
export declare function HeaderQuickAccessItem(props: HeaderQuickAccessItemProps): JSX.Element;
