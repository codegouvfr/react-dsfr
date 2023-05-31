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
import { id } from "tsafe/id";
import { getOpenConsentModal } from "./GdprCookieManagment/openConsentModal";

export type FooterProps = {
    className?: string;
    brandTop: ReactNode;
    accessibility: "non compliant" | "partially compliant" | "fully compliant";
    contentDescription?: ReactNode;
    websiteMapLinkProps?: RegisteredLinkProps;
    accessibilityLinkProps?: RegisteredLinkProps;
    termsLinkProps?: RegisteredLinkProps;
    personalDataLinkProps?: RegisteredLinkProps;
    /** This is only to use if you're not using the ConsentBanner component */
    consentManagementLinkProps?: RegisteredLinkProps;
    homeLinkProps: RegisteredLinkProps & { title: string };
    bottomItems?: FooterProps.BottomItem[];
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
            href: string;
            imgUrl: string;
        };
    }
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-footer> */
export const Footer = memo(
    forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
        const {
            className,
            classes = {},
            brandTop,
            contentDescription,
            homeLinkProps,
            websiteMapLinkProps,
            accessibilityLinkProps,
            accessibility,
            termsLinkProps,
            personalDataLinkProps,
            consentManagementLinkProps,
            bottomItems = [],
            partnersLogos,
            operatorLogo,
            license,
            style,
            linkList,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = getLink();

        const { t } = useTranslation();

        const { main: mainPartnersLogo, sub: subPartnersLogos = [] } = partnersLogos ?? {};

        return (
            <footer
                className={cx(fr.cx("fr-footer"), classes.root, className)}
                role="contentinfo"
                id="footer"
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
                                                {column?.categoryName && (
                                                    <h3 className={fr.cx("fr-footer__top-cat")}>
                                                        {column?.categoryName}
                                                    </h3>
                                                )}
                                                <ul className={fr.cx("fr-footer__top-list")}>
                                                    {column?.links.map(
                                                        (linkItem, linkItemIndex) => (
                                                            <li
                                                                key={`fr-footer__top-link-${linkItemIndex}`}
                                                            >
                                                                <Link
                                                                    {...linkItem?.linkProps}
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
                                const children = <p className={fr.cx("fr-logo")}>{brandTop}</p>;

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
                                        className={cx(fr.cx("fr-footer__logo"), classes.logo)}
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
                                {[
                                    "legifrance.gouv.fr",
                                    "gouvernement.fr",
                                    "service-public.fr",
                                    "data.gouv.fr"
                                ].map((domain, i) => (
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
                            <h4
                                className={cx(
                                    fr.cx("fr-footer__partners-title"),
                                    classes.partnersTitle
                                )}
                            >
                                {t("our partners")}
                            </h4>
                            <div
                                className={cx(
                                    fr.cx("fr-footer__partners-logos"),
                                    classes.partnersLogos
                                )}
                            >
                                <div
                                    className={cx(
                                        fr.cx("fr-footer__partners-main"),
                                        classes.partnersMain
                                    )}
                                >
                                    {mainPartnersLogo !== undefined && (
                                        <a
                                            href={mainPartnersLogo.href}
                                            className={cx(
                                                fr.cx("fr-footer__partners-link"),
                                                classes.partnersLink
                                            )}
                                        >
                                            <img
                                                alt={mainPartnersLogo.alt}
                                                style={{ height: "5.625rem" }}
                                                src={mainPartnersLogo.imgUrl}
                                                className={cx(
                                                    fr.cx("fr-footer__logo"),
                                                    classes.logo
                                                )}
                                            />
                                        </a>
                                    )}
                                </div>
                                {subPartnersLogos.length !== 0 && (
                                    <div
                                        className={cx(
                                            fr.cx("fr-footer__partners-sub"),
                                            classes.partnersSub
                                        )}
                                    >
                                        <ul>
                                            {subPartnersLogos.map((logo, i) => (
                                                <li key={i}>
                                                    <a
                                                        href={logo.href}
                                                        className={cx(
                                                            fr.cx("fr-footer__partners-link"),
                                                            classes.partnersLink
                                                        )}
                                                    >
                                                        <img
                                                            alt={logo.alt}
                                                            src={logo.imgUrl}
                                                            style={{ "height": "5.625rem" }}
                                                            className={cx(
                                                                fr.cx("fr-footer__logo"),
                                                                classes.logo
                                                            )}
                                                        />
                                                    </a>
                                                </li>
                                            ))}
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
                                    "text": `${t("accessibility")}: ${t(accessibility)}`,
                                    "linkProps": accessibilityLinkProps ?? {}
                                }),
                                ...(termsLinkProps === undefined
                                    ? []
                                    : [
                                          id<FooterProps.BottomItem>({
                                              "text": t("terms"),
                                              "linkProps": termsLinkProps
                                          })
                                      ]),
                                ...(personalDataLinkProps === undefined
                                    ? []
                                    : [
                                          id<FooterProps.BottomItem>({
                                              "text": t("personal data"),
                                              "linkProps": personalDataLinkProps
                                          })
                                      ]),
                                ...(() => {
                                    const openConsentModal = getOpenConsentModal();

                                    if (consentManagementLinkProps !== undefined) {
                                        if (openConsentModal !== undefined) {
                                            console.warn(
                                                [
                                                    "You are using ConsentBanner, consentManagementLinkProps provided",
                                                    "to the Footer will be ignored. Please remove this prop from the Footer"
                                                ].join(" ")
                                            );
                                        }

                                        return [
                                            id<FooterProps.BottomItem>({
                                                "text": t("cookies management"),
                                                "linkProps": consentManagementLinkProps
                                            })
                                        ];
                                    }

                                    if (openConsentModal !== undefined) {
                                        return [
                                            id<FooterProps.BottomItem>({
                                                "text": t("cookies management"),
                                                "buttonProps": {
                                                    "onClick": openConsentModal
                                                }
                                            })
                                        ];
                                    }

                                    return [];
                                })(),
                                ...bottomItems
                            ].map(({ iconId, text, buttonProps, linkProps }, i) => (
                                <li
                                    key={i}
                                    className={cx(
                                        fr.cx("fr-footer__bottom-item"),
                                        classes.bottomItem
                                    )}
                                >
                                    {(() => {
                                        const className = cx(
                                            fr.cx(
                                                "fr-footer__bottom-link",
                                                ...(iconId !== undefined
                                                    ? ([iconId, "fr-link--icon-left"] as const)
                                                    : [])
                                            ),
                                            classes.bottomLink
                                        );

                                        return linkProps !== undefined ? (
                                            Object.keys(linkProps).length === 0 ? (
                                                <span className={className}>{text}</span>
                                            ) : (
                                                <Link
                                                    {...linkProps}
                                                    className={cx(className, linkProps.className)}
                                                >
                                                    {text}
                                                </Link>
                                            )
                                        ) : (
                                            <button
                                                {...buttonProps}
                                                className={cx(className, buttonProps.className)}
                                            >
                                                {text}
                                            </button>
                                        );
                                    })()}
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
        "personal data": "Données personnelles",
        "cookies management": "Gestion des cookies",
        "license mention": (p: { licenseUrl: string }) => (
            <>
                Sauf mention contraire, tous les contenus de ce site sont sous{" "}
                <a href={p.licenseUrl} target="_blank">
                    licence etalab-2.0
                </a>
            </>
        ),
        "our partners": "Nos partenaires"
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
                <a href={p.licenseUrl} target="_blank">
                    etalab-2.0 license
                </a>
            </>
        )
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
