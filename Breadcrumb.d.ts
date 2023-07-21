import React, { type ReactNode, type CSSProperties } from "react";
import type { RegisteredLinkProps } from "./link";
export type BreadcrumbProps = {
    id?: string;
    className?: string;
    homeLinkProps?: RegisteredLinkProps;
    segments: {
        label: ReactNode;
        linkProps: RegisteredLinkProps;
    }[];
    currentPageLabel: ReactNode;
    classes?: Partial<Record<"root" | "button" | "collapse" | "list" | "link" | "text", string>>;
    style?: CSSProperties;
};
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-breadcrumb> */
export declare const Breadcrumb: React.MemoExoticComponent<React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLDivElement>>>;
declare const addBreadcrumbTranslations: (params: {
    lang: string;
    messages: Partial<{
        "show breadcrumb": string;
        "navigation label": string;
        home: string;
    }>;
}) => void;
export { addBreadcrumbTranslations };
export default Breadcrumb;
