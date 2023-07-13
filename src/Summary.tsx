import React, { memo, forwardRef, useId, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { getLink } from "./link";
import type { RegisteredLinkProps } from "./link";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type SummaryProps = {
    id?: string;
    className?: string;
    links: {
        text: string;
        linkProps: RegisteredLinkProps;
    }[];
    title?: string;
    /** Default: "p" */
    as?: "p" | "h2" | "h3" | "h4" | "h5" | "h6";
    classes?: Partial<Record<"root" | "title" | "link", string>>;
    style?: CSSProperties;
};

/** @see <https://components.react-dsfr.fr/?path=/docs/components-summary> */
export const Summary = memo(
    forwardRef<HTMLDivElement, SummaryProps>((props, ref) => {
        const { className, links, as = "p", title, classes = {}, style, 
        id: id_props
        ,...rest } = props;

        const { t } = useTranslation();

        const titleId = useId();
        const summaryTitle = title ?? t("title");

        const { Link } = getLink();

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-summary",
            "explicitlyProvidedId": id_props
        });

        return (
            <nav
                id={id}
                className={cx(fr.cx("fr-summary"), classes.root, className)}
                role="navigation"
                aria-labelledby={titleId}
                style={style}
                ref={ref}
            >
                {React.createElement(
                    as,
                    {
                        className: cx(fr.cx("fr-summary__title"), classes.title),
                        id: titleId
                    },
                    <>{summaryTitle}</>
                )}
                <ol>
                    {links.map(
                        (link, idx) =>
                            link.linkProps.href !== undefined && (
                                <li key={idx}>
                                    <Link
                                        {...link.linkProps}
                                        className={cx(
                                            fr.cx("fr-summary__link"),
                                            classes.link,
                                            link.linkProps.className
                                        )}
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            )
                    )}
                </ol>
            </nav>
        );
    })
);

Summary.displayName = symToStr({ Summary });

const { useTranslation, addSummaryTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Summary }),
    "frMessages": {
        /* spell-checker: disable */
        "title": "Sommaire"
        /* spell-checker: enable */
    }
});

addSummaryTranslations({
    "lang": "en",
    "messages": {
        "title": "Summary"
    }
});

export { addSummaryTranslations };

export default Summary;
