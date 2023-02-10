import React, { type ReactNode, type DetailedHTMLProps, type AnchorHTMLAttributes } from "react";

type HTMLAnchorProps = DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegisterLink {}

export type RegisteredLinkProps = RegisterLink extends {
    Link: (props: infer LinkProps) => any;
}
    ? Omit<LinkProps, "children">
    : Omit<HTMLAnchorProps, "children">;

let Link: (
    props: RegisteredLinkProps & { children: ReactNode }
) => ReturnType<React.FC> = props => <a {...props} />;

export function setLink(params: { Link: typeof Link }): void {
    Link = params.Link;
}

export function getLink() {
    return { Link };
}
