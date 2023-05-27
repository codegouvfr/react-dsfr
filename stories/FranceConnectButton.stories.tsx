import { FranceConnectButton } from "../dist/FranceConnectButton";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { FranceConnectButton },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-franceconnect/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/FranceConnectButton.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "redirectUrl": "https://example.com"
});

export const Plus = getStory({
    "redirectUrl": "https://example.com",
    "plus": true
});

export const Centered = getStory({
    "style": {
        "textAlign": "center"
    },
    "redirectUrl": "https://example.com"
});
