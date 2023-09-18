import { Highlight, type HighlightProps } from "../dist/Highlight";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory<HighlightProps>({
    sectionName,
    wrappedComponent: { Highlight },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mise-en-exergue)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Highlight.tsx)`,
    argTypes: {
        size: {
            options: (() => {
                const sizes = ["sm", "lg"] as const;

                assert<Equals<(typeof sizes)[number], HighlightProps.Size>>();

                return [null, ...sizes];
            })(),
            control: { type: "select", labels: { null: "default", sm: "small", lg: "large" } },
            description: "Content text size"
        },
        children: {
            type: { name: "string", required: true },
            description: "Text to display as highlight content"
        },
        classes: {
            control: "object",
            description:
                'Add custom classes for "root" or "content" component inner elements. Associate custom class values with "root" or "content" keys'
        }
    },
    disabledProps: ["lang"]
});

export default meta;

export const Default = getStory({
    children:
        "Les parents d’enfants de 11 à 14 ans n’ont aucune démarche à accomplir : les CAF versent automatiquement l’ARS aux familles déjà allocataires qui remplissent les conditions."
});

export const HighlightSmall = getStory(
    {
        children: "Highlight contains a text with small font size",
        size: "sm"
    },
    {
        description: "Small `Highlight`"
    }
);

export const HighlightLarge = getStory(
    {
        children: "Highlight contains a text with large font size",
        size: "lg"
    },
    {
        description: "Large `Highlight`"
    }
);

export const HighlightCustomGreenAccentColor = getStory(
    {
        children: "Highlight contains a text with custom green emeraude accent color",
        classes: {
            root: "fr-highlight--green-emeraude"
        }
    },
    {
        description: "Large `Highlight`"
    }
);

export const HighlightCustomBrownAccentColor = getStory(
    {
        children: "Highlight contains a text with custom brown caramel accent color",
        classes: {
            root: "fr-highlight--brown-caramel"
        }
    },
    {
        description: "Large `Highlight`"
    }
);
