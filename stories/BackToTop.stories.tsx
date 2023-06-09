import { BackToTop } from "../dist/BackToTop";
import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { BackToTop },
    "description": `- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/retour-en-haut-de-page/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/BackToTop.tsx)`,
    // "argTypes": {
    //     "anchor": {
    //         "control": { "type": null },
    //         "defaultValue": "#top"
    //     },
    //     "right": {
    //         "control": { "type": null },
    //         "description": "Align to right"
    //     }
    // },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({});
