import React, { type CSSProperties } from "react";
import type { RegisteredLinkProps } from "./link";
export type SummaryProps = {
    className?: string;
    links: {
        text: string;
        linkProps: RegisteredLinkProps;
    }[];
    title?: string;
    /** Default: "p" */
    as?: "p" | "h2" | "h3" | "h4" | "h5" | "h6";
    classes?: Partial<Record<"root" | "title" | "link", string>>;
    style?: CSSProperties;
};
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-summary> */
export declare const Summary: React.MemoExoticComponent<React.ForwardRefExoticComponent<SummaryProps & React.RefAttributes<HTMLDivElement>>>;
declare const addSummaryTranslations: (params: {
    lang: string;
    messages: Partial<{
        title: string;
    }>;
}) => void;
export { addSummaryTranslations };
export default Summary;
