import React, { memo, forwardRef, useId } from "react";
import type { ReactNode } from "react";
import { fr } from "../lib";
import { createComponentI18nApi } from "../lib/i18n";
import { symToStr } from "tsafe/symToStr";
import { cx } from "../lib/tools/cx";
import type { LinkProps } from "../lib/routing";
import { useLink } from "../lib/routing";
import type { MainNavigationProps } from "./MainNavigation";
import { MainNavigation } from "./MainNavigation";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

//NOTE: WIP

export type HeaderProps = {
    className?: string;
    brandTop: ReactNode;
    serviceTitle?: ReactNode;
    serviceTagline?: ReactNode;
    /** Don't forget the title on the link for accessibility*/
    homeLinkProps: LinkProps;
    mainNavigationProps?: MainNavigationProps;
    classes?: Partial<
        Record<
            | "root"
            | "body"
            | "bodyRow"
            | "brand"
            | "brandTop"
            | "logo"
            | "navbar"
            | "service"
            | "serviceTitle"
            | "serviceTagline"
            | "menu"
            | "menuLinks",
            string
        >
    >;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-header> */
export const Header = memo(
    forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
        const {
            className,
            brandTop,
            serviceTitle,
            serviceTagline,
            homeLinkProps,
            mainNavigationProps,
            classes = {},
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const menuButtonId = `button-${useId()}`;
        const modalId = `modal-${useId()}`;

        const { t } = useTranslation();

        const { Link } = useLink();

        return (
            <header
                role="banner"
                className={cx(fr.cx("fr-header"), classes.root, className)}
                ref={ref}
                {...rest}
            >
                <div className={cx(fr.cx("fr-header__body" as any), classes.body)}>
                    <div className={fr.cx("fr-container")}>
                        <div className={cx(fr.cx("fr-header__body-row"), classes.bodyRow)}>
                            <div
                                className={cx(
                                    fr.cx("fr-header__brand", "fr-enlarge-link"),
                                    classes.brand
                                )}
                            >
                                <div
                                    className={cx(fr.cx("fr-header__brand-top"), classes.brandTop)}
                                >
                                    <div className={cx(fr.cx("fr-header__logo"), classes.logo)}>
                                        {(() => {
                                            const children = (
                                                <p className={fr.cx("fr-logo")}>{brandTop}</p>
                                            );

                                            return serviceTitle !== undefined ? (
                                                children
                                            ) : (
                                                <Link {...homeLinkProps}>{children}</Link>
                                            );
                                        })()}
                                    </div>
                                    {mainNavigationProps !== undefined && (
                                        <div
                                            className={cx(
                                                fr.cx("fr-header__navbar"),
                                                classes.navbar
                                            )}
                                        >
                                            <button
                                                className={fr.cx("fr-btn--menu", "fr-btn")}
                                                data-fr-opened="false"
                                                aria-controls={modalId}
                                                aria-haspopup="menu"
                                                id={menuButtonId}
                                                title="Menu"
                                            >
                                                {t("menu")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {serviceTitle !== undefined && (
                                    <div
                                        className={cx(fr.cx("fr-header__service"), classes.service)}
                                    >
                                        <Link {...homeLinkProps}>
                                            <p
                                                className={cx(
                                                    fr.cx("fr-header__service-title"),
                                                    classes.serviceTitle
                                                )}
                                            >
                                                {serviceTitle}
                                            </p>
                                        </Link>
                                        {serviceTagline !== undefined && (
                                            <p
                                                className={cx(
                                                    fr.cx("fr-header__service-tagline" as any),
                                                    classes.serviceTagline
                                                )}
                                            >
                                                {serviceTagline}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {mainNavigationProps !== undefined && (
                    <div
                        className={cx(fr.cx("fr-header__menu", "fr-modal"), classes.menu)}
                        id={modalId}
                        aria-labelledby={menuButtonId}
                    >
                        <div className={fr.cx("fr-container")}>
                            <button
                                className={fr.cx("fr-btn--close", "fr-btn")}
                                aria-controls={modalId}
                                title={t("close")}
                            >
                                {t("close")}
                            </button>
                            <div
                                className={cx(fr.cx("fr-header__menu-links"), classes.menuLinks)}
                            />
                            <MainNavigation {...mainNavigationProps} />
                        </div>
                    </div>
                )}
            </header>
        );
    })
);

Header.displayName = symToStr({ Header });

const { useTranslation, addHeaderTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Header }),
    "frMessages": {
        /* spell-checker: disable */
        "menu": "Menu",
        "close": "Fermer"
        /* spell-checker: enable */
    }
});

addHeaderTranslations({
    "lang": "en",
    "messages": {
        "close": "Close"
    }
});

export { addHeaderTranslations };
