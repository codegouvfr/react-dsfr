import type { ReactNode } from "react";
import type { RegisteredLinkProps } from "../link";
export declare function setBrandTopAndHomeLinkProps(params: {
    brandTop: ReactNode;
    homeLinkProps: RegisteredLinkProps & {
        title: string;
    };
}): void;
export declare function getBrandTopAndHomeLinkProps(): {
    brandTop: ReactNode;
    homeLinkProps: Omit<import("react").ClassAttributes<HTMLAnchorElement> & import("react").AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
        title: string;
    };
} | undefined;
