import React, { memo, forwardRef, useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

import { RegisteredLinkProps, useLink } from "./lib/routing";
import { createComponentI18nApi } from "./lib/i18n";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";

import "./dsfr/component/breadcrumb/breadcrumb.css";

export type BreadcrumbProps = {
    className?: string;
    links: BreadcrumbProps.Link[];
    classes?: Partial<Record<"root" | "button" | "collapse" | "list" | "link" | "text", string>>;
};

export namespace BreadcrumbProps {
    export type Link = {
        text: string;
        linkProps: RegisteredLinkProps;
        isActive?: boolean;
    };
}

// Note DSFR: Longueur et lisibilité : Afin qu’il reste lisible, évitez que le fil d’Ariane soit trop long et passe sur plusieurs lignes.
// Si les titres de page de votre site sont longs, nous conseillons de n’afficher que les 4 premiers mots du nom de la page courante et d’indiquer que l’élément est tronqué par l’affichage de “…”
const trimText = (label: string) => {
    if (label && label.split(" ").length > 4) {
        return label.split(" ").slice(0, 4).join(" ") + "...";
    }
    return label;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-breadcrumb> */
export const Breadcrumb = memo(
    forwardRef<HTMLDivElement, BreadcrumbProps>((props, ref) => {
        const { links, className, classes = {}, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const { Link } = useLink();
        const breadcrumbId = useId();
        return (
            <nav
                ref={ref}
                role="navigation"
                className={cx(fr.cx("fr-breadcrumb"), classes.root, className)}
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
                                        {trimText(link.text)}
                                    </Link>
                                </li>
                            ))}
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
        "show breadcrumb": "Voir le fil d’Ariane",
        "navigation label": "vous êtes ici"
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
