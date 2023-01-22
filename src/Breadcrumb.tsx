import React, { memo, useId } from "react";
import type { ReactNode, ForwardedRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { getLink } from "./link";
import type { RegisteredLinkProps } from "./link";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { cx } from "./tools/cx";

export type BreadcrumbProps = {
    className?: string;
    links: BreadcrumbProps.Link[];
    ref?: ForwardedRef<HTMLElement>;
    classes?: Partial<Record<"root" | "button" | "collapse" | "list" | "link" | "text", string>>;
};

export namespace BreadcrumbProps {
    export type Link = {
        text: ReactNode;
        linkProps: RegisteredLinkProps;
        isActive?: boolean;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-breadcrumb> */
export const Breadcrumb = memo((props: BreadcrumbProps) => {
    const { links, className, classes = {}, ref, ...rest } = props;

    assert<Equals<keyof typeof rest, never>>();

    const { t } = useTranslation();

    const { Link } = getLink();
    const breadcrumbId = useId();

    return (
        <nav
            ref={ref}
            role="navigation"
            className={cx(fr.cx("fr-breadcrumb"), classes.root, className)}
            aria-label={`${t("navigation label")} :`}
        >
            <button
                className={cx(fr.cx("fr-breadcrumb__button"), classes.button)}
                aria-expanded="false"
                aria-controls={breadcrumbId}
            >
                {t("show breadcrumb")}
            </button>
            <div className={cx(fr.cx("fr-collapse"), classes.collapse)} id={breadcrumbId}>
                <ol className={cx(fr.cx("fr-breadcrumb__list"), classes.list)}>
                    <>
                        {links.map(link => (
                            <li key={link.linkProps.href}>
                                <Link
                                    {...link.linkProps}
                                    className={cx(
                                        fr.cx("fr-breadcrumb__link"),
                                        classes.link,
                                        link.linkProps.className
                                    )}
                                    aria-current={link.isActive ? "page" : undefined}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </>
                </ol>
            </div>
        </nav>
    );
});

Breadcrumb.displayName = symToStr({ Breadcrumb });

const { useTranslation, addBreadcrumbTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Breadcrumb }),
    "frMessages": {
        /* spell-checker: disable */
        "show breadcrumb": "Voir le fil d’Ariane",
        "navigation label": "vous êtes ici"
        /* spell-checker: enable */
    }
});

addBreadcrumbTranslations({
    "lang": "en",
    "messages": {
        "show breadcrumb": "Show navigation",
        "navigation label": "you are here"
    }
});

export { addBreadcrumbTranslations };

export default Breadcrumb;
