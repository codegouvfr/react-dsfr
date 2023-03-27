import { Table, type TableProps } from "../dist/Table";
import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

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
            "description": "Hide caption",
            "type": { "name": "boolean" }
        },
        "bottomCaption": {
            "description": "Move caption to bottom",
            "type": { "name": "boolean" }
        },
        "colorVariant": {
            "options": (() => {
                const options = [
                    "green-tilleul-verveine",
                    "green-bourgeon",
                    "green-emeraude",
                    "green-menthe",
                    "green-archipel",
                    "blue-ecume",
                    "blue-cumulus",
                    "purple-glycine",
                    "pink-macaron",
                    "pink-tuile",
                    "brown-cafe-creme",
                    "brown-caramel",
                    "brown-opera",
                    "orange-terre-battue",
                    "yellow-moutarde",
                    "yellow-tournesol",
                    "beige-gris-galet",
                    undefined
                ] as const;

                assert<Equals<typeof options[number], TableProps["colorVariant"]>>();

                return options;
            })(),
            "control": { "type": "select", "labels": { "null": "no color variant" } }
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

export const TableWithColorVariant = getStory({
    "colorVariant": "green-emeraude",
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
