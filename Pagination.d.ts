import React, { type CSSProperties } from "react";
import { RegisteredLinkProps } from "./link";
export type PaginationProps = {
    className?: string;
    count: number;
    defaultPage?: number;
    classes?: Partial<Record<"root" | "list" | "link", string>>;
    style?: CSSProperties;
    showFirstLast?: boolean;
    getPageLinkProps: (pageNumber: number) => RegisteredLinkProps;
};
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-pagination> */
export declare const Pagination: React.MemoExoticComponent<React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLDivElement>>>;
declare const addPaginationTranslations: (params: {
    lang: string;
    messages: Partial<{
        "first page": string;
        "previous page": string;
        "next page": string;
        "last page": string;
        "aria-label": string;
    }>;
}) => void;
export { addPaginationTranslations };
export default Pagination;
