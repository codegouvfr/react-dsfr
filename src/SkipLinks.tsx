import React, { forwardRef, memo, type CSSProperties } from "react";
import type { Equals } from "tsafe";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";

export type SkipLinksProps = {
    className?: string;
    links: {
        label: string;
        anchor: string;
    }[];
    classes?: Partial<Record<"root" | "list" | "link", string>>;
    style?: CSSProperties;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-skiplinks> */
export const SkipLinks = memo(
    forwardRef<HTMLDivElement, SkipLinksProps>((props, ref) => {
        const { className, classes = {}, links, style, ...rest } = props;
        const { t } = useTranslation();
        assert<Equals<keyof typeof rest, never>>();

        return (
            <div
                className={cx(fr.cx("fr-skiplinks"), classes.root, className)}
                ref={ref}
                style={style}
                {...rest}
            >
                <nav className={fr.cx("fr-container")} role="navigation" aria-label={t("label")}>
                    <ul className={cx(fr.cx("fr-skiplinks__list"), classes.list)}>
                        {links &&
                            links.map(link => (
                                <li key={link.anchor}>
                                    <a
                                        className={cx(fr.cx("fr-link"), classes.link)}
                                        href={link.anchor}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </nav>
            </div>
        );
    })
);

SkipLinks.displayName = symToStr({ SkipLinks });

const { useTranslation, addSkipLinksTranslations } = createComponentI18nApi({
    "componentName": symToStr({ SkipLinks }),
    "frMessages": {
        /* spell-checker: disable */
        "label": "Accès rapide"
        /* spell-checker: enable */
    }
});

addSkipLinksTranslations({
    "lang": "en",
    "messages": {
        "label": "Quick access"
    }
});
addSkipLinksTranslations({
    "lang": "es",
    "messages": {
        "label": "Acceso rapido"
    }
});
addSkipLinksTranslations({
    "lang": "de",
    "messages": {
        "label": "Schneller Zugang"
    }
});

export default SkipLinks;
