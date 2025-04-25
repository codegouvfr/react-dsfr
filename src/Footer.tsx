import type { JSX } from "./tools/JSX";
import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
import { getLink } from "./link";
import type { RegisteredLinkProps } from "./link";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { createComponentI18nApi } from "./i18n";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import { getBrandTopAndHomeLinkProps } from "./zz_internal/brandTopAndHomeLinkProps";
import { typeGuard } from "tsafe/typeGuard";
import { id } from "tsafe/id";

export type FooterProps = {
    id?: string;
    className?: string;
    accessibility: "non compliant" | "partially compliant" | "fully compliant";
    contentDescription?: ReactNode;
    websiteMapLinkProps?: RegisteredLinkProps;
    accessibilityLinkProps?: RegisteredLinkProps;
    termsLinkProps?: RegisteredLinkProps;
    bottomItems?: (FooterProps.BottomItem | ReactNode)[];
    partnersLogos?: FooterProps.PartnersLogos;
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
    license?: ReactNode;
    /** If not provided the brandTop from the Header will be used,
     *  Be aware that if your Header is not used as a server component while the Footer is
     *  you need to provide the brandTop to the Footer.
     */
    brandTop?: ReactNode;
    /** If not provided the homeLinkProps from the Header will be used,
     *  Be aware that if your Header is not used as a server component while the Footer is
     *  you need to provide the homeLinkProps to the Footer.
     */
    homeLinkProps?: RegisteredLinkProps & { title: string };
    classes?: Partial<
        Record<
            | "root"
            | "body"
            | "brand"
            | "content"
            | "contentDesc"
            | "contentList"
            | "contentItem"
            | "contentLink"
            | "bottom"
            | "bottomList"
            | "bottomItem"
            | "bottomLink"
            | "bottomCopy"
            | "brandLink"
            | "logo"
            | "operatorLogo"
            | "partners"
            | "partnersTitle"
            | "partnersLogos"
            | "partnersMain"
            | "partnersLink"
            | "partnersSub",
            string
        >
    >;
    style?: CSSProperties;
    linkList?: FooterProps.LinkList.List;
    linkHeadingWrapper?: {
        level: 2 | 3 | 4 | 5 | 6;
        useAriaLevel?: boolean;
    };
    domains?: string[];
};

export namespace FooterProps {
    export type BottomItem = BottomItem.Link | BottomItem.Button;

    export namespace BottomItem {
        export type Common = {
            iconId?: FrIconClassName | RiIconClassName;
            text: ReactNode;
        };

        export type Link = Common & {
            linkProps: RegisteredLinkProps;
            buttonProps?: never;
        };

        export type Button = Common & {
            linkProps?: undefined;
            buttonProps: React.DetailedHTMLProps<
                React.ButtonHTMLAttributes<HTMLButtonElement>,
                HTMLButtonElement
            >;
        };
    }

    export namespace LinkList {
        export type List = [Column, Column?, Column?, Column?, Column?, Column?];
        export type Links = [
            LinkList.Link,
            LinkList.Link?,
            LinkList.Link?,
            LinkList.Link?,
            LinkList.Link?,
            LinkList.Link?,
            LinkList.Link?,
            LinkList.Link?
        ];
        export interface Column {
            categoryName?: string;
            links: Links;
        }
        export interface Link {
            text: string;
            linkProps: RegisteredLinkProps;
        }
    }

    export type PartnersLogos = PartnersLogos.MainOnly | PartnersLogos.SubOnly;

    export namespace PartnersLogos {
        export type MainOnly = {
            main: Logo;
            sub?: Logo[];
        };

        export type SubOnly = {
            main?: Logo;
            sub: [Logo, ...Logo[]];
        };

