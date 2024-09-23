import { FranceConnectButton } from "../dist/FranceConnectButton";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { FranceConnectButton },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/bouton-franceconnect/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/FranceConnectButton.tsx)`
});

export default meta;

export const Default = getStory({
    "url": "https://example.com"
});

export const Plus = getStory({
    "url": "https://example.com",
    "plus": true
});

export const Centered = getStory({
    "style": {
        "textAlign": "center"
    },
    "url": "https://example.com"
});

export const WithOnClick = getStory({
    ...logCallbacks(["onClick"])
});
