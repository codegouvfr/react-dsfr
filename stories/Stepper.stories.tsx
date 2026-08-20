import { Stepper } from "../dist/Stepper";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Stepper },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/indicateur-d-etapes)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Stepper.tsx)`,
    "argTypes": {
        "progressText": {
            "description":
                "Optional override for the progress text. Defaults to the translated value (for example: `Étape 1 sur 3`).",
            "control": { "type": null }
        },
        "nextStepText": {
            "description":
                "Optional override for the label displayed before `nextTitle`. Defaults to the translated value (for example: `Étape suivante :`).",
            "control": { "type": "text" }
        }
    }
});

export default meta;

export const Default = getStory({
    "stepCount": 3,
    "currentStep": 1,
    "title": "Titre de l’étape en cours",
    "nextTitle": "Titre de la prochaine étape"
});

export const StepperWithoutNext = getStory({
    "stepCount": 4,
    "currentStep": 4,
    "title": "Titre de la dernière étape en cours"
});

export const WithCustomTexts = getStory({
    "stepCount": 3,
    "currentStep": 2,
    "title": "Titre de l’étape en cours",
    "nextTitle": "Titre de la prochaine étape",
    "progressText": ({ currentStep, stepCount }) =>
        `Progression personnalisée : ${currentStep} / ${stepCount}`,
    "nextStepText": "Libellé personnalisé :"
});
