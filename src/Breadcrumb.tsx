import React, { memo, forwardRef, useId, type ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { getLink } from "./link";
import type { RegisteredLinkProps } from "./link";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type BreadcrumbProps = {
    id?: string;
    className?: string;
    homeLinkProps?: RegisteredLinkProps;
    segments: {
        label: ReactNode;
        linkProps: RegisteredLinkProps;
    }[];
    currentPageLabel: ReactNode;
    classes?: Partial<Record<"root" | "button" | "collapse" | "list" | "link" | "text", string>>;
    style?: CSSProperties;
};

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-breadcrumb> */
export const Breadcrumb = memo(
    forwardRef<HTMLDivElement, BreadcrumbProps>((props, ref) => {
        const {
            id: props_id,
            className,
            homeLinkProps,
            segments,
            currentPageLabel,
            classes = {},
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-breadcrumb",
            "explicitlyProvidedId": props_id
        });

        const { t } = useTranslation();

        const { Link } = getLink();
        const breadcrumbId = `breadcrumb-${useId()}`;

        return (
            <nav
                id={id}
                ref={ref}
                role="navigation"
                className={cx(fr.cx("fr-breadcrumb"), classes.root, className)}
                style={style}
                aria-label={`${t("navigation label")} :`}
                {...rest}
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
                            {[
                                ...(homeLinkProps === undefined
                                    ? []
                                    : [{ "linkProps": homeLinkProps, "label": t("home") }]),
                                ...segments
                            ].map(({ linkProps, label }, i) => (
                                <li key={i}>
                                    <Link
                                        {...linkProps}
                                        className={cx(
                                            fr.cx("fr-breadcrumb__link"),
                                            classes.link,
                                            linkProps.className
                                        )}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a className={fr.cx("fr-breadcrumb__link")} aria-current="page">
                                    {currentPageLabel}
                                </a>
                            </li>
                        </>
                    </ol>
                </div>
            </nav>
        );
    })
);

Breadcrumb.displayName = symToStr({ Breadcrumb });

const { useTranslation, addBreadcrumbTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Breadcrumb }),
    "frMessages": {
        /* spell-checker: disable */
        "show breadcrumb": "Voir le fil d’Ariane",
        "navigation label": "vous êtes ici",
        "home": "Accueil"
        /* spell-checker: enable */
    }
});

addBreadcrumbTranslations({
    "lang": "en",
    "messages": {
        "show breadcrumb": "Show navigation",
        "navigation label": "you are here",
        "home": "Home"
    }
});

export { addBreadcrumbTranslations };

export default Breadcrumb;
