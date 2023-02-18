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
    Link = props => {
        external_link_react_router: {
            const { to, ...rest } = props as { to?: string };

            if (to === undefined || (!to.startsWith("//") && !/^https?:\/\//.test(to))) {
                break external_link_react_router;
            }

            return <a href={to} target="_blank" {...rest} />;
        }

        return <params.Link {...props} />;
    };
}

export function getLink() {
    return { Link };
}
