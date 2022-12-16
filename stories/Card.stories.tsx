import React from "react";
import { Card, CardProps } from "../dist/Card";
import { Badge } from "../dist/Badge";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

import "../dsfr/utility/icons/icons-system/icons-system.css";
import { fr } from "../dist/lib";

const { meta, getStory } = getStoryFactory({
    sectionName,
    defaultContainerWidth: 360,
    "wrappedComponent": { Card },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/carte)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/card/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Card.tsx)`,
    "argTypes": {
        "title": { "description": `Required.` },
        "desc": { "description": `` },
        linkProps: {
            "description": `Required. the Card Link props`
        },
        enlargeLink: {
            "description": `default: true. Set to false to restrict the link area to the Card title only.`,
            "control": { "type": "boolean" }
        },
        size: {
            "description": "Card title text sizing",
            "options": (() => {
                const sizes = ["small", "medium", "large"] as const;

                assert<Equals<typeof sizes[number] | undefined, CardProps["size"]>>();

                return sizes;
            })(),
            "control": { "type": "radio" }
        },
        imageUrl: {
            "description": "Use any image URL, or none"
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

const defaultProps = {
    enlargeLink: true,
    title: "Intitulé de la carte (sur lequel se trouve le lien)",
    linkProps: {
        href: "#"
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et",
    imageUrl: "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png",
    imageAlt: "texte alternatif de l’image"
};

export const Default = getStory({ ...defaultProps });

// todo: wrap with grid
export const CardWithoutEnlargeLink = getStory(
    { ...defaultProps, enlargeLink: false },
    { description: "Carte sans lien étendu à la carte" }
);

export const CardWithIcon = getStory(
    { ...defaultProps, iconId: "fr-icon-warning-fill" },
    { description: "Carte avec icône personnalisée" }
);

export const CardWithoutBorder = getStory(
    { ...defaultProps, border: false },
    { description: "Carte sans bordure" }
);

export const CardWithShadow = getStory(
    { ...defaultProps, shadow: true },
    { description: "Carte avec ombre portée" }
);

export const CardWithoutImage = getStory(
    { ...defaultProps, imageUrl: undefined },
    { description: "Carte sans image" }
);

export const CardWithImageRatio = getStory(
    { ...defaultProps, classes: { imgTag: "fr-ratio-3x4" } },
    { description: "Carte verticale avec image au ratio d'aspect 3x4" }
);

export const CardWithBadgeInTheHeader = getStory(
    {
        ...defaultProps,
        badges: [<Badge label="LABEL BADGE" />, <Badge label="LABEL BADGE" severity="new" />]
    },
    { description: "Carte verticale avec badge dans l'image" }
);

export const CardWithBadgeInTheContent = getStory(
    {
        ...defaultProps,
        detail: (
            <ul className={fr.cx("fr-badges-group")}>
                <Badge label="LABEL BADGE" />
                <Badge label="LABEL BADGE" severity="new" />
            </ul>
        )
    },
    { description: "Carte verticale avec badges dans le contenu" }
);

export const CardWithDetail = getStory(
    {
        ...defaultProps,
        detail: "détail(optionnel)"
    },
    { description: "Carte verticale avec détail" }
);

export const CardWithEndDetail = getStory(
    {
        ...defaultProps,
        endDetail: "détail(optionnel)"
    },
    { description: "Carte verticale avec détail en bas" }
);

export const CardWithActionLinks = getStory(
    {
        ...defaultProps,
        enlargeLink: false,
        footer: (
            <ul className="fr-links-group">
                <li>
                    <a className="fr-link fr-icon-arrow-right-line fr-link--icon-right" href="#">
                        label
                    </a>
                </li>
                <li>
                    <a className="fr-link fr-icon-arrow-right-line fr-link--icon-right" href="#">
                        label
                    </a>
                </li>
            </ul>
        )
    },
    { description: "Carte verticale avec liens d'action" }
);

export const CardWithActionButtons = getStory(
    {
        ...defaultProps,
        enlargeLink: false,
        footer: (
            <ul className="fr-btns-group fr-btns-group--inline-reverse fr-btns-group--inline-lg">
                <li>
                    <button className="fr-btn fr-btn--secondary">Label</button>
                </li>
                <li>
                    <button className="fr-btn">Label</button>
                </li>
            </ul>
        )
    },
    { description: "Carte verticale avec buttons d'action" }
);

export const CardHorizontale = getStory(
    {
        ...defaultProps,
        horizontal: true
    },
    { description: "Carte horizontale", containerWidth: 700 }
);

export const CardHorizontaleSM = getStory(
    {
        ...defaultProps,
        horizontal: true,
        size: "small"
    },
    { description: "Carte horizontale", containerWidth: 500 }
);

export const CardHorizontaleLG = getStory(
    {
        ...defaultProps,
        horizontal: true,
        size: "large"
    },
    { description: "Carte horizontale", containerWidth: 900 }
);

export const CardHorizontaleWithoutImage = getStory(
    {
        ...defaultProps,
        horizontal: true,
        size: "large",
        imageUrl: undefined,
        detail: (
            <ul className={fr.cx("fr-badges-group")}>
                <Badge label="LABEL BADGE" />
                <Badge label="LABEL BADGE" severity="new" />
            </ul>
        )
    },
    { description: "Carte horizontale sans image", containerWidth: 900 }
);

export const CardHorizontaleWithoutImageAndEnlargeLink = getStory(
    {
        ...defaultProps,
        horizontal: true,
        enlargeLink: false,
        size: "large",
        imageUrl: undefined
    },
    { description: "Carte horizontale sans image", containerWidth: 900 }
);

export const CardHorizontaleWithActions = getStory(
    {
        ...defaultProps,
        enlargeLink: false,
        horizontal: true,
        size: "large",
        badges: [<Badge label="LABEL BADGE" />],
        detail: (
            <ul className={fr.cx("fr-badges-group")}>
                <Badge label="LABEL BADGE" />
                <Badge label="LABEL BADGE" severity="new" />
            </ul>
        ),
        footer: (
            <ul className="fr-btns-group fr-btns-group--inline-reverse fr-btns-group--inline-lg">
                <li>
                    <button className="fr-btn fr-btn--secondary">Label</button>
                </li>
                <li>
                    <button className="fr-btn">Label</button>
                </li>
            </ul>
        )
    },
    { description: "Carte horizontale", containerWidth: 900 }
);

export const CardGrey = getStory(
    {
        ...defaultProps,
        horizontal: true,
        grey: false
    },
    { description: "Carte horizontale grey", containerWidth: 900 }
);
