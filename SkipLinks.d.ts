import React, { type CSSProperties } from "react";
export type SkipLinksProps = {
    id?: string;
    className?: string;
    links: {
        label: string;
        anchor: string;
        id?: string;
    }[];
    classes?: Partial<Record<"root" | "list" | "link", string>>;
    style?: CSSProperties;
};
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-skiplinks> */
export declare const SkipLinks: React.MemoExoticComponent<React.ForwardRefExoticComponent<SkipLinksProps & React.RefAttributes<HTMLDivElement>>>;
export default SkipLinks;
