import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
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
    bugerMenuButtonText: ReactNode;
    /** Default: false */
    sticky?: boolean;
    /** Default: false, only relevent when sticky */
    fullHeight?: boolean;
    classes?: Partial<
        Record<"root" | "inner" | "title" | "list" | "item" | "link" | "button", string>
    >;
};

export namespace SideMenuProps {
    export type Item = Item.Link & Item.SubMenu;

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
            items?: Item[];
        };
    }
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-sidemenu> */
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
            bugerMenuButtonText,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = getLink();

        const getItem = (
            { isActive, linkProps, text, items }: SideMenuProps.Item,
            key: number,
            level = 0
        ) => {
            if (++level > 2) return null;

            return (
                <li key={key} className={cx(fr.cx("fr-sidemenu__item"), classes.item)}>
                    {items ? (
                        <>
                            <button
                                aria-expanded="false"
                                aria-controls={`fr-sidemenu-item-${key}`}
                                {...(isActive && { ["aria-current"]: true })}
                                className={cx(fr.cx("fr-sidemenu__btn"), classes.button)}
                            >
                                {text}
                            </button>
                            <div className={fr.cx("fr-collapse")} id={`fr-sidemenu-item-${key}`}>
                                <ul className={cx(fr.cx("fr-sidemenu__list"), classes.list)}>
                                    {items.map((item, i) => getItem(item, i, level))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <Link
                            target="_self"
                            {...linkProps}
                            {...(isActive && { ["aria-current"]: "page" })}
                            className={cx(
                                fr.cx("fr-sidemenu__link"),
                                classes.link,
                                linkProps?.className
                            )}
                        >
                            {text}
                        </Link>
                    )}
                </li>
            );
        };

        return (
            <nav
                {...rest}
                ref={ref}
                style={style}
                aria-labelledby="fr-sidemenu-title"
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
                        aria-controls="fr-sidemenu-wrapper"
                        className={cx(fr.cx("fr-sidemenu__btn"), classes.button)}
                    >
                        {bugerMenuButtonText}
                    </button>
                    <div className={fr.cx("fr-collapse")} id="fr-sidemenu-wrapper">
                        {title !== undefined && (
                            <div
                                className={cx(fr.cx("fr-sidemenu__title"), classes.title)}
                                id="fr-sidemenu-title"
                            >
                                {title}
                            </div>
                        )}
                        <ul className={cx(fr.cx("fr-sidemenu__list"), classes.list)}>
                            {items.map((item, i) => getItem(item, i))}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    })
);

SideMenu.displayName = symToStr({ SideMenu });

export default SideMenu;
