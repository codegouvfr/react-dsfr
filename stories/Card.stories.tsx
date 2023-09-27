import React from "react";
import { Card, type CardProps } from "../dist/Card";
import { Badge } from "../dist/Badge";
import { Tag } from "../dist/Tag";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

import { fr } from "../dist";

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
        titleAs: {
            "description": `Heading level`,
            "options": (() => {
                const headings = ["h2", "h3", "h4", "h5", "h6"] as const;
                assert<Equals<typeof headings[number] | undefined, CardProps["titleAs"]>>();
                return headings;
            })(),
            "control": { "type": "radio" }
        },
        "desc": { "description": `` },
        linkProps: {
            "description": `Required only if enlargeLink is true. The Card Link props.`
        },
        enlargeLink: {
            "description": `Set to false to restrict the link area to the Card title only.`,
            defaultValue: false,
            "control": { "type": "boolean" }
        },
        iconId: {
            "options": (() => {
                const options = ["fr-icon-checkbox-circle-line", "ri-ancient-gate-fill"] as const;

                assert<
                    typeof options[number] extends NonNullable<CardProps["iconId"]> ? true : false
                >();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        size: {
            "description": "Card title text sizing",
            "options": (() => {
                const sizes = ["small", "medium", "large"] as const;
                assert<Equals<typeof sizes[number] | undefined, CardProps["size"]>>();
                return sizes;
            })(),
            defaultValue: "medium",
            "control": { "type": "radio" }
        },
        imageUrl: {
            "description": "Use any image URL, or none"
        },
        imageAlt: {
            "description": "Alternative text for the image"
        },
        badge: {
            description: "Badge in the header"
        },
        start: {
            description:
                "Zone containing either tags group or badges group (not both) located above the card title"
        },
        detail: {
            description: "Hint text about the `start` zone"
        },
        end: {
            description: "Extra details or actions below the card content"
        },
        endDetail: {
            description: "Hint text about the `end` zone"
        },
        footer: {
            description: "Footer"
        },
        horizontal: {
            description: "Horizontal alignment",
            defaultValue: false,
            type: "boolean"
        },
        background: {
            description: "Card with opaque background",
            defaultValue: true,
            type: "boolean"
        },
        border: {
            description: "Card with border",
            defaultValue: true,
            type: "boolean"
        },
        shadow: {
            description: "Card with shadow",
            defaultValue: false,
            type: "boolean"
        },
        grey: {
            description: "Card content zone with grey background",
            defaultValue: false,
            type: "boolean"
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

const defaultProps = {
    "enlargeLink": true as const,
    "title": "Intitulé de la carte (sur lequel se trouve le lien)",
    "titleAs": "h3" as const,
    "linkProps": {
        "href": "#"
    },
    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et",
    "imageUrl": "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png",
    "imageAlt": "texte alternatif de l’image"
};

export const Default = getStory({ ...defaultProps });

// todo: wrap with grid
export const CardWithoutEnlargeLink = getStory(
    { ...defaultProps, "enlargeLink": false },
    { "description": "Carte sans lien étendu à la carte" }
);

export const CardWithIcon = getStory(
    { ...defaultProps, "iconId": "fr-icon-warning-fill" },
    { "description": "Carte avec icône personnalisée" }
);

export const CardWithoutBorder = getStory(
    { ...defaultProps, "border": false },
    { "description": "Carte sans bordure" }
);

export const CardWithShadow = getStory(
    { ...defaultProps, "shadow": true },
    { "description": "Carte avec ombre portée" }
);

export const CardWithoutImage = getStory(
    { ...defaultProps, "imageUrl": undefined },
    { "description": "Carte sans image" }
);

export const CardWithImageRatio = getStory(
    { ...defaultProps, "classes": { "imgTag": "fr-ratio-3x4" } },
    { "description": "Carte verticale avec image au ratio d'aspect 3x4" }
);

export const CardWithBadgeInTheHeader = getStory(
    {
        ...defaultProps,
        "badge": <Badge>LABEL BADGE</Badge>
    },
    { "description": "Carte verticale avec un badge dans l'image" }
);

export const CardWithBadgesInTheContent = getStory(
    {
        ...defaultProps,
        "start": (
            <ul className={fr.cx("fr-badges-group")}>
                <li>
                    <Badge>LABEL BADGE</Badge>
                </li>
                <li>
                    <Badge severity="new">LABEL BADGE</Badge>
                </li>
            </ul>
        )
    },
    { "description": "Carte verticale avec plusieurs badges dans le contenu" }
);

export const CardWithBadgeInTheHeaderAndTagsInTheContent = getStory(
    {
        ...defaultProps,
        "badge": <Badge severity="new">LABEL BADGE</Badge>,
        "start": (
            <ul className={fr.cx("fr-tags-group")}>
                <li>
                    <Tag>LABEL TAG 1</Tag>
                </li>
                <li>
                    <Tag>LABEL TAG 2</Tag>
                </li>
            </ul>
        )
    },
    {
        "description":
            "Carte verticale avec un badge dans l'image et plusieurs tags dans le contenu"
    }
);

export const CardWithTagsInTheContent = getStory(
    {
        ...defaultProps,
        "start": (
            <ul className={fr.cx("fr-tags-group")}>
                <li>
                    <Tag>LABEL TAG 1</Tag>
                </li>
                <li>
                    <Tag>LABEL TAG 2</Tag>
                </li>
            </ul>
        )
    },
    { "description": "Carte verticale avec plusieurs tags dans le contenu" }
);

export const CardWithDetail = getStory(
    {
        ...defaultProps,
        "detail": "détail(optionnel)",
        "classes": {
            detail: fr.cx("fr-icon-warning-fill")
        }
    },
    { "description": "Carte verticale avec détail" }
);

export const CardWithEndDetail = getStory(
    {
        ...defaultProps,
        "endDetail": "détail(optionnel)"
    },
    { "description": "Carte verticale avec détail en bas" }
);

export const CardWithActionLinks = getStory(
    {
        ...defaultProps,
        "enlargeLink": false,
        "footer": (
            <ul className={fr.cx("fr-links-group")}>
                <li>
                    <a
                        className={fr.cx(
                            "fr-link",
                            "fr-icon-arrow-right-line",
                            "fr-link--icon-right"
                        )}
                        href="#"
                    >
                        label
                    </a>
                </li>
                <li>
                    <a
                        className={fr.cx(
                            "fr-link",
                            "fr-icon-arrow-right-line",
                            "fr-link--icon-right"
                        )}
                        href="#"
                    >
                        label
                    </a>
                </li>
            </ul>
        )
    },
    { "description": "Carte verticale avec liens d'action" }
);

export const CardWithActionButtons = getStory(
    {
        ...defaultProps,
        "enlargeLink": false,
        "footer": (
            <ul
                className={fr.cx(
                    "fr-btns-group",
                    "fr-btns-group--inline-reverse",
                    "fr-btns-group--inline-lg"
                )}
            >
                <li>
                    <button className={fr.cx("fr-btn", "fr-btn--secondary")}>Label</button>
                </li>
                <li>
                    <button className={fr.cx("fr-btn")}>Label</button>
                </li>
            </ul>
        )
    },
    { "description": "Carte verticale avec buttons d'action" }
);

export const CardHorizontal = getStory(
    {
        ...defaultProps,
        "horizontal": true
    },
    { "description": "Carte horizontale", "defaultContainerWidth": 700 }
);

export const CardHorizontalSM = getStory(
    {
        ...defaultProps,
        "horizontal": true,
        "size": "small"
    },
    { "description": "Carte horizontale", "defaultContainerWidth": 500 }
);

export const CardHorizontaleLG = getStory(
    {
        ...defaultProps,
        "horizontal": true,
        "size": "large"
    },
    { "description": "Carte horizontale", "defaultContainerWidth": 900 }
);

export const CardHorizontalWithoutImage = getStory(
    {
        ...defaultProps,
        "horizontal": true,
        "size": "large",
        "imageUrl": undefined,
        "start": (
            <ul className={fr.cx("fr-badges-group")}>
                <li>
                    <Badge>LABEL BADGE</Badge>
                </li>
                <li>
                    <Badge severity="new">LABEL BADGE</Badge>
                </li>
            </ul>
        )
    },
    { "description": "Carte horizontale sans image", "defaultContainerWidth": 900 }
);

export const CardHorizontalWithoutImageAndEnlargeLink = getStory(
    {
        ...defaultProps,
        "horizontal": true,
        "enlargeLink": false,
        "size": "large",
        "imageUrl": undefined
    },
    { "description": "Carte horizontale sans image", "defaultContainerWidth": 900 }
);

export const CardHorizontalWithActions = getStory(
    {
        ...defaultProps,
        "enlargeLink": false,
        "horizontal": true,
        "size": "large",
        "badge": <Badge>LABEL BADGE</Badge>,
        "start": (
            <ul className={fr.cx("fr-tags-group")}>
                <li>
                    <Tag>LABEL TAG 1</Tag>
                </li>
                <li>
                    <Tag>LABEL TAG 2</Tag>
                </li>
            </ul>
        ),
        "footer": (
            <ul
                className={fr.cx(
                    "fr-btns-group",
                    "fr-btns-group--inline-reverse",
                    "fr-btns-group--inline-lg"
                )}
            >
                <li>
                    <button className={fr.cx("fr-btn", "fr-btn--secondary")}>Label</button>
                </li>
                <li>
                    <button className={fr.cx("fr-btn")}>Label</button>
                </li>
            </ul>
        )
    },
    { "description": "Carte horizontale", "defaultContainerWidth": 900 }
);

export const CardGrey = getStory(
    {
        ...defaultProps,
        "horizontal": true,
        "grey": true
    },
    { "description": "Carte horizontale grey", "defaultContainerWidth": 900 }
);

export const CardNoLink = getStory(
    {
        ...defaultProps,
        "enlargeLink": false,
        "horizontal": true,
        "linkProps": undefined
    },
    { "description": "Carte horizontale sans lien", "defaultContainerWidth": 900 }
);