        export type Logo = {
            alt: string;
            /**
             * @deprecated use linkProps instead
             */
            href?: string;
            imgUrl: string;
            linkProps?: RegisteredLinkProps & { title: string };
        };
    }
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-footer> */
export const Footer = memo(
    forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
        const {
            id: id_props,
            className,
            classes = {},
            contentDescription,
            websiteMapLinkProps,
            accessibilityLinkProps,
            accessibility,
            termsLinkProps,
            bottomItems = [],
            partnersLogos,
            operatorLogo,
            license,
            brandTop: brandTop_prop,
            homeLinkProps: homeLinkProps_prop,
            style,
            linkList,
            linkHeadingWrapper = {
                level: 3
            },
            domains = ["info.gouv.fr", "service-public.fr", "legifrance.gouv.fr", "data.gouv.fr"],
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const rootId = id_props ?? "fr-footer";

        const { brandTop, homeLinkProps } = (() => {
            const wrap = getBrandTopAndHomeLinkProps();

            const brandTop = brandTop_prop ?? wrap?.brandTop;
            const homeLinkProps = homeLinkProps_prop ?? wrap?.homeLinkProps;

            const exceptionMessage =
                " hasn't been provided to the Footer and we cannot retrieve it from the Header (it's probably client side)";

            if (brandTop === undefined) {
                throw new Error(symToStr({ brandTop }) + exceptionMessage);
            }

            if (homeLinkProps === undefined) {
                throw new Error(symToStr({ homeLinkProps }) + exceptionMessage);
            }

            return { brandTop, homeLinkProps };
        })();

        const { Link } = getLink();

        const { t } = useTranslation();

        const { main: mainPartnersLogo, sub: subPartnersLogos = [] } = partnersLogos ?? {};

        const LinkHeadingLevel: "h2" | "h3" | "h4" | "h5" | "h6" = `h${linkHeadingWrapper.level}`;

        return (
            <footer
                id={rootId}
                className={cx(fr.cx("fr-footer"), classes.root, className)}
                role="contentinfo"
                ref={ref}
                style={style}
                {...rest}
            >
                {linkList !== undefined && (
                    <div className={fr.cx("fr-footer__top")}>
                        <div className={fr.cx("fr-container")}>
                            <div
                                className={fr.cx(
                                    "fr-grid-row",
                                    // "fr-grid-row--start", // why is this class used in dsfr doc?
                                    "fr-grid-row--gutters"
                                )}
                            >
                                {linkList.map(
                                    (column, columnIndex) =>
                                        column !== undefined && (
                                            <div
                                                key={`fr-footer__top-cat-${columnIndex}`}
                                                className={fr.cx(
                                                    "fr-col-12",
                                                    "fr-col-sm-3",
                                                    "fr-col-md-2"
                                                )}
                                            >
                                                {column?.categoryName &&
                                                    (linkHeadingWrapper.useAriaLevel ? (
                                                        <div
                                                            role="heading"
                                                            aria-level={linkHeadingWrapper.level}
                                                            className={fr.cx("fr-footer__top-cat")}
                                                        >
                                                            {column.categoryName}
                                                        </div>
                                                    ) : (
                                                        <LinkHeadingLevel
                                                            className={fr.cx("fr-footer__top-cat")}
                                                        >
                                                            {column.categoryName}
                                                        </LinkHeadingLevel>
                                                    ))}
                                                <ul className={fr.cx("fr-footer__top-list")}>
                                                    {column?.links.map(
                                                        (linkItem, linkItemIndex) => (
                                                            <li
                                                                key={`fr-footer__top-link-${linkItemIndex}`}
                                                            >
                                                                <Link
                                                                    {...(linkItem?.linkProps as any)}
                                                                    className={fr.cx(
                                                                        "fr-footer__top-link"
                                                                    )}
                                                                >
                                                                    {linkItem?.text}
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className={fr.cx("fr-container")}>
                    <div className={cx(fr.cx("fr-footer__body"), classes.body)}>
                        <div
                            className={cx(
                                fr.cx("fr-footer__brand", "fr-enlarge-link"),
                                classes.brand
                            )}
                        >
                            {(() => {
                                const children = (
                                    <p className={cx(fr.cx("fr-logo"), classes.logo)}>{brandTop}</p>
                                );

                                return operatorLogo !== undefined ? (
                                    children
                                ) : (
                                    <Link {...homeLinkProps}>{children}</Link>
                                );
                            })()}
                            {operatorLogo !== undefined && (
                                <Link
                                    {...homeLinkProps}
                                    className={cx(
                                        fr.cx("fr-footer__brand-link"),
                                        classes.brandLink,
                                        homeLinkProps.className
                                    )}
                                >
                                    <img
                                        className={cx(
                                            fr.cx("fr-footer__logo"),
                                            classes.operatorLogo
                                        )}
                                        style={(() => {
                                            switch (operatorLogo.orientation) {
                                                case "vertical":
                                                    return { "width": "3.5rem" };
                                                case "horizontal":
                                                    return { "maxWidth": "9.0625rem" };
                                            }
                                        })()}
                                        src={operatorLogo.imgUrl}
                                        alt={operatorLogo.alt}
                                    />
                                </Link>
                            )}
                        </div>
                        <div className={cx(fr.cx("fr-footer__content"), classes.content)}>
                            {contentDescription !== undefined && (
                                <p
                                    className={cx(
                                        fr.cx("fr-footer__content-desc"),
                                        classes.contentDesc
                                    )}
                                >
                                    {contentDescription}
                                </p>
                            )}
                            <ul
                                className={cx(
                                    fr.cx("fr-footer__content-list"),
                                    classes.contentList
                                )}
                            >
                                {domains.map((domain, i) => (
                                    <li
                                        className={cx(
                                            fr.cx("fr-footer__content-item" as any),
                                            classes.contentItem
                                        )}
                                        key={i}
                                    >
                                        <a
                                            className={cx(
                                                fr.cx("fr-footer__content-link"),
                                                classes.contentLink
                                            )}
                                            target="_blank"
                                            href={`https://${domain}`}
                                            title={`${domain} - ${t("open new window")}`}
                                            id={`footer-${domain.replace(/\./g, "-")}-link`}
                                        >
                                            {domain}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {partnersLogos !== undefined && (
                        <div className={cx(fr.cx("fr-footer__partners"), classes.partners)}>
                            <h2
                                className={cx(
                                    fr.cx("fr-footer__partners-title"),
                                    classes.partnersTitle
                                )}
                            >
                                {t("our partners")}
                            </h2>
                            <div
                                className={cx(
                                    fr.cx("fr-footer__partners-logos"),
                                    classes.partnersLogos
                                )}
                            >
                                {mainPartnersLogo !== undefined && (
                                    <div
                                        className={cx(
                                            fr.cx("fr-footer__partners-main"),
                                            classes.partnersMain
                                        )}
                                    >
                                        {(() => {
                                            const children = (
                                                <img
                                                    alt={mainPartnersLogo.alt}
                                                    style={{ height: "5.625rem" }} // should not be hardcoded. Can conflict with ContentSecurityPolicy when "unsafe-inline" is not allowed
                                                    src={mainPartnersLogo.imgUrl}
                                                    className={cx(
                                                        fr.cx("fr-footer__logo"),
                                                        classes.logo
                                                    )}
                                                />
                                            );

                                            const hasLinkProps =
                                                mainPartnersLogo.linkProps !== undefined ||
                                                mainPartnersLogo.href !== undefined;

                                            return hasLinkProps ? (
                                                <Link
                                                    {...mainPartnersLogo.linkProps}
                                                    href={
                                                        mainPartnersLogo.href ??
                                                        mainPartnersLogo.linkProps?.href
                                                    }
                                                    className={cx(
                                                        fr.cx(
                                                            "fr-footer__partners-link",
                                                            "fr-raw-link"
                                                        ),
                                                        classes.partnersLink
                                                    )}
                                                >
                                                    {children}
                                                </Link>
                                            ) : (
                                                children
                                            );
                                        })()}
                                    </div>
                                )}
                                {subPartnersLogos.length !== 0 && (
                                    <div
                                        className={cx(
                                            fr.cx("fr-footer__partners-sub"),
                                            classes.partnersSub
                                        )}
                                    >
                                        <ul>
                                            {subPartnersLogos.map((logo, i) => {
                                                const children = (
                                                    <img
                                                        alt={logo.alt}
                                                        src={logo.imgUrl}
                                                        style={{ "height": "5.625rem" }} // should not be hardcoded. Can conflict with ContentSecurityPolicy when "unsafe-inline" is not allowed
                                                        className={cx(
                                                            fr.cx("fr-footer__logo"),
                                                            classes.logo
                                                        )}
                                                    />
                                                );

                                                const hasLinkProps =
                                                    logo.linkProps !== undefined ||
                                                    logo.href !== undefined;

                                                return (
                                                    <li key={i}>
                                                        {hasLinkProps ? (
                                                            <Link
                                                                {...logo.linkProps}
                                                                href={
                                                                    logo.href ??
                                                                    logo.linkProps?.href
                                                                }
                                                                className={cx(
                                                                    fr.cx(
                                                                        "fr-footer__partners-link",
                                                                        "fr-raw-link"
                                                                    ),
                                                                    classes.partnersLink
                                                                )}
                                                            >
                                                                {children}
                                                            </Link>
                                                        ) : (
                                                            children
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className={cx(fr.cx("fr-footer__bottom"), classes.bottom)}>
                        <ul className={cx(fr.cx("fr-footer__bottom-list"), classes.bottomList)}>
                            {[
                                ...(websiteMapLinkProps === undefined
                                    ? []
                                    : [
                                          id<FooterProps.BottomItem>({
                                              "text": t("website map"),
                                              "linkProps": websiteMapLinkProps
                                          })
                                      ]),
                                id<FooterProps.BottomItem>({
                                    "text": `${t("accessibility")} : ${t(accessibility)}`,
                                    "linkProps": accessibilityLinkProps ?? ({} as any)
                                }),
                                ...(termsLinkProps === undefined
                                    ? []
                                    : [
                                          id<FooterProps.BottomItem>({
                                              "text": t("terms"),
                                              "linkProps": termsLinkProps
                                          })
                                      ]),
                                ...bottomItems
                            ].map((bottomItem, i) => (
                                <li
                                    className={cx(
                                        fr.cx("fr-footer__bottom-item"),
                                        classes.bottomItem,
                                        className
                                    )}
                                    key={i}
                                >
                                    {!typeGuard<FooterProps.BottomItem>(
                                        bottomItem,
                                        bottomItem instanceof Object && "text" in bottomItem
                                    ) ? (
                                        bottomItem
                                    ) : (
                                        <FooterBottomItem
                                            classes={{
                                                "bottomLink": classes.bottomLink
                                            }}
                                            bottomItem={bottomItem}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className={cx(fr.cx("fr-footer__bottom-copy"), classes.bottomCopy)}>
                            <p>
                                {license === undefined
                                    ? t("license mention", {
                                          "licenseUrl":
                                              "https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                                      })
                                    : license}
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    })
);

Footer.displayName = symToStr({ Footer });

export default Footer;

const { useTranslation, addFooterTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Footer }),
    "frMessages": {
        /* spell-checker: disable */
        "hide message": "Masquer le message",
        "website map": "Plan du site",
        "accessibility": "Accessibilité",
        "non compliant": "non conforme",
        "partially compliant": "partiellement conforme",
        "fully compliant": "totalement conforme",
        "terms": "Mentions légales",
        "cookies management": "Gestion des cookies",
        "license mention": (p: { licenseUrl: string }) => (
            <>
                Sauf mention explicite de propriété intellectuelle détenue par des tiers, les
                contenus de ce site sont proposés sous{" "}
                <a
                    href={p.licenseUrl}
                    target="_blank"
                    title="licence etalab-2.0 - ouvre une nouvelle fenêtre"
                    id="footer-etalab-licence-link"
                >
                    licence etalab-2.0
                </a>
            </>
        ),
        "our partners": "Nos partenaires",
        "open new window": "ouvre une nouvelle fenêtre"
        /* spell-checker: enable */
    }
});

addFooterTranslations({
    "lang": "en",
    "messages": {
        "hide message": "Hide the message",
        "website map": "Website map",
        "accessibility": "Accessibility",
        "non compliant": "non compliant",
        "partially compliant": "partially compliant",
        "fully compliant": "fully compliant",
        "license mention": p => (
            <>
                Unless stated otherwise, all content of this website is under the{" "}
                <a
                    href={p.licenseUrl}
                    target="_blank"
                    title="etalab-2.0 license - open a new window"
                >
                    etalab-2.0 license
                </a>
            </>
        ),
        "open new window": "open new window"
    }
});

addFooterTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "hide message": "Occultar el mesage"
        /* spell-checker: enable */
    }
});

export { addFooterTranslations };

export type FooterBottomItemProps = {
    className?: string;
    bottomItem: FooterProps.BottomItem;
    classes?: Partial<Record<"root" | "bottomLink", string>>;
};

export function FooterBottomItem(props: FooterBottomItemProps): JSX.Element {
    const { className: className_props, bottomItem, classes = {} } = props;

    const { Link } = getLink();

    const className = cx(
        fr.cx(
            "fr-footer__bottom-link",
            ...(bottomItem.iconId !== undefined
                ? ([bottomItem.iconId, "fr-link--icon-left"] as const)
                : [])
        ),
        classes.bottomLink,
        classes.root,
        className_props
    );

    return bottomItem.linkProps !== undefined ? (
        Object.keys(bottomItem.linkProps).length === 0 ? (
            <span className={className}>{bottomItem.text}</span>
        ) : (
            <Link
                {...bottomItem.linkProps}
                className={cx(className, bottomItem.linkProps.className)}
            >
                {bottomItem.text}
            </Link>
        )
    ) : (
        <button
            {...bottomItem.buttonProps}
            className={cx(className, bottomItem.buttonProps.className)}
        >
            {bottomItem.text}
        </button>
    );
}
