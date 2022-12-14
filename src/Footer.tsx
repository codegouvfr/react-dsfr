import React, { memo, forwardRef } from "react";
import type { ReactNode } from "react";
import { useLink } from "./lib/routing";
import type { RegisteredLinkProps } from "./lib/routing";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { createComponentI18nApi } from "./lib/i18n";

export type FooterProps = {
    className?: string;
    brandTop: ReactNode;
    accessibility: "non compliant" | "partially compliant" | "fully compliant";
    contentDescription?: ReactNode;
    websiteMapLinkProps?: RegisteredLinkProps;
    accessibilityLinkProps?: RegisteredLinkProps;
    termsLinkProps?: RegisteredLinkProps;
    personalDataLinkProps?: RegisteredLinkProps;
    cookiesManagementLinkProps?: RegisteredLinkProps;
    homeLinkProps: RegisteredLinkProps & { title: string };
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
            | "bottomCopy",
            string
        >
    >;
};

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
            cookiesManagementLinkProps,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = useLink();

        const { t } = useTranslation();

        return (
            <footer
                className={cx(fr.cx("fr-footer"), classes.root, className)}
                role="contentinfo"
                id="footer"
                ref={ref}
                {...rest}
            >
                <div className={fr.cx("fr-container")}>
                    <div className={cx(fr.cx("fr-footer__body"), classes.body)}>
                        <div
                            className={cx(
                                fr.cx("fr-footer__brand", "fr-enlarge-link"),
                                classes.brand
                            )}
                        >
                            <Link {...homeLinkProps}>
                                <p className={fr.cx("fr-logo")}>{brandTop}</p>
                            </Link>
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
                    <div className={cx(fr.cx("fr-footer__bottom"), classes.bottom)}>
                        <ul className={cx(fr.cx("fr-footer__bottom-list"), classes.bottomList)}>
                            {(
                                [
                                    ["website map", websiteMapLinkProps],
                                    ["accessibility", accessibilityLinkProps],
                                    ["terms", termsLinkProps],
                                    ["personal data", personalDataLinkProps],
                                    ["cookies managment", cookiesManagementLinkProps]
                                ] as const
                            )
                                .filter(
                                    ([section, linkProps]) =>
                                        section === "accessibility" || linkProps !== undefined
                                )
                                .map(([section, linkProps], i) => (
                                    <li
                                        key={i}
                                        className={cx(
                                            fr.cx("fr-footer__bottom-item"),
                                            classes.bottomItem
                                        )}
                                    >
                                        {section === "accessibility"
                                            ? (() => {
                                                  const text = `${t("accessibility")}: ${t(
                                                      accessibility
                                                  )}`;

                                                  return linkProps === undefined ? (
                                                      <a
                                                          className={cx(
                                                              fr.cx("fr-footer__bottom-link"),
                                                              classes.bottomLink
                                                          )}
                                                          href="#"
                                                      >
                                                          {text}
                                                      </a>
                                                  ) : (
                                                      <Link
                                                          {...linkProps}
                                                          className={cx(
                                                              fr.cx("fr-footer__bottom-link"),
                                                              classes.bottomLink,
                                                              linkProps.className
                                                          )}
                                                      >
                                                          {text}
                                                      </Link>
                                                  );
                                              })()
                                            : (assert(linkProps !== undefined),
                                              (
                                                  <Link
                                                      {...linkProps}
                                                      className={cx(
                                                          fr.cx("fr-footer__bottom-link"),
                                                          classes.bottomLink,
                                                          linkProps.className
                                                      )}
                                                  >
                                                      {t(section)}
                                                  </Link>
                                              ))}
                                    </li>
                                ))}
                        </ul>
                        <div className={cx(fr.cx("fr-footer__bottom-copy"), classes.bottomCopy)}>
                            <p>
                                {t("license mention")}{" "}
                                <a
                                    href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                                    target="_blank"
                                >
                                    {t("etalab license")}{" "}
                                </a>{" "}
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
        "cookies managment": "Gestion des cookies",
        "license mention": "Sauf mention contraire, tous les contenus de ce site sont sous",
        "etalab license": "licence etalab-2.0"
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
        "license mention": "Unless stated otherwise all content of this website are under",
        "etalab license": "etalab-2.0 license"
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
