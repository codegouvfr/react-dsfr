import React, { memo, forwardRef, useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { createComponentI18nApi } from "../i18n/createComponentI18nApi";
import { cx } from "../tools/cx";
import { fr } from "../fr";
import { getLink } from "../link";
import type { SummaryProps } from "./Summary";

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-summary> */
export const Summary = memo(
    forwardRef<HTMLDivElement, SummaryProps & { lang?: string }>((props, ref) => {
        const { className, links, as = "p", title, classes = {}, lang = "fr", ...rest } = props;

        const { t } = getTranslation(lang);

        const titleId = useId();
        const summaryTitle = title ?? t("title");

        const { Link } = getLink();

        assert<Equals<keyof typeof rest, never>>();

        return (
            <nav
                className={cx(fr.cx("fr-summary"), classes.root, className)}
                role="navigation"
                aria-labelledby={titleId}
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

const { getTranslation, addSummaryTranslations } = createComponentI18nApi({
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
