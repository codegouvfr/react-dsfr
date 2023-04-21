import * as React from "react";
import { fr } from "../dist";
import { Header } from "../dist/Header";
import { Footer } from "../dist/Footer";
import { Display, headerFooterDisplayItem } from "../dist/Display";
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
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";

function App(){

    return (
        <>
            <Header
                // other Header props...
                quickAccessItems={[
                    // other quick access items...
                    headerFooterDisplayItem
                ]}
            >
            {/* ... your app ...*/}
            <Footer
                // other Footer props...
                bottomItems={[
                    // other other bottom items...
                    headerFooterDisplayItem
                ]}
            />
            <Display />
        <>
    );

}
\`\`\`
`,
    "disabledProps": ["darkMode", "containerWidth"]
});

export default meta;

const brandTop = (
    <>
        INTITULE
        <br />
        OFFICIEL
    </>
);

const homeLinkProps = {
    "href": "#",
    "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
};

function Story() {
    return (
        <>
            <Header
                brandTop={brandTop}
                serviceTitle="Nom du site / service"
                homeLinkProps={homeLinkProps}
                quickAccessItems={[headerFooterDisplayItem]}
            />
            <Footer
                className={fr.cx("fr-mt-5v")}
                brandTop={brandTop}
                homeLinkProps={homeLinkProps}
                accessibility="fully compliant"
                bottomItems={[headerFooterDisplayItem]}
            />
            <Display />
        </>
    );
}

export const Default = getStory({});
