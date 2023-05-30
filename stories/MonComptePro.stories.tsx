import { MonCompteProButton } from "../dist/MonCompteProButton";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { MonCompteProButton },
    "description": `
- [See MonComptePro documentation](https://github.com/betagouv/moncomptepro#sp%C3%A9cifications-visuelles)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/MonCompteProButton.tsx)`
});

export default meta;

export const Default = getStory({
    "url": "https://example.com"
});

export const Centered = getStory({
    "style": {
        "textAlign": "center"
    },
    "url": "https://example.com"
});
