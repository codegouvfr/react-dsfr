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
    bugerMenuButtonText: string;
    sticky?: boolean | "full-height";
};

export namespace SideMenuProps {
    export type Item = ItemWithLinkProps | ItemWithItems;

    export type ItemWithLinkProps = {
        text: string;
        items?: Item[];
        isActive?: boolean;
        linkProps: RegisteredLinkProps;
    };

    export type ItemWithItems = {
        text: string;
        items: Item[];
        isActive?: boolean;
        linkProps?: RegisteredLinkProps;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-sidemenu> */
export const SideMenu = memo(
    forwardRef<HTMLDivElement, SideMenuProps>((props, ref) => {
        const {
            className,
            title,
            items,
            style,
            align = "left",
            sticky = false,
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
            if (items) {
                return (
                    <li key={key} className={fr.cx("fr-sidemenu__item")}>
                        <button
                            aria-expanded="false"
                            className={fr.cx("fr-sidemenu__btn")}
                            aria-controls={`fr-sidemenu-item-${key}`}
                            {...(isActive && { ["aria-current"]: true })}
                        >
                            {text}
                        </button>
                        <div className={fr.cx("fr-collapse")} id={`fr-sidemenu-item-${key}`}>
                            <ul className={fr.cx("fr-sidemenu__list")}>
                                {items.map((item, i) => getItem(item, i, level))}
                            </ul>
                        </div>
                    </li>
                );
            } else {
                return (
                    <li key={key} className={fr.cx("fr-sidemenu__item")}>
                        <Link
                            target="_self"
                            {...linkProps}
                            {...(isActive && { ["aria-current"]: "page" })}
                            className={cx(fr.cx("fr-sidemenu__link"), linkProps?.className)}
                        >
                            {text}
                        </Link>
                    </li>
                );
            }
        };

        return (
            <nav
                {...rest}
                ref={ref}
                style={style}
                aria-labelledby="fr-sidemenu-title"
                className={cx(
                    fr.cx("fr-sidemenu", {
                        "fr-sidemenu--sticky": sticky === true,
                        "fr-sidemenu--right": align === "right",
                        "fr-sidemenu--sticky-full-height": sticky === "full-height"
                    }),
                    className
                )}
            >
                <div className={fr.cx("fr-sidemenu__inner")}>
                    <button
                        hidden
                        aria-expanded="false"
                        aria-controls="fr-sidemenu-wrapper"
                        className={fr.cx("fr-sidemenu__btn")}
                    >
                        {bugerMenuButtonText}
                    </button>
                    <div className={fr.cx("fr-collapse")} id="fr-sidemenu-wrapper">
                        {title !== undefined && (
                            <div className={fr.cx("fr-sidemenu__title")} id="fr-sidemenu-title">
                                {title}
                            </div>
                        )}
                        <ul className={fr.cx("fr-sidemenu__list")}>
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
