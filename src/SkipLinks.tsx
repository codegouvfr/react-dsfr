import React, { memo } from "react";
import type { ForwardedRef } from "react";
import { assert, Equals } from "tsafe";
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
    ref?: ForwardedRef<HTMLDivElement>;
    classes?: Partial<Record<"root" | "list" | "link", string>>;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-skiplinks> */
export const SkipLinks = memo((props: SkipLinksProps) => {
    const { className, classes = {}, links, ref, ...rest } = props;
    const { t } = useTranslation();
    assert<Equals<keyof typeof rest, never>>();

    return (
        <div className={cx(fr.cx("fr-skiplinks"), classes.root, className)} ref={ref}>
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
});

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
