import { Input, type InputProps } from "../dist/Input";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Input },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Input.tsx)`,
    "argTypes": {
        "disabled": {
            "control": { "type": "boolean" }
        },
        "iconId": {
            "options": (() => {
                const options = ["fr-icon-checkbox-circle-line", "ri-ancient-gate-fill"] as const;

                assert<
                    (typeof options)[number] extends NonNullable<InputProps["iconId"]>
                        ? true
                        : false
                >();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        "state": {
            "options": (() => {
                const options = ["default", "success", "error"] as const;

                assert<Equals<(typeof options)[number] | undefined, InputProps["state"]>>();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        "stateRelatedMessage": {
            "description": `This message is only displayed when \`state\` is \`success\` or \`error\`.  
                If state is \`success\` or \`error\` this message is mandatory.`
        },
        "textArea": {
            "control": { "type": "boolean" }
        },
        "nativeInputProps": {
            "description": `An object that is forwarded as props to te underlying native \`<input />\` element.  
                This is where you pass the \`name\` prop or \`onChange\` for example.`,
            "control": { "type": null }
        },
        "nativeTextAreaProps": {
            "description": `Like the \`nativeInputProps\` but when \`textArea\` is \`true\``,
            "control": { "type": null }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "label": "Label champ de saisie",
    "hintText": "Texte de description",
    "state": "default",
    "stateRelatedMessage": "Text de validation / d'explication de l'erreur",
    "textArea": false
});

export const Basic = getStory({
    "label": "Label champ de saisie"
});

export const WithErrorMessage = getStory({
    "label": "Label champs de saisie",
    "state": "error",
    "stateRelatedMessage": "Texte d’erreur obligatoire"
});

export const WithSuccessMessage = getStory({
    "label": "Label champs de saisie",
    "state": "success",
    "stateRelatedMessage": "Texte de validation"
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
    "textArea": true
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
