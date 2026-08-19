import { Summary } from "../dist/Summary";

import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    "wrappedComponent": { Summary },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/sommaire)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Summary.tsx)`,
    "disabledProps": ["lang"]
});

export default { ...meta, title: "components/Summary" };

export const Default = getStory({
    links: [
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre 1",
            subLinks: [
                {
                    linkProps: { href: "#" },
                    text: "Titre de l’ancre 1.1"
                }
            ]
        },
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre 2"
        },
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre 3"
        },
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre 4",
            subLinks: [
                {
                    linkProps: { href: "#" },
                    text: "Titre de l’ancre 4.1",
                    subLinks: [
                        {
                            linkProps: { href: "#" },
                            text: "Titre de l’ancre 4.1.1"
                        }
                    ]
                }
            ]
        },
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre 5"
        }
    ]
});

export const SummaryWithCustomTitle = getStory({
    title: "Sommaire personnalisé",
    links: [
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre 1",
            subLinks: [
                {
                    linkProps: { href: "#" },
                    text: "Titre de l’ancre 1.1"
                }
            ]
        },
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre 2"
        },
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre 3"
        },
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre 4",
            subLinks: [
                {
                    linkProps: { href: "#" },
                    text: "Titre de l’ancre 4.1",
                    subLinks: [
                        {
                            linkProps: { href: "#" },
                            text: "Titre de l’ancre 4.1.1"
                        }
                    ]
                }
            ]
        },
        {
            linkProps: { href: "#" },
            text: "Titre de l’ancre 5"
        }
    ]
});
