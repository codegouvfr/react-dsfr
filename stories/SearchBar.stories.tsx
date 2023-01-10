import { SearchBar } from "../dist/SearchBar";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { SearchBar },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/barre-de-recherche)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/SearchBar.tsx)`,
    "argTypes": {
        "big": {
            "description": "Use the big variant if you have space to spare",
            "control": { "type": "boolean" }
        },
        "label": {
            "description": "Default: 'Rechercher' (or translation)",
            "control": { "type": "text" }
        },
        "nativeInputProps": {
            "description": `An object that is forwarded as props to te underlying native \`<input />\` element.  
                This is where you pass the \`name\` prop or \`onChange\` for example.`,
            "control": { "type": null }
        }
    }
});

export default meta;

export const Default = getStory({
    "label": undefined
});
