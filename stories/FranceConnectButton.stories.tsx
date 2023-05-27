import { FranceConnectButton } from "../dist/FranceConnectButton";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { FranceConnectButton },
    "description": `
- [See DSFR documentation](https://github.com/france-connect/Documentation-AgentConnect/blob/main/doc_fs/implementation_fca/bouton_fca.md)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/FranceConnectButton.tsx)`
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
