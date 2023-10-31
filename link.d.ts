import React, { type ReactNode, type DetailedHTMLProps, type AnchorHTMLAttributes } from "react";
import type { UnpackProps } from "./tools/UnpackProps";
type HTMLAnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
export interface RegisterLink {
}
export type RegisteredLinkProps = RegisterLink extends {
    Link: infer Link;
} ? Omit<UnpackProps<Link>, "children"> : Omit<HTMLAnchorProps, "children">;
declare let Link: (props: RegisteredLinkProps & {
    children: ReactNode;
}) => ReturnType<React.FC>;
export declare function setLink(params: {
    Link: typeof Link;
}): void;
export declare function getLink(): {
    Link: (props: Omit<HTMLAnchorProps, "children"> & {
        children: React.ReactNode;
    }) => React.ReactElement<any, any> | null;
};
export {};
