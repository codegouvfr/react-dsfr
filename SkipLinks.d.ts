import React, { type CSSProperties } from "react";
export type SkipLinksProps = {
    className?: string;
    links: {
        label: string;
        anchor: string;
    }[];
    classes?: Partial<Record<"root" | "list" | "link", string>>;
    style?: CSSProperties;
};
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-skiplinks> */
export declare const SkipLinks: React.MemoExoticComponent<React.ForwardRefExoticComponent<SkipLinksProps & React.RefAttributes<HTMLDivElement>>>;
export default SkipLinks;
