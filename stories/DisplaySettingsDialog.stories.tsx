import * as React from "react";
import { Header } from "../dist/Header";
import {
    DisplaySettingsDialog,
    headerQuickAccessDisplaySettingsItem
} from "../dist/DisplaySettingsDialog";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { symToStr } from "tsafe/symToStr";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { [symToStr({ DisplaySettingsDialog })]: Story },
    "description": `
A button that opens a dialog to enable the user to select light or dark mode.  

- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametres-d-affichage),
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/DarkModeSwitch.tsx)

Optionally, you can also use \`import { useIsDark } from "@codegouvfr/react-dsfr"\` to manually monitor and controls 
the theme state.

## Usage example 

\`\`\`tsx
import { Header } from "../dist/Header";
import { DisplaySettingsDialog, headerQuickAccessDisplaySettingsItem } from "../dist/DisplaySettingsDialog";

function App(){

    return (
        <>
            <Header
                // other header props...
                quickAccessItems={[
                    // other quick access items...
                    headerQuickAccessDisplaySettingsItem
                ]}
            >
            {/* ... your app ...*/}
            <DisplaySettingsDialog />
        <>
    );

}
\`\`\`
`,
    "disabledProps": ["darkMode", "containerWidth"]
});

export default meta;

function Story() {
    return (
        <>
            <Header
                brandTop={
                    <>
                        INTITULE
                        <br />
                        OFFICIEL
                    </>
                }
                serviceTitle="Nom du site / service"
                homeLinkProps={{ "href": "#" }}
                quickAccessItems={[headerQuickAccessDisplaySettingsItem]}
            />
            <DisplaySettingsDialog />
        </>
    );
}

export const Default = getStory({});
