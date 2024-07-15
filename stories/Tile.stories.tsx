import React from "react";
import type { Equals } from "tsafe";
import { assert } from "tsafe/assert";

import Badge from "../dist/Badge";
import Tag from "../dist/Tag";
import { Tile, type TileProps } from "../dist/Tile";
import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";

import picto from "./assets/city-hall.svg";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Tile },
    "defaultContainerWidth": 360,
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tuile)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/tile/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Tile.tsx)`,
    "disabledProps": ["lang"],
    // https://storybook.js.org/docs/essentials/controls#configuration
    "argTypes": {
        "className": {
            "description": "CSS classes to override the style of the root wrapper",
            "control": {
                "type": "text"
            },
            "type": "string"
        },
        "title": {
            "description": "Required. Title of the tile.",
            "control": {
                "type": "text"
            }
        },
        "titleAs": {
            "description": "Override HTML heading tag of the title",
            "defaultValue": "h3",
            "type": "string",
            "control": {
                "type": "radio"
            },
            "options": (() => {
                const headings = ["h2", "h3", "h4", "h5", "h6"] as const;
                assert<Equals<typeof headings[number] | undefined, TileProps["titleAs"]>>();
                return headings;
            })()
        },
        "linkProps": {
            "description": "The link props. The linkProps and buttonProps are mutually exclusive.",
            "control": {
                "type": "object"
            }
        },
        "buttonProps": {
            "description":
                "The button props. The linkProps and buttonProps are mutually exclusive.",
            "control": {
                "type": "object"
            }
        },
        "enlargeLinkOrButton": {
            "description": "Set to true if the whole tile should be clickable.",
            "control": {
                "type": "boolean"
            },
            "type": "boolean"
        },
        "downloadButton": {
            "description":
                "Set to true if the button is a download button, indicated by the download icon. Only applicable if the Tile contains a button.",
            "control": {
                "type": "boolean"
            },
            "type": "boolean"
        },
        "desc": {
            "description": "Short description of the Tile."
        },
        "detail": {
            "description": "More details of the Tile."
        },
        "start": {
            "description": "Another details zone that generally contains Tags or Badges."
        },
        "imageUrl": {
            "description": "URL of the image. Normally a pictogram as a SVG.",
            "control": {
                "type": "text"
            },
            "type": "string"
        },
        "imageAlt": {
            "description": "Alternative text of the image.",
            "control": {
                "type": "text"
            },
            "type": "string"
        },
        "imageWidth": {
            "description": "Width of the image. Not applicable to a SVG.",
            "control": {
                "type": "text"
            }
        },
        "imageHeight": {
            "description": "Height of the image. Not applicable to a SVG.",
            "control": {
                "type": "text"
            }
        },
        "imageSvg": {
            "description": "Set to true if the image is a SVG.",
            "defaultValue": true,
            "control": {
                "type": "boolean"
            },
            "type": "boolean"
        },
        "grey": {
            "description":
                "Set to true if the background should be grey. Not applicable if noBackground is set true.",
            "control": {
                "type": "boolean"
            },
            "type": "boolean"
        },

        "classes": {
            "description": "Override CSS classes of the different wrappers in the Tile component.",
            "control": {
                "type": "object"
            }
        },
        "orientation": {
            "description": "Orientation of the Tile.",
            "control": {
                "type": "radio"
            },
            "type": "string",
            "defaultValue": "vertical",
            "options": ["vertical", "horizontal"]
        },
        "small": {
            "description": "Set to true if the Tile should be small.",
            "control": {
                "type": "boolean"
            },
            "type": "boolean"
        },
        "noIcon": {
            "description": "Set to true if the Tile should not contain any icon.",
            "control": {
                "type": "boolean"
            },
            "type": "boolean"
        },
        "noBorder": {
            "description": "Set to true if the Tile should not have any borders.",
            "control": {
                "type": "boolean"
            },
            "type": "boolean"
        },
        "noBackground": {
            "description": "Set to true if the Tile should not have any background.",
            "control": {
                "type": "boolean"
            },
            "type": "boolean"
        },
        "disabled": {
            "description": "Set to true if the Tile should be disabled.",
            "control": {
                "type": "boolean"
            },
            "type": "boolean"
        },
        "style": {
            "description": "Override the style of the root wrapper.",
            "control": {
                "type": "object"
            }
        }
    }
});

export default meta;

const defaultProps: TileProps = {
    "title": "Intitulé de la tuile",
    "linkProps": { "href": "#" },
    "imageUrl": picto,
    "imageSvg": true,
    "enlargeLinkOrButton": true,
    "small": false,
    "titleAs": "h3",
    "noBorder": false,
    "noIcon": false,
    "noBackground": false,
    "grey": false,
    "disabled": false
};

export const Default = getStory({ ...defaultProps });

export const TileWithDesc = getStory(
    {
        ...defaultProps,
        "desc": "Lorem [...] elit ut."
    },
    { "description": "Tuile avec description" }
);

export const TileWithDescAndDetail = getStory(
    {
        ...defaultProps,
        "desc": "Lorem [...] elit ut.",
        "detail": "Détail (optionel)"
    },
    { "description": "Tuile avec description et détails" }
);

export const TileWithTag = getStory(
    {
        ...defaultProps,
        "start": <Tag>Tag</Tag>
    },
    { "description": "Tuile avec Tag" }
);

export const TileWithBadge = getStory(
    {
        ...defaultProps,
        "start": (
            <Badge severity="success" noIcon>
                Badge
            </Badge>
        )
    },
    { "description": "Tuile avec Badge" }
);

export const TileWithDescDetailAndBadge = getStory(
    {
        ...defaultProps,
        "desc": "Lorem [...] elit ut.",
        "detail": "Détail (optionel)",
        "start": (
            <Badge severity="success" noIcon>
                Badge
            </Badge>
        )
    },
    { "description": "Tuile avec description, détails et un Badge" }
);

export const TileWithoutImage = getStory(
    {
        ...defaultProps,
        imageUrl: undefined
    },
    { "description": "Tuile sans picto" }
);

export const TileMDVertical = getStory(
    { ...defaultProps },
    { "description": "Tuile MD Verticale" }
);

export const TileSMVertical = getStory(
    { ...defaultProps, "small": true },
    { "description": "Tuile SM Verticale" }
);

export const TileMDHorizontal = getStory(
    { ...defaultProps, "orientation": "horizontal" },
    { "description": "Tuile MD Horizontale", "defaultContainerWidth": 700 }
);

export const TileSMHorizontal = getStory(
    { ...defaultProps, "orientation": "horizontal", "small": true },
    { "description": "Tuile SM Horizontale", "defaultContainerWidth": 700 }
);

export const TileMDHorizontalWithBadge = getStory(
    {
        ...defaultProps,
        "orientation": "horizontal",
        "start": (
            <Badge severity="success" noIcon>
                Badge
            </Badge>
        )
    },
    { "description": "Tuile MD horizontale avec Badge", "defaultContainerWidth": 700 }
);

export const TileWithDownloadLink = getStory(
    {
        ...defaultProps,
        "orientation": "horizontal",
        "start": (
            <Badge severity="success" noIcon>
                Badge
            </Badge>
        ),
        "downloadButton": true
    },
    {
        "description": "Tuile avec lien de téléchargement",
        "defaultContainerWidth": 700
    }
);

export const TileWithDownloadButton = getStory(
    {
        ...defaultProps,
        "orientation": "horizontal",
        "start": (
            <Badge severity="success" noIcon>
                Badge
            </Badge>
        ),
        "downloadButton": true,
        "linkProps": undefined,
        "buttonProps": {}
    },
    {
        "description": "Tuile avec bouton de téléchargement",
        "defaultContainerWidth": 700
    }
);

export const TileUnclickable = getStory(
    {
        "title": "Intitulé de la tuile",
        "desc": "Lorem [...] elit ut.",
        "detail": "Détail (optionel)",
        "imageUrl": picto
    },
    {
        "description": "Tuile non cliquable"
    }
);

export const TileWithLinkInTitle = getStory(
    {
        ...defaultProps,
        "desc": "Lorem [...] elit ut.",
        "detail": "Détail (optionel)",
        enlargeLinkOrButton: false
    },
    { "description": "Tuile avec lien dans le titre" }
);
