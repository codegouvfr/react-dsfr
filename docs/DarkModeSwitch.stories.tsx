import { DarkModeSwitch } from "../dist/DarkModeSwitch";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { DarkModeSwitch },
    "description": `
A button that opens a dialog to enable the user to select light or dark mode.  

- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametres-d-affichage),
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/DarkModeSwitch.tsx)

Optionally, you can also use \`import { useIsDark } from "@codegouvfr/react-dsfr"\` to manually monitor and controls 
the theme state.
`,
    "disabledProps": ["darkMode", "containerWidth"]
});

export default meta;

export const Default = getStory({});
