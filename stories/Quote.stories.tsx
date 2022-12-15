import React from "react";
import { Quote } from "../dist/Quote";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Quote },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/citation)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Quote.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    text: "Lorem [...] elit ut. ",
    author: "Auteur",
    source: (
        <>
            <li>
                <cite>Ouvrage</cite>
            </li>
            <li>Détail 1</li>
            <li>Détail 2</li>
            <li>Détail 3</li>
            <li>
                <a
                    target="_blank"
                    href="[À MODIFIER | Lien vers la sources ou des infos complémentaires]"
                >
                    Détail 4
                </a>
            </li>
        </>
    ),
    image: "https://www.systeme-de-design.gouv.fr/img/placeholder.1x1.png"
});

export const QuoteWithoutDetails = getStory({
    text: "Lorem [...] elit ut. ",
    author: "Auteur",
    image: "https://www.systeme-de-design.gouv.fr/img/placeholder.1x1.png"
});

export const QuoteWithoutSource = getStory({
    text: "Lorem [...] elit ut. ",
    image: "https://www.systeme-de-design.gouv.fr/img/placeholder.1x1.png"
});

export const QuoteWithoutIllustration = getStory({
    text: "Lorem [...] elit ut. ",
    author: "Auteur",
    source: (
        <>
            <li>
                <cite>Ouvrage</cite>
            </li>
            <li>Détail 1</li>
            <li>Détail 2</li>
            <li>Détail 3</li>
            <li>
                <a
                    target="_blank"
                    href="[À MODIFIER | Lien vers la sources ou des infos complémentaires]"
                >
                    Détail 4
                </a>
            </li>
        </>
    )
});
