import React, { type ReactNode, type DetailedHTMLProps, type AnchorHTMLAttributes } from "react";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";

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
) => ReturnType<React.FC> = props => {
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

//<a {...props} />;

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

            anchor: {
                if (target === undefined || !target.startsWith("#")) {
                    break anchor;
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
