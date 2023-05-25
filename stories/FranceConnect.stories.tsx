import FranceConnect from "../dist/FranceConnect";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { FranceConnect },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-franceconnect/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/FranceConnect.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "loginUrl": "https://dummy"
});
