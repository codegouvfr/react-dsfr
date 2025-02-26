import React from "react";
import { forwardRef, memo } from "react";
import { getLink } from "../link";
import { cx } from "../tools/cx";
import { fr, FrCxArg } from "../fr";

const TOP_ID = "#top";

export enum BTT_Placement {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}

const classByPlacement: Record<BTT_Placement, FrCxArg> = {
    [BTT_Placement.LEFT]: "fr-grid-row--left",
    [BTT_Placement.CENTER]: "fr-grid-row--center",
    [BTT_Placement.RIGHT]: "fr-grid-row--right"
};

export type BackToTopProps = {
    id?: string;
    className?: string;
    placement?: BTT_Placement;
    animated?: boolean;
    value?: string;
};

/**
 * Scroll to the top of the page with a smooth animation if user didn't enabled reduced motion for accessibility.
 **/
function scrollToTop() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = prefersReducedMotion ? "auto" : "smooth";
    const topElement = document.querySelector(TOP_ID) as HTMLElement | null;

    if (topElement) {
        history.pushState(null, "", TOP_ID);
        topElement.scrollIntoView({
            behavior: behavior,
            block: "start"
        });

        topElement.setAttribute("tabindex", "-1");
        topElement.focus();
    } else {
        window.scrollTo({ top: 0, behavior: behavior });
    }
}

/** @see <https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/retour-en-haut-de-page> */
export const BackToTop = memo(
    forwardRef<HTMLAnchorElement, BackToTopProps>(
        (
            {
                id: props_id,
                className: props_className,
                placement = BTT_Placement.LEFT,
                animated = true,
                value = "Haut de page",
                ...rest
            },
            ref
        ) => {
            const { Link } = getLink();

            const linkClassName = cx(
                fr.cx("fr-link", "fr-icon-arrow-up-fill", "fr-link--icon-left"),
                props_className
            );

            const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
                if (!animated) return;
                event.preventDefault();
                scrollToTop();
            };

            return (
                <div className={fr.cx("fr-grid-row", classByPlacement[placement])}>
                    <Link
                        id={props_id}
                        className={linkClassName}
                        href={TOP_ID}
                        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                        onClick={handleClick}
                        {...rest}
                    >
                        {value}
                    </Link>
                </div>
            );
        }
    )
);

export default BackToTop;
