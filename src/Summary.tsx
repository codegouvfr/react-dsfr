import React, { memo, forwardRef, useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { createComponentI18nApi } from "./lib/i18n";

import { cx } from "./lib/tools/cx";
import { fr, RegisteredLinkProps } from "./lib";

import "./dsfr/component/summary/summary.css";

type SummaryLink = {
    text: string;
    linkProps: RegisteredLinkProps;
};

export type SummaryProps = {
    className?: string;
    links: SummaryLink[];
    title?: string;
    /** Default: "p" */
    as?: "p" | "h2" | "h3" | "h4" | "h5" | "h6";
    classes?: Partial<Record<"root" | "title" | "link", string>>;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-summary> */
export const Summary = memo(
    forwardRef<HTMLDivElement, SummaryProps>((props, ref) => {
        const { className, links, as = "p", title, classes = {}, ...rest } = props;

        const { t } = useTranslation();

        const titleId = useId();
        const summaryTitle = title ?? t("title");

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
                                <li key={link.linkProps.href + idx}>
                                    <a
                                        className={cx(fr.cx("fr-summary__link"), classes.link)}
                                        {...link.linkProps}
                                    >
                                        {link.text}
                                    </a>
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
