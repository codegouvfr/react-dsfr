import * as React from "react";
import { Header } from "../dist/Header";
import { Display, headerQuickAccessDisplay } from "../dist/Display";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { symToStr } from "tsafe/symToStr";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { [symToStr({ Display })]: Story },
    "description": `
A button that opens a dialog to enable the user to select light or dark mode.  

- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametres-d-affichage),
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Display.tsx)

Optionally, you can also use \`import { useIsDark } from "@codegouvfr/react-dsfr"\` to manually monitor and controls 
the theme state.

## Usage example 

\`\`\`tsx
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Display, headerQuickAccessDisplay } from "@codegouvfr/react-dsfr/Display";

function App(){

    return (
        <>
            <Header
                // other header props...
                quickAccessItems={[
                    // other quick access items...
                    headerQuickAccessDisplay
                ]}
            >
            {/* ... your app ...*/}
            <Display />
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
                homeLinkProps={{
                    "href": "#",
                    "title":
                        "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
                }}
                quickAccessItems={[headerQuickAccessDisplay]}
            />
            <Display />
        </>
    );
}

export const Default = getStory({});
