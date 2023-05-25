import MonCompteProConnect from "../dist/MonCompteProConnect";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { MonCompteProConnect },
    "description": `
- [See DSFR Connect button documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-franceconnect/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/MonCompteProConnect.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "loginUrl": "https://dummy"
});
