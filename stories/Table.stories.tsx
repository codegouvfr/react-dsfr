import { Table } from "../dist/Table";
import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Table },
    "description": `- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tableau)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Table.tsx)
`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    caption: "Résumé du tableau (accessibilité)",
    headers: ["Titre", "Titre", "Titre", "Titre", "Titre"],
    data: [
        ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
        ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
        ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
        ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
        ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"]
    ]
});

export const TableWithBorders = getStory({
    bordered: true,
    caption: "Résumé du tableau (accessibilité)",
    headers: ["th0", "th1", "th2", "th3"],
    data: [
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
    noscroll: true,
    caption: "Résumé du tableau (accessibilité)",
    headers: ["Titre", "Titre"],
    data: [
        ["Donnée", "Donnée"],
        ["Donnée", "Donnée"]
    ]
});

export const TableWithFixedLayout = getStory({
    fixed: true,
    caption: "Caption tableau fixé",
    headers: ["td", "titre"],
    data: [
        [
            "Lorem ipsum dolor sit amet consectetur adipisicin",
            "Lorem ipsum dolor sit amet consectetur"
        ],
        ["Lorem ipsum d", "Lorem ipsu"]
    ]
});

export const TableWithoutCaption = getStory({
    noCaption: true,
    caption: "Caption tableau fixé",
    headers: ["td", "titre"],
    data: [
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
    bottomCaption: true,
    caption: "Caption tableau fixé",
    headers: ["td", "titre"],
    data: [
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
    colorVariant: "green-emeraude",
    caption: "Caption tableau fixé",
    headers: ["td", "titre"],
    data: [
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
