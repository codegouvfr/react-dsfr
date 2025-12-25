import { BackToTop } from "../dist/BackToTop";
import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { BackToTop },
    "description": `- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/retour-en-haut-de-page/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/BackToTop.tsx)`,
    "argTypes": {
        "anchor": {
            "control": { "type": null },
            "defaultValue": "#top",
            "description": "The #anchor for the corresponding HTML id"
        },
        "right": {
            "control": "boolean",
            "defaultValue": false,
            "description": "Align to right"
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({});
export const BackToTopOnRight = getStory({
    right: true
});
