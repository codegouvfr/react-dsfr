import { Stepper } from "../dist/Stepper";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Stepper },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/indicateur-d-etape)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Stepper.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    steps: 3,
    currentStep: 1,
    title: "Titre de l’étape en cours",
    nextTitle: "Titre de la prochaine étape"
});

export const StepperWithoutNext = getStory({
    steps: 4,
    currentStep: 4,
    title: "Titre de la dernière étape en cours"
});
