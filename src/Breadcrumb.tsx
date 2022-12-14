import React, { memo, forwardRef, useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { RegisteredLinkProps, useLink } from "./lib/routing";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";

// We make users import dsfr.css, so we don't need to import the scoped CSS
// but in the future if we have a complete component coverage it
// we could stop requiring users to import the hole CSS and only import on a
// per component basis.
import "./dsfr/component/breadcrumb/breadcrumb.css";

export type BreadcrumbProps = {
    className?: string;
    links: BreadcrumbProps.Link[];
};

export namespace BreadcrumbProps {
    export type Link = {
        text: string;
        linkProps: RegisteredLinkProps;
        isActive?: boolean;
    };
}

//Longueur et lisibilité : Afin qu’il reste lisible, évitez que le fil d’Ariane soit trop long et passe sur plusieurs lignes.
// Si les titres de page de votre site sont longs, nous conseillons de n’afficher que les 4 premiers mots du nom de la page courante et d’indiquer que l’élément est tronqué par l’affichage de “…”
const trimLabel = (label: string) => {
    if (label && label.split(" ").length > 4) {
        return label.split(" ").slice(0, 4).join(" ") + "...";
    }
    return label;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-breadcrumb> */
export const Breadcrumb = memo(
    forwardRef<HTMLDivElement, BreadcrumbProps>((props, ref) => {
        const { links, className, ...rest } = props;

        const { Link } = useLink();
        const breadcrumbId = useId();
        return (
            <nav
                ref={ref}
                role="navigation"
                className={cx(fr.cx("fr-breadcrumb"), className)}
                aria-label="vous êtes ici :"
                {...rest}
            >
                <button
                    className="fr-breadcrumb__button"
                    aria-expanded="false"
                    aria-controls={breadcrumbId}
                >
                    Voir le fil d’Ariane
                </button>
                <div className="fr-collapse" id={breadcrumbId}>
                    <ol className="fr-breadcrumb__list">
                        <>
                            {links.map(link => (
                                <li key={link.linkProps.href}>
                                    <Link
                                        {...link.linkProps}
                                        className={cx(
                                            fr.cx("fr-breadcrumb__link"),
                                            link.linkProps.className
                                        )}
                                        aria-current={link.isActive ? "page" : undefined}
                                    >
                                        {trimLabel(link.text)}
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

export default Breadcrumb;
