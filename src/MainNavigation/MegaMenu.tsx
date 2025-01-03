import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "../i18n";
import { fr } from "../fr";
import { cx } from "../tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { getLink } from "../link";
import type { RegisteredLinkProps } from "../link";
import { generateValidHtmlId } from "../tools/generateValidHtmlId";

export type MegaMenuProps = {
    classes?: Partial<Record<"root" | "leader" | "category" | "list", string>>;
    style?: CSSProperties;
    leader?: MegaMenuProps.Leader;
    categories: MegaMenuProps.Category[];
};
export namespace MegaMenuProps {
    export type Leader = {
        title: ReactNode;
        paragraph: ReactNode;
        link?: {
            linkProps: RegisteredLinkProps;
            text: ReactNode;
        };
    };

    export type Category = {
        links: {
            text: ReactNode;
            linkProps: RegisteredLinkProps;
            isActive?: boolean;
        }[];
    } & (
        | {
              categoryMainLink: {
                  text: ReactNode;
                  linkProps: RegisteredLinkProps;
              };
              categoryMainText?: never;
          }
        | {
              categoryMainText: ReactNode;
              categoryMainLink?: never;
          }
    );
}

export const MegaMenu = memo(
    forwardRef<HTMLDivElement, MegaMenuProps & { id: string }>((props, ref) => {
        const { id, classes = {}, style, leader, categories, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const { Link } = getLink();

        return (
            <div
                className={cx(fr.cx("fr-mega-menu"), classes.root)}
                style={style}
                tabIndex={-1}
                id={id}
                ref={ref}
                {...rest}
            >
                <div className={fr.cx("fr-container", "fr-container--fluid", "fr-container-lg")}>
                    <button className={fr.cx("fr-link--close", "fr-link")} aria-controls={id}>
                        {t("close")}
                    </button>
                    <div className={fr.cx("fr-grid-row", "fr-grid-row-lg--gutters")}>
                        {leader !== undefined && (
                            <div
                                className={fr.cx(
                                    "fr-col-12",
                                    "fr-col-lg-8",
                                    "fr-col-offset-lg-4--right",
                                    "fr-mb-4v"
                                )}
                            >
                                <div className={cx(fr.cx("fr-mega-menu__leader"), classes.leader)}>
                                    <h4 className={fr.cx("fr-h4", "fr-mb-2v")}>{leader.title}</h4>
                                    <p className={fr.cx("fr-hidden", "fr-displayed-lg")}>
                                        {leader.paragraph}
                                    </p>
                                    {leader.link !== undefined && (
                                        <Link
                                            {...leader.link.linkProps}
                                            id={
                                                leader.link.linkProps.id ??
                                                `${id}-leader-link${generateValidHtmlId({
                                                    "text": leader.link.text
                                                })}`
                                            }
                                            className={cx(
                                                fr.cx(
                                                    "fr-link",
                                                    "fr-icon-arrow-right-line",
                                                    "fr-link--icon-right",
                                                    "fr-link--align-on-content" as any
                                                ),
                                                leader.link.linkProps.className
                                            )}
                                        >
                                            {leader.link.text}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                        {categories.map(({ categoryMainLink, categoryMainText, links }, i) => (
                            <div className={fr.cx("fr-col-12", "fr-col-lg-3")} key={i}>
                                {categoryMainLink !== undefined && (
                                    <h5
                                        className={cx(
                                            fr.cx("fr-mega-menu__category"),
                                            classes.category
                                        )}
                                    >
                                        <Link
                                            {...categoryMainLink.linkProps}
                                            id={
                                                categoryMainLink.linkProps.id ??
                                                `${id}-category-link${generateValidHtmlId({
                                                    "text": categoryMainLink.text
                                                })}-${i}`
                                            }
                                            className={cx(
                                                fr.cx("fr-nav__link"),
                                                categoryMainLink.linkProps.className
                                            )}
                                        >
                                            {categoryMainLink.text}
                                        </Link>
                                    </h5>
                                )}
                                {categoryMainText !== undefined && (
                                    <h5
                                        className={cx(
                                            fr.cx("fr-mega-menu__category"),
                                            classes.category,
                                            fr.cx("fr-nav__link")
                                        )}
                                    >
                                        {categoryMainText}
                                    </h5>
                                )}
                                <ul className={cx(fr.cx("fr-mega-menu__list"), classes.list)}>
                                    {links.map(({ linkProps, text, isActive }, j) => (
                                        <li key={j}>
                                            <Link
                                                {...linkProps}
                                                id={
                                                    linkProps.id ??
                                                    `${id}-link${generateValidHtmlId({
                                                        "text": text
                                                    })}-${i}-${j}`
                                                }
                                                className={cx(
                                                    fr.cx("fr-nav__link"),
                                                    linkProps.className
                                                )}
                                                {...(!isActive ? {} : { "aria-current": "page" })}
                                            >
                                                {text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    })
);

MegaMenu.displayName = symToStr({ MegaMenu });

const { useTranslation, addMegaMenuTranslations } = createComponentI18nApi({
    "componentName": symToStr({ MegaMenu }),
    "frMessages": {
        /* spell-checker: disable */
        "close": "Fermer"
        /* spell-checker: enable */
    }
});

addMegaMenuTranslations({
    "lang": "en",
    "messages": {
        "close": "Close"
    }
});

export { addMegaMenuTranslations };

export default MegaMenu;
