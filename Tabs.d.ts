import React, { type ReactNode, type CSSProperties } from "react";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
export type TabsProps = TabsProps.Uncontrolled | TabsProps.Controlled;
export declare namespace TabsProps {
    type Common = {
        id?: string;
        className?: string;
        label?: string;
        classes?: Partial<Record<"root" | "tab" | "panel", string>>;
        style?: CSSProperties;
    };
    type Uncontrolled = Common & {
        tabs: {
            label: ReactNode;
            iconId?: FrIconClassName | RiIconClassName;
            content: ReactNode;
            isDefault?: boolean;
        }[];
        selectedTabId?: undefined;
        onTabChange?: (params: {
            tabIndex: number;
            tab: Uncontrolled["tabs"][number];
        }) => void;
        children?: undefined;
    };
    type Controlled = Common & {
        tabs: {
            tabId: string;
            label: ReactNode;
            iconId?: FrIconClassName | RiIconClassName;
        }[];
        selectedTabId: string;
        onTabChange: (tabId: string) => void;
        children: ReactNode;
    };
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tabs> */
export declare const Tabs: React.MemoExoticComponent<React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>>;
export default Tabs;
