import React, { type ReactNode, type DetailedHTMLProps, type AnchorHTMLAttributes } from "react";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";
import type { UnpackProps } from "./tools/UnpackProps";

type HTMLAnchorProps = DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegisterLink {}

export type RegisteredLinkProps = RegisterLink extends { Link: infer Link }
    ?
          | Omit<UnpackProps<Link>, "children">
          | (Omit<HTMLAnchorProps, "children" | "href"> & {
                href:
                    | `//${string}`
                    | `https://${string}`
                    | `http://${string}`
                    | `#${string}`
                    | string; // to handle mailto:mail@domain.fr or tel:0123456789  ...
            })
    : Omit<HTMLAnchorProps, "children">;

let Link: React.ComponentType<RegisteredLinkProps & { children: ReactNode }> = props => {
    const { href, ...rest } = props as { to?: string; href?: string };

    button: {
        if (href !== "#" || !("onClick" in rest)) {
            break button;
        }

        assert(
            is<
                React.DetailedHTMLProps<
                    React.ButtonHTMLAttributes<HTMLButtonElement>,
                    HTMLButtonElement
                >
            >(rest)
        );

        return <button {...rest} className={cx(fr.cx("fr-link"), rest.className)} />;
    }

    return <a href={href} {...rest} />;
};

export function setLink(params: { Link: typeof Link }): void {
    Link = props => {
        {
            const { to, href, ...rest } = props as { to?: string; href?: string };

            const target =
                (typeof to === "string" ? to : undefined) ??
                (typeof href === "string" ? href : undefined);

            button: {
                if (target !== "#" || !("onClick" in rest)) {
                    break button;
                }

                assert(
                    is<
                        React.DetailedHTMLProps<
                            React.ButtonHTMLAttributes<HTMLButtonElement>,
                            HTMLButtonElement
                        >
                    >(rest)
                );

                return <button {...rest} className={cx(fr.cx("fr-link"), rest.className)} />;
            }

            external_links: {
                if (
                    target === undefined ||
                    (!target.startsWith("//") && !/^https?:\/\//.test(target))
                ) {
                    break external_links;
                }

                return <a href={target} target="_blank" rel="noreferrer" {...rest} />;
            }

            anchor: {
                if (target === undefined || !target.startsWith("#")) {
                    break anchor;
                }

                return <a href={target} {...rest} />;
            }

            uri_scheme: {
                // Check if the 'target' starts with a valid URI scheme (e.g., 'mailto:', 'tel:', 'skype:', 'facetime:', etc.)
                const regex = /^[a-z]+:/;
                if (target === undefined || !regex.test(target)) {
                    break uri_scheme;
                }

                return <a href={target} {...rest} />;
            }
        }

        return <params.Link {...props} />;
    };
}

export function getLink() {
    return { Link };
}
