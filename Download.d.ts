import React, { type CSSProperties, type ReactNode } from "react";
import { type RegisteredLinkProps } from "./link";
export type DownloadProps = {
    id?: string;
    className?: string;
    style?: CSSProperties;
    details: ReactNode;
    label: ReactNode;
    linkProps: RegisteredLinkProps;
    classes?: Partial<Record<"root" | "wrapper" | "link" | "details", string>>;
};
/** @see <https://components.react-dsfr.fr/?path=/docs/components-download> */
export declare const Download: React.MemoExoticComponent<React.ForwardRefExoticComponent<DownloadProps & React.RefAttributes<HTMLDivElement>>>;
export default Download;
