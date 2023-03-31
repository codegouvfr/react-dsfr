import React, { type ReactNode, type DetailedHTMLProps, type AnchorHTMLAttributes } from "react";
import { UrlObject, format } from "url";

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

/**
 * Returns a url string from an Link href. If the link href is an UrlObject, it is converted to a string
 *
 * Return undefined if the href params is undefined
 */
function getUrlStringFromLinkHref(href: string | UrlObject | undefined): string | undefined {
    if (href === undefined || typeof href === "string") {
        return href;
    }

    // format is deprecated but didn't find a real alternative yet
    return format(href);
}

export function setLink(params: { Link: typeof Link }): void {
    Link = props => {
        {
            const { to, href, ...rest } = props as { to?: string; href?: string | UrlObject };

            const target = to ?? getUrlStringFromLinkHref(href);

            mailto: {
                if (target === undefined || !target.startsWith("mailto:")) {
                    break mailto;
                }

                return <a href={target} {...rest} />;
            }

            external_links: {
                if (
                    target === undefined ||
                    (!target.startsWith("//") && !/^https?:\/\//.test(target))
                ) {
                    break external_links;
                }

                return <a href={target} target="_blank" {...rest} />;
            }
        }

        return <params.Link {...props} />;
    };
}

export function getLink() {
    return { Link };
}
