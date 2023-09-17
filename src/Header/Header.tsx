import React, {
    memo,
    forwardRef,
    useId,
    type ReactNode,
    type CSSProperties,
    type ComponentProps
} from "react";
import { fr } from "../fr";
import { createComponentI18nApi } from "../i18n";
import { symToStr } from "tsafe/symToStr";
import { cx } from "../tools/cx";
import { getLink } from "../link";
import type { RegisteredLinkProps } from "../link";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type { FrIconClassName, RiIconClassName } from "../fr/generatedFromCss/classNames";
import type { MainNavigationProps } from "../MainNavigation";
import { MainNavigation } from "../MainNavigation";
import { Display } from "../Display/Display";
import { setBrandTopAndHomeLinkProps } from "../zz_internal/brandTopAndHomeLinkProps";
import { typeGuard } from "tsafe/typeGuard";
import { SearchButton } from "../SearchBar/SearchButton";
import { useTranslation as useSearchBarTranslation } from "../SearchBar/SearchBar";
import { generateValidHtmlId } from "../tools/generateValidHtmlId";

export type HeaderProps = {
    className?: string;
    id?: string;
    brandTop: ReactNode;
    homeLinkProps: RegisteredLinkProps & { title: string };
    serviceTitle?: ReactNode;
    serviceTagline?: ReactNode;
    navigation?: MainNavigationProps.Item[] | ReactNode;
    /** There should be at most three of them */
    quickAccessItems?: (HeaderProps.QuickAccessItem | ReactNode)[];
    operatorLogo?: {
        orientation: "horizontal" | "vertical";
        /**
         * Expected ratio:
         * If "vertical": 9x16
         * If "horizontal": 16x9
         */
        imgUrl: string;
        /** Textual alternative of the image, it MUST include the text present in the image*/
        alt: string;
    };
    renderSearchInput?: (
        /**
         * id and name must be forwarded to the <input /> component
         * the others params can, but it's not mandatory.
         **/
        params: {
            id: string;
            type: "search";
            className: string;
            placeholder: string;
        }
    ) => JSX.Element;
    /** Called when the search button is clicked */
    onSearchButtonClick?: (text: string) => void;
    classes?: Partial<
        Record<
            | "root"
            | "body"
            | "container"
            | "bodyRow"
            | "brand"
            | "brandTop"
            | "logo"
            | "operator"
            | "navbar"
            | "service"
            | "serviceTitle"
            | "serviceTagline"
            | "toolsLinks"
            | "menu"
            | "menuLinks",
            string
        >
    >;
    style?: CSSProperties;
};

export namespace HeaderProps {
    export type QuickAccessItem = QuickAccessItem.Link | QuickAccessItem.Button;

    export namespace QuickAccessItem {
        export type Common = {
            iconId: FrIconClassName | RiIconClassName;
            text: ReactNode;
        };

        export type Link = Common & {
            linkProps: RegisteredLinkProps;
            buttonProps?: never;
        };

        export type Button = Common & {
            linkProps?: never;
            buttonProps: ComponentProps<"button"> &
                Record<`data-${string}`, string | boolean | null | undefined>;
        };
    }
}

