import React, { memo, forwardRef, useId } from "react";
import type { ReactNode } from "react";
import { createComponentI18nApi } from "../i18n";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type { RegisteredLinkProps } from "../link";
import { getLink } from "../link";
import { fr } from "../fr";
import { cx } from "../tools/cx";
import type { MenuProps } from "./Menu";
import { Menu } from "./Menu";
import type { MegaMenuProps } from "./MegaMenu";
import { MegaMenu } from "./MegaMenu";

export type MainNavigationProps = {
    className?: string;
    items: MainNavigationProps.Item[];
    classes?: Partial<
        Record<
            | "root"
            | "list"
            | "item"
            | "link"
            | "btn"
            | "menu"
            | "menuList"
            | "megaMenu"
            | "megaMenuLeader"
            | "megaMenuCategory"
            | "megaMenuList",
            string
        >
    >;
};

export namespace MainNavigationProps {
    export type Item = Item.Link | Item.Menu | Item.MegaMenu;

    export namespace Item {
        export type Common = {
            isActive?: boolean;
            className?: string;
            text: ReactNode;
        };

        export type Link = Common & {
            linkProps: RegisteredLinkProps;
            menuLinks?: never;
            megaMenu?: never;
            buttonProps?: never;
        };

        export type Menu = Common & {
            linkProps?: never;
            menuLinks: MenuProps.Link[];
            megaMenu?: never;
            /** @see <https://github.com/codegouvfr/react-dsfr/issues/38> */
            buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
        };

        export type MegaMenu = Common & {
            linkProps?: never;
            menuLinks?: never;
            megaMenu: {
                leader?: MegaMenuProps.Leader;
                categories: MegaMenuProps.Category[];
            };
            /** @see <https://github.com/codegouvfr/react-dsfr/issues/38> */
            buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
        };
    }
}

export const MainNavigation = memo(
    forwardRef<HTMLDivElement, MainNavigationProps>((props, ref) => {
        const { className, items, classes = {}, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const { Link } = getLink();

        const { getMenuId } = (function useClosure() {
            const id = useId();

            const getMenuId = (i: number) => `menu-${id}-${i}`;

            return { getMenuId };
        })();

        return (
            <nav
                className={cx(fr.cx("fr-nav"), classes.root, className)}
                role="navigation"
                aria-label={t("main menu")}
                ref={ref}
                {...rest}
            >
                <ul className={cx(fr.cx("fr-nav__list"), classes.list)}>
                    {items.map(
                        (
                            {
                                className,
                                text,
                                isActive = false,
                                linkProps,
                                menuLinks = [],
                                megaMenu,
                                buttonProps = {}
                            },
                            i
                        ) => (
                            <li
                                key={i}
                                className={cx(fr.cx("fr-nav__item"), classes.item, className)}
                            >
                                {linkProps !== undefined ? (
                                    <Link
                                        {...linkProps}
                                        className={cx(
                                            fr.cx("fr-nav__link"),
                                            classes.link,
                                            linkProps.className
                                        )}
                                        {...(isActive && { ["aria-current"]: "page" })}
                                    >
                                        {text}
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            {...buttonProps}
                                            className={cx(
                                                fr.cx("fr-nav__btn"),
                                                buttonProps.className,
                                                classes.btn
                                            )}
                                            aria-expanded={false}
                                            aria-controls={getMenuId(i)}
                                            {...(isActive && { ["aria-current"]: true })}
                                        >
                                            {text}
                                        </button>
                                        {menuLinks.length !== 0 && (
                                            <Menu
                                                classes={{
                                                    "root": cx(fr.cx("fr-collapse"), classes.root),
                                                    "list": classes.menuList
                                                }}
                                                links={menuLinks}
                                                id={getMenuId(i)}
                                            />
                                        )}
                                        {megaMenu !== undefined && (
                                            <MegaMenu
                                                classes={{
                                                    "root": cx(
                                                        fr.cx("fr-collapse"),
                                                        classes.megaMenu
                                                    ),
                                                    "leader": classes.megaMenuLeader,
                                                    "category": classes.megaMenuCategory,
                                                    "list": classes.menuList
                                                }}
                                                id={getMenuId(i)}
                                                leader={megaMenu.leader}
                                                categories={megaMenu.categories}
                                            />
                                        )}
                                    </>
                                )}
                            </li>
                        )
                    )}
                </ul>
            </nav>
        );
    })
);

MainNavigation.displayName = symToStr({ MainNavigation });

export default MainNavigation;

const { useTranslation, addMainNavigationTranslations } = createComponentI18nApi({
    "componentName": symToStr({ MainNavigation }),
    "frMessages": {
        /* spell-checker: disable */
        "main menu": "Menu principal"
        /* spell-checker: enable */
    }
});

addMainNavigationTranslations({
    "lang": "en",
    "messages": {
        "main menu": "Main menu"
    }
});

export { addMainNavigationTranslations };
