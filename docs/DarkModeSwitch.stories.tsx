import { DarkModeSwitch } from "../dist/DarkModeSwitch";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { DarkModeSwitch },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametres-d-affichage),
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/DarkModeSwitch.tsx)`,
    "disabledProps": ["darkMode", "containerWidth"]
});

export default meta;

export const Default = getStory({});