export const headerMenuModalIdPrefix = "header-menu-modal";

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-header> */
export const Header = memo(
    forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
        const {
            className,
            id: id_props,
            brandTop,
            serviceTitle,
            serviceTagline,
            homeLinkProps,
            navigation = undefined,
            quickAccessItems = [],
            operatorLogo,
            renderSearchInput,
            onSearchButtonClick,
            classes = {},
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = id_props ?? "fr-header";

        const menuModalId = `${headerMenuModalIdPrefix}-${id}`;
        const menuButtonId = `${id}-menu-button`;
        const searchModalId = `${id}-search-modal`;
        const searchInputId = `${id}-search-input`;

        const isSearchBarEnabled =
            renderSearchInput !== undefined || onSearchButtonClick !== undefined;

        setBrandTopAndHomeLinkProps({ brandTop, homeLinkProps });

        const { t } = useTranslation();
        const { t: tSearchBar } = useSearchBarTranslation();

        const { Link } = getLink();

        const getQuickAccessNode = (suffix: string | null = null) => (
            <ul className={fr.cx("fr-btns-group")}>
                {quickAccessItems.map((quickAccessItem, i) => (
                    <li key={i}>
                        {!typeGuard<HeaderProps.QuickAccessItem>(
                            quickAccessItem,
                            quickAccessItem instanceof Object && "text" in quickAccessItem
                        ) ? (
                            quickAccessItem
                        ) : (
                            <HeaderQuickAccessItem
                                id={`${id}-quick-access-item-${generateValidHtmlId({
                                    "fallback": "",
                                    "text": `${quickAccessItem.text}${suffix ? `-${suffix}` : ""}`
                                })}-${i}`}
                                quickAccessItem={quickAccessItem}
                            />
                        )}
                    </li>
                ))}
            </ul>
        );

        return (
            <>
                <Display />
                <header
                    role="banner"
                    id={id}
                    className={cx(fr.cx("fr-header"), classes.root, className)}
                    ref={ref}
                    style={style}
                    {...rest}
                >
                    <div className={cx(fr.cx("fr-header__body" as any), classes.body)}>
                        <div className={cx(fr.cx("fr-container"), classes.container)}>
                            <div className={cx(fr.cx("fr-header__body-row"), classes.bodyRow)}>
                                <div
                                    className={cx(
                                        fr.cx("fr-header__brand", "fr-enlarge-link"),
                                        classes.brand
                                    )}
                                >
                                    <div
                                        className={cx(
                                            fr.cx("fr-header__brand-top"),
                                            classes.brandTop
                                        )}
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
                                        {operatorLogo !== undefined && (
                                            <div
                                                className={cx(
                                                    fr.cx("fr-header__operator"),
                                                    classes.operator
                                                )}
                                            >
                                                <Link {...homeLinkProps}>
                                                    <img
                                                        className={cx(
                                                            fr.cx("fr-responsive-img"),
                                                            classes.operator
                                                        )}
                                                        style={(() => {
                                                            switch (operatorLogo.orientation) {
                                                                case "vertical":
                                                                    return { "width": "3.5rem" };
                                                                case "horizontal":
                                                                    return {
                                                                        "maxWidth": "9.0625rem"
                                                                    };
                                                            }
                                                        })()}
                                                        src={operatorLogo.imgUrl}
                                                        alt={operatorLogo.alt}
                                                    />
                                                </Link>
                                            </div>
                                        )}

                                        {(quickAccessItems.length > 0 ||
                                            navigation !== undefined ||
                                            isSearchBarEnabled) && (
                                            <div
                                                className={cx(
                                                    fr.cx("fr-header__navbar"),
                                                    classes.navbar
                                                )}
                                            >
                                                {isSearchBarEnabled && (
                                                    <button
                                                        id={`${id}-search-button`}
                                                        className={fr.cx(
                                                            "fr-btn--search",
                                                            "fr-btn"
                                                        )}
                                                        data-fr-opened={false}
                                                        aria-controls={searchModalId}
                                                        title={tSearchBar("label")}
                                                    >
                                                        {tSearchBar("label")}
                                                    </button>
                                                )}
                                                <button
                                                    className={fr.cx("fr-btn--menu", "fr-btn")}
                                                    data-fr-opened="false"
                                                    aria-controls={menuModalId}
                                                    aria-haspopup="menu"
                                                    id={menuButtonId}
                                                    title={t("menu")}
                                                >
                                                    {t("menu")}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {serviceTitle !== undefined && (
                                        <div
                                            className={cx(
                                                fr.cx("fr-header__service"),
                                                classes.service
                                            )}
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

                                {(quickAccessItems.length > 0 || isSearchBarEnabled) && (
                                    <div className={fr.cx("fr-header__tools")}>
                                        {quickAccessItems.length > 0 && (
                                            <div
                                                className={cx(
                                                    fr.cx("fr-header__tools-links"),
                                                    classes.toolsLinks
                                                )}
                                            >
                                                {getQuickAccessNode()}
                                            </div>
                                        )}

                                        {isSearchBarEnabled && (
                                            <div
                                                className={fr.cx("fr-header__search", "fr-modal")}
                                                id={searchModalId}
                                            >
                                                <div
                                                    className={fr.cx(
                                                        "fr-container",
                                                        "fr-container-lg--fluid"
                                                    )}
                                                >
                                                    <button
                                                        id={`${id}-search-button`}
                                                        className={fr.cx("fr-btn--close", "fr-btn")}
                                                        aria-controls={searchModalId}
                                                        title={t("close")}
                                                    >
                                                        {t("close")}
                                                    </button>
                                                    <div
                                                        className={fr.cx("fr-search-bar")}
                                                        role="search"
                                                    >
                                                        <label
                                                            className={fr.cx("fr-label")}
                                                            htmlFor={searchInputId}
                                                        >
                                                            {tSearchBar("label")}
                                                        </label>
                                                        {(
                                                            renderSearchInput ??
                                                            (({
                                                                className,
                                                                id,
                                                                placeholder,
                                                                type
                                                            }) => (
                                                                <input
                                                                    className={className}
                                                                    id={id}
                                                                    placeholder={placeholder}
                                                                    type={type}
                                                                />
                                                            ))
                                                        )({
                                                            "className": fr.cx("fr-input"),
                                                            "id": searchInputId,
                                                            "placeholder": tSearchBar("label"),
                                                            "type": "search"
                                                        })}
                                                        <SearchButton
                                                            id={`${id}-search-bar-button`}
                                                            searchInputId={searchInputId}
                                                            onClick={onSearchButtonClick}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {(navigation !== undefined || quickAccessItems.length !== 0) && (
                        <div
                            className={cx(fr.cx("fr-header__menu", "fr-modal"), classes.menu)}
                            id={menuModalId}
                            aria-labelledby={menuButtonId}
                        >
                            <div className={fr.cx("fr-container")}>
                                <button
                                    id={`${id}-mobile-overlay-button-close`}
                                    className={fr.cx("fr-btn--close", "fr-btn")}
                                    aria-controls={menuModalId}
                                    title={t("close")}
                                >
                                    {t("close")}
                                </button>
                                <div
                                    className={cx(
                                        fr.cx("fr-header__menu-links"),
                                        classes.menuLinks
                                    )}
                                >
                                    {getQuickAccessNode("mobile")}
                                </div>
                                {navigation !== undefined &&
                                    (navigation instanceof Array ? (
                                        <MainNavigation
                                            id={`${id}-main-navigation`}
                                            items={navigation}
                                        />
                                    ) : (
                                        navigation
                                    ))}
                            </div>
                        </div>
                    )}
                </header>
            </>
        );
    })
);

Header.displayName = symToStr({ Header });

export default Header;

export const { useTranslation, addHeaderTranslations } = createComponentI18nApi({
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

export type HeaderQuickAccessItemProps = {
    id?: string;
    className?: string;
    quickAccessItem: HeaderProps.QuickAccessItem;
};

export function HeaderQuickAccessItem(props: HeaderQuickAccessItemProps): JSX.Element {
    const { id: id_props, className, quickAccessItem } = props;

    const { Link } = getLink();

    const id = (function useClosure() {
        const id = useId();

        return (
            id_props ??
            (quickAccessItem.linkProps !== undefined
                ? quickAccessItem.linkProps.id
                : quickAccessItem.buttonProps.id) ??
            `fr-header-quick-access-item${generateValidHtmlId({
                "text": quickAccessItem.text,
                "fallback": id
            })}`
        );
    })();

    return quickAccessItem.linkProps !== undefined ? (
        <Link
            {...quickAccessItem.linkProps}
            id={id}
            className={cx(
                fr.cx("fr-btn", quickAccessItem.iconId),
                quickAccessItem.linkProps.className,
                className
            )}
        >
            {quickAccessItem.text}
        </Link>
    ) : (
        <button
            {...quickAccessItem.buttonProps}
            id={id}
            className={cx(
                fr.cx("fr-btn", quickAccessItem.iconId),
                quickAccessItem.buttonProps.className,
                className
            )}
        >
            {quickAccessItem.text}
        </button>
    );
}
