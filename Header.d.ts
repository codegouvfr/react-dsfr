import React, { type ReactNode, type CSSProperties } from "react";
import type { RegisteredLinkProps } from "./link";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import type { MainNavigationProps } from "./MainNavigation";
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
        name: string;
        type: "search";
        className: string;
        placeholder: string;
    }) => JSX.Element;
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
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-header> */
export declare const Header: React.MemoExoticComponent<React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLDivElement>>>;
export default Header;
declare const addHeaderTranslations: (params: {
    lang: string;
    messages: Partial<{
        menu: string;
        close: string;
        search: string;
    }>;
}) => void;
export { addHeaderTranslations };
export type HeaderQuickAccessItemProps = {
    className?: string;
    quickAccessItem: HeaderProps.QuickAccessItem;
};
export declare function HeaderQuickAccessItem(props: HeaderQuickAccessItemProps): JSX.Element;
