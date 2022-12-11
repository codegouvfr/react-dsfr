import React, { memo, forwardRef, useId } from "react";
import type { ReactNode } from "react";
import { createComponentI18nApi } from "../../lib/i18n";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type { RegisteredLinkProps } from "../../lib/routing";
import { fr } from "../../lib";
import { cx } from "../../lib/tools/cx";
import { useLink } from "../../lib/routing";
import type { MenuProps } from "./Menu";
import { Menu } from "./Menu";
import type { MegaMenuProps } from "./MegaMenu";
import { MegaMenu } from "./MegaMenu";

export type MainNavigationProps = {
    className?: string;
    items: MainNavigationProps.Item[];
    classes?: Partial<Record<"root" | "list" | "item" | "link" | "btn", string>>;
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
            menuProps?: undefined;
            megaMenuProps?: undefined;
        };

        export type Menu = Common & {
            linkProps?: undefined;
            menuProps: MenuProps;
            megaMenuProps?: undefined;
        };

        export type MegaMenu = Common & {
            linkProps?: undefined;
            menuProps?: undefined;
            megaMenuProps: MegaMenuProps;
        };
    }
}

export const MainNavigation = memo(
    forwardRef<HTMLDivElement, MainNavigationProps>((props, ref) => {
        const { className, items, classes = {}, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const { Link } = useLink();

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
                                menuProps,
                                megaMenuProps
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
                                            className={cx(fr.cx("fr-nav__btn"), classes.btn)}
                                            aria-expanded={false}
                                            aria-controls={getMenuId(i)}
                                            {...(isActive && { ["aria-current"]: true })}
                                        >
                                            {text}
                                        </button>
                                        {menuProps !== undefined && (
                                            <Menu
                                                {...menuProps}
                                                className={cx(
                                                    fr.cx("fr-collapse"),
                                                    menuProps.className
                                                )}
                                                id={getMenuId(i)}
                                            />
                                        )}
                                        {megaMenuProps !== undefined && (
                                            <MegaMenu
                                                {...megaMenuProps}
                                                className={cx(
                                                    fr.cx("fr-collapse"),
                                                    megaMenuProps.className
                                                )}
                                                id={getMenuId(i)}
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
