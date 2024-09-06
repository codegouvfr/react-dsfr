import { ProConnectButton } from "../dist/ProConnectButton";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { ProConnectButton },
    "description": `
- [See DSFR documentation]https://github.com/numerique-gouv/agentconnect-documentation/blob/main/doc_fs/bouton_proconnect.md)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/ProConnectButton.tsx)`
});

export default meta;

export const Default = getStory({
    "url": "https://example.com"
});

export const WithOnClick = getStory({
    ...logCallbacks(["onClick"])
});
