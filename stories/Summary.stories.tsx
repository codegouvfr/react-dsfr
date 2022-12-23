import { Summary } from "../dist/Summary";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Summary },
    "description": `
- [See DSFR documentation](//www.systeme-de-design.gouv.fr/elements-d-interface/composants/sommaire)
- [See source code](//github.com/codegouvfr/react-dsfr/blob/main/src/Summary.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    links: [
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre"
        },
        {
            linkProps: { href: "#" },

            text: "Titre de l’ancre"
        },
        {
            linkProps: { href: "#" },

            text: "Titre de l’ancre"
        },
        {
            linkProps: { href: "#" },

            text: "Titre de l’ancre"
        },
        {
            linkProps: { href: "#" },

            text: "Titre de l’ancre"
        }
    ]
});

export const SummaryWithCustomTitle = getStory({
    title: "Sommaire personnalisé",
    links: [
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre"
        },
        {
            linkProps: { href: "#" },

            text: "Titre de l’ancre"
        },
        {
            linkProps: { href: "#" },

            text: "Titre de l’ancre"
        },
        {
            linkProps: { href: "#" },

            text: "Titre de l’ancre"
        },
        {
            linkProps: { href: "#" },

            text: "Titre de l’ancre"
        }
    ]
});
