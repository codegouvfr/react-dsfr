import React, { memo, forwardRef, type ReactNode, type CSSProperties, useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type { RegisteredLinkProps } from "./link";
import { getLink } from "./link";
import { fr } from "./fr";
import { cx } from "./tools/cx";

//https://main--ds-gouv.netlify.app/example/component/sidemenu/
export type SideMenuProps = {
    title?: ReactNode;
    className?: string;
    style?: CSSProperties;
    align?: "left" | "right";
    items: SideMenuProps.Item[];
    burgerMenuButtonText: ReactNode;
    /** Default: false */
    sticky?: boolean;
    /** Default: false, only relevent when sticky */
    fullHeight?: boolean;
    classes?: Partial<
        Record<"root" | "inner" | "title" | "list" | "item" | "link" | "button", string>
    >;
};

export namespace SideMenuProps {
    export type Item = Item.Link | Item.SubMenu;

    export namespace Item {
        type Common = {
            text: ReactNode;
            /** Default: false */
            isActive?: boolean;
        };

        export type Link = Common & {
            linkProps: RegisteredLinkProps;
        };

        export type SubMenu = Common & {
            items: Item[];
            /** Default: false */
            expandedByDefault?: boolean;
        };
    }
}

/** @see <https://components.react-dsfr.fr/?path=/docs/components-sidemenu> */
export const SideMenu = memo(
    forwardRef<HTMLDivElement, SideMenuProps>((props, ref) => {
        const {
            title,
            items,
            style,
            sticky,
            className,
            fullHeight,
            classes = {},
            align = "left",
            burgerMenuButtonText,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = getLink();

        const { wrapperId, titleId, getItemId } = (function useClosure() {
            const id = useId();

            const wrapperId = `fr-sidemenu-wrapper-${id}`;

            const titleId = `fr-sidemenu-title-${id}`;

            const getItemId = (params: { level: number; key: string }) => {
                const { level, key } = params;

                return `fr-sidemenu-item-${id}-${level}-${key}`;
            };

            return { wrapperId, titleId, getItemId };
        })();

        return (
            <nav
                {...rest}
                ref={ref}
                style={style}
                aria-labelledby={titleId}
                className={cx(
                    fr.cx("fr-sidemenu", {
                        "fr-sidemenu--right": align === "right",
                        "fr-sidemenu--sticky": sticky && !fullHeight,
                        "fr-sidemenu--sticky-full-height": sticky && fullHeight
                    }),
                    classes.root,
                    className
                )}
            >
                <div className={cx(fr.cx("fr-sidemenu__inner"), classes.inner)}>
                    <button
                        hidden
                        aria-expanded="false"
                        aria-controls={wrapperId}
                        className={cx(fr.cx("fr-sidemenu__btn"), classes.button)}
                    >
                        {burgerMenuButtonText}
                    </button>
                    <div className={fr.cx("fr-collapse")} id={wrapperId}>
                        {title !== undefined && (
                            <div
                                className={cx(fr.cx("fr-sidemenu__title"), classes.title)}
                                id={titleId}
                            >
                                {title}
                            </div>
                        )}
                        <ul className={cx(fr.cx("fr-sidemenu__list"), classes.list)}>
                            {items.map((item, i) => {
                                const getItemRec = (params: {
                                    item: SideMenuProps.Item;
                                    key: string;
                                    level: number;
                                }) => {
                                    const { item, key, level } = params;

                                    const itemId = getItemId({ key, level });

                                    return (
                                        <li
                                            key={key}
                                            className={cx(fr.cx("fr-sidemenu__item"), classes.item)}
                                        >
                                            {"items" in item ? (
                                                <>
                                                    <button
                                                        aria-expanded={
                                                            item.expandedByDefault ?? false
                                                                ? "true"
                                                                : "false"
                                                        }
                                                        aria-controls={itemId}
                                                        {...(item.isActive && {
                                                            ["aria-current"]: true
                                                        })}
                                                        className={cx(
                                                            fr.cx("fr-sidemenu__btn"),
                                                            classes.button
                                                        )}
                                                    >
                                                        {item.text}
                                                    </button>
                                                    <div
                                                        className={fr.cx("fr-collapse")}
                                                        id={itemId}
                                                    >
                                                        <ul
                                                            className={cx(
                                                                fr.cx("fr-sidemenu__list"),
                                                                classes.list
                                                            )}
                                                        >
                                                            {item.items.map((item, i) =>
                                                                getItemRec({
                                                                    item,
                                                                    "key": `${i}`,
                                                                    "level": level + 1
                                                                })
                                                            )}
                                                        </ul>
                                                    </div>
                                                </>
                                            ) : (
                                                <Link
                                                    target="_self"
                                                    {...item.linkProps}
                                                    {...(item.isActive && {
                                                        ["aria-current"]: "page"
                                                    })}
                                                    className={cx(
                                                        fr.cx("fr-sidemenu__link"),
                                                        classes.link,
                                                        item.linkProps?.className
                                                    )}
                                                >
                                                    {item.text}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                };

                                return getItemRec({
                                    "key": `${i}`,
                                    item,
                                    "level": 0
                                });
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    })
);

SideMenu.displayName = symToStr({ SideMenu });

export default SideMenu;
