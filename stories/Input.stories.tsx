import { Input } from "../dist/Input";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Input },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Input.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "label": "Label champ de saisie"
});

export const WithErrorMessage = getStory({
    "label": "Label champs de saisie",
    "message": {
        "type": "error",
        "text": "Texte d’erreur obligatoire"
    }
});

export const WithSuccessMessage = getStory({
    "label": "Label champs de saisie",
    "message": {
        "type": "success",
        "text": "Texte de validation"
    }
});

export const Disabled = getStory({
    "label": "Label champs de saisie",
    "disabled": true
});

export const WithHint = getStory({
    "label": "Label champs de saisie",
    "hintText": "Texte de description additionnel"
});

export const TextArea = getStory({
    "label": "Label champs de saisie",
    "isTextArea": true
});

export const WithIcon = getStory({
    "label": "Label champs de saisie",
    "iconId": "fr-icon-alert-line"
});

export const Date = getStory(
    {
        "label": "Label champs de saisie",
        "nativeInputProps": {
            "type": "date"
        }
    },
    {
        "description":
            "The correct icon is applied automatically if nativeInputProps type is `date`"
    }
);

export const InputTypeNumber = getStory({
    "label": "Label champs de saisie",
    "nativeInputProps": {
        "pattern": "[0-9]*",
        "inputMode": "numeric",
        "type": "number"
    }
});

export const WithPlaceholder = getStory({
    "label": "Url du site :",
    "hintText": "Saisissez une url valide, commençant par https://",
    "nativeInputProps": {
        "placeholder": "https://"
    }
});
