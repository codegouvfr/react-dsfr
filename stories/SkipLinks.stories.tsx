import { SkipLinks, type SkipLinksProps } from "../dist/SkipLinks";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory<SkipLinksProps>({
    sectionName,
    wrappedComponent: { SkipLinks },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lien-d-evitement)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/SkipLinks.tsx)`
});

export default meta;

export const Default = getStory({
    links: [
        {
            label: "Contenu",
            anchor: "#contenu"
        },
        {
            label: "Menu",
            anchor: "#header-navigation"
        },
        {
            label: "Recherche",
            anchor: "#header-search"
        },
        {
            label: "Pied de page",
            anchor: "#footer"
        }
    ],
    classes: {
        root: "fr-mt-9v" // Just to fix storybook preview toolbar overlapping
    }
});
