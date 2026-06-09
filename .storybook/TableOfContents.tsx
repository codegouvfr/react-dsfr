import { styled } from "storybook/theming";
import SideMenu, { SideMenuProps } from "../dist/SideMenu";
import Channel from "storybook/internal/channels";
import { NAVIGATE_URL } from "storybook/internal/core-events";
import React, { useEffect, useState } from "react";
import { DocsTypes } from "@storybook/addon-docs";

export type TocType = Exclude<Required<DocsTypes["parameters"]>["docs"]["toc"], undefined>;

const Aside = styled.div({
    width: "10rem",

    "@media (max-width: 768px)": {
        display: "none"
    }
});

const SideMenuStyled = styled(SideMenu)({
    position: "fixed",
    bottom: 0,
    top: 0,
    width: "16rem",
    paddingTop: "4rem",
    paddingBottom: "2rem",
    overflowY: "auto",

    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
    "-webkit-overflow-scrolling": "touch",

    "& .fr-sidemenu__inner": {
        padding: 0
    },

    "& .fr-sidemenu__link": {
        padding: "0.5rem 0.75rem"
    }
});

/**
 * Hook pour détecter le heading actuellement visible avec IntersectionObserver
 */
function useActiveHeading(headings: HTMLHeadingElement[]) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        if (headings.length === 0) return;

        // Map pour stocker les ratios d'intersection de chaque heading
        const headingObservers = new Map<string, number>();

        const observer = new IntersectionObserver(
            entries => {
                // Mettre à jour le ratio d'intersection pour chaque heading observé
                entries.forEach(entry => {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        headingObservers.set(id, entry.intersectionRatio);
                    } else {
                        headingObservers.set(id, 0);
                    }
                });

                // Trouver le heading avec le plus grand ratio d'intersection
                let maxRatio = 0;
                let activeHeadingId = "";

                headingObservers.forEach((ratio, id) => {
                    if (ratio > maxRatio) {
                        maxRatio = ratio;
                        activeHeadingId = id;
                    }
                });

                // Ne mettre à jour que si on a trouvé un heading visible
                // Sinon on garde l'état précédent
                if (activeHeadingId && activeHeadingId !== activeId) {
                    setActiveId(activeHeadingId);
                } else if (!activeId && headings.length > 0) {
                    // Cas initial : si aucun heading n'est actif encore, prendre le premier
                    setActiveId(headings[0].id);
                }
            },
            {
                // rootMargin négatif = créer une zone "active" au centre du viewport
                // "-20% 0px -35% 0px" = zone active entre 20% du haut et 65% du bas
                rootMargin: "-20% 0px -35% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1] // Observer à différents niveaux de visibilité
            }
        );

        // Observer tous les headings
        headings.forEach(heading => {
            if (heading.id) {
                observer.observe(heading);
                headingObservers.set(heading.id, 0);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [headings, activeId]);

    return activeId;
}

interface TableOfContentsCustomProps {
    channel: Channel;
}

export const TableOfContentsCustom = ({ channel }: TableOfContentsCustomProps) => {
    const [headingElements, setHeadingElements] = useState<HTMLHeadingElement[]>([]);

    // Initialiser les headings une seule fois
    useEffect(() => {
        const contentElement = document.querySelector(".sbdocs-content");
        const elements = Array.from(
            contentElement?.querySelectorAll<HTMLHeadingElement>(
                "h3:not(.docs-story *, .skip-toc)"
            ) ?? []
        );
        setHeadingElements(elements);
    }, []);

    // Utiliser le hook pour tracker l'ID actif
    const activeId = useActiveHeading(headingElements);

    // Créer les items avec isActive
    const headings = headingElements.map<SideMenuProps.Item>(heading => ({
        text: (heading.innerText || heading.textContent).trim(),
        isActive: heading.id === activeId,
        linkProps: {
            href: `#${heading.id}`,
            onClick(e) {
                e.preventDefault();
                if (e.currentTarget instanceof HTMLAnchorElement) {
                    const [, headerId] = e.currentTarget.href.split("#");
                    if (headerId) {
                        channel.emit(NAVIGATE_URL, { url: `#${headerId}` });
                        document.querySelector(`#${heading.id}`)?.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            }
        }
    }));

    return (
        <Aside className="sbdocs">
            <SideMenuStyled
                align="right"
                burgerMenuButtonText="Table des matières"
                items={headings}
            />
        </Aside>
    );
};
