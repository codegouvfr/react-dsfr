import { Table } from "../dist/Table";
import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";
import React from "react";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Table },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tableau)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Table.tsx)`,
    "disabledProps": ["lang"],
    "argTypes": {
        "caption": {
            "description": "Table caption"
        },
        "bordered": {
            "description": "Add borders between lines",
            "type": { "name": "boolean" }
        },
        "noScroll": {
            "description": "Prevent horizontal scrolling",
            "type": { "name": "boolean" }
        },
        "fixed": {
            "description": "Fix columns width",
            "type": { "name": "boolean" }
        },
        "noCaption": {
            "description": `Hide caption, as mentioned [here](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tableau) 
            for some RGAA purposes, the well named \`no-caption\` option should only visually hide the so 
            called caption and not prevent its rendering.`,
            "type": { "name": "boolean" }
        },
        "bottomCaption": {
            "description": "Move caption to bottom",
            "type": { "name": "boolean" }
        },
        "headColumn": {
            "description": "Add a header column",
            "type": { "name": "boolean" }
        }
    }
});

export default meta;

export const Default = getStory({
    "caption": "Résumé du tableau (accessibilité)",
    "headers": ["Titre", "Titre", "Titre", "Titre", "Titre"],
    "data": [
        ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
        ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
        ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
        ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
        ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"]
    ]
});

export const TableWithBorders = getStory({
    "bordered": true,
    "caption": "Résumé du tableau (accessibilité)",
    "headers": ["th0", "th1", "th2", "th3"],
    "data": [
        [
            "Lorem [...] elit ut.",
            "Lorem [...] elit ut.",
            "Lorem [...] elit ut.",
            "Lorem [...] elit ut."
        ],
        ["Lorem [...] elit ut.", "Lorem", "Lorem [..", "Lor"],
        ["Lorem [...] elit ut.", "Lorem [...] elit ut.", "Lorem [...]", "Lorem [...]"]
    ]
});

export const TableNoScroll = getStory({
    "noScroll": true,
    "caption": "Résumé du tableau (accessibilité)",
    "headers": ["Titre", "Titre"],
    "data": [
        ["Donnée", "Donnée"],
        ["Donnée", "Donnée"]
    ]
});

export const TableWithFixedLayout = getStory({
    "fixed": true,
    "caption": "Caption tableau fixé",
    "headers": ["td", "titre"],
    "data": [
        [
            "Lorem ipsum dolor sit amet consectetur adipisicin",
            "Lorem ipsum dolor sit amet consectetur"
        ],
        ["Lorem ipsum d", "Lorem ipsu"]
    ]
});

export const TableWithoutCaption = getStory({
    "noCaption": true,
    "caption": "Titre du tableau",
    "headers": ["td", "titre"],
    "data": [
        [
            "Lorem ipsum dolor sit amet consectetur adipisicin",
            "Lorem ipsum dolor sit amet consectetur"
        ],
        ["Lorem ipsum d", "Lorem ipsu"],
        [
            "Lorem ipsum dolor sit amet consectetur adipisicin",
            "Lorem ipsum dolor sit amet consectetur"
        ],
        ["Lorem ipsum d", "Lorem ipsu"]
    ]
});

export const TableWithBottomCaption = getStory({
    "bottomCaption": true,
    "caption": "Titre du tableau en bas",
    "headers": ["td", "titre"],
    "data": [
        [
            "Lorem ipsum dolor sit amet consectetur adipisicin",
            "Lorem ipsum dolor sit amet consectetur"
        ],
        ["Lorem ipsum d", "Lorem ipsu"],
        [
            "Lorem ipsum dolor sit amet consectetur adipisicin",
            "Lorem ipsum dolor sit amet consectetur"
        ],
        ["Lorem ipsum d", "Lorem ipsu"]
    ]
});

export const TableWithHeadColumn = getStory({
    "headColumn": true,
    "caption": "Titre du tableau",
    "headers": ["", "titre"],
    "data": [
        ["ligne 1", "Lorem ipsum dolor sit amet consectetur"],
        ["ligne 2", "Lorem ipsu"],
        ["ligne 3", "Lorem ipsum dolor sit amet consectetur"],
        ["ligne 4", "Lorem ipsu"]
    ]
});

export const SmallTable = getStory({
    "caption": "Titre du tableau",
    "headers": ["td", "titre"],
    "data": [
        [
            "Lorem ipsum dolor sit amet consectetur adipisicin",
            "Lorem ipsum dolor sit amet consectetur"
        ],
        ["Lorem ipsum d", "Lorem ipsu"],
        [
            "Lorem ipsum dolor sit amet consectetur adipisicin",
            "Lorem ipsum dolor sit amet consectetur"
        ],
        ["Lorem ipsum d", "Lorem ipsu"]
    ],
    "size": "sm"
});

export const LargeTable = getStory({
    "caption": "Titre du tableau",
    "headers": ["td", "titre"],
    "data": [
        [
            "Lorem ipsum dolor sit amet consectetur adipisicin",
            "Lorem ipsum dolor sit amet consectetur"
        ],
        ["Lorem ipsum d", "Lorem ipsu"],
        [
            "Lorem ipsum dolor sit amet consectetur adipisicin",
            "Lorem ipsum dolor sit amet consectetur"
        ],
        ["Lorem ipsum d", "Lorem ipsu"]
    ],
    "size": "lg"
});

const CellWithBr = (
    <span>
        Lorem <br />
        ipsu
        <br />d
    </span>
);

export const TableWithSomeColumnAlignement = getStory({
    "caption": "Titre du tableau",
    "headers": ["aligné à droite", "aligné au centre", "aligné en haut", "aligné en bas"],
    "data": [
        [CellWithBr, "Lorem ipsum d", "Lorem ipsum d", "Lorem ipsum d"],
        ["Lorem ipsum d", CellWithBr, "Lorem ipsu", "Lorem ipsum d"],
        ["Lorem ipsum d", "Lorem ipsum d", CellWithBr, "Lorem ipsum d"],
        ["Lorem ipsum d", "Lorem ipsu", "Lorem ipsum d", CellWithBr]
    ],
    "size": "lg",
    "cellsAlignment": ["right", "center", "top", "bottom"]
});

export const TableWithSomeCellAlignement = getStory({
    "caption": "Titre du tableau",
    "headers": ["colonne 1", "colonne 2", "colonne 3", "colonne 4"],
    "data": [
        ["aligné à droite", "Lorem ipsum d", "Lorem ipsum d", CellWithBr],
        ["Lorem ipsum d", "aligné au centre", "Lorem ipsum d", CellWithBr],
        ["Lorem ipsum d", "Lorem ipsum d", "aligné en haut", CellWithBr],
        ["Lorem ipsum d", "Lorem ipsu", CellWithBr, "aligné en bas"]
    ],
    "size": "lg",
    "cellsAlignment": [
        ["right", undefined, undefined, undefined],
        [undefined, "center", undefined, undefined],
        [undefined, undefined, "top", undefined],
        [undefined, undefined, undefined, "bottom"]
    ]
});
