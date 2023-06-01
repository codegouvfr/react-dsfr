import Upload, { type UploadProps } from "../dist/Upload";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Upload },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/ajout-de-fichier)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Upload.tsx)`,
    "argTypes": {
        "disabled": {
            "control": { "type": "boolean" }
        },
        "state": {
            "options": (() => {
                const options = ["default", "success", "error"] as const;

                assert<Equals<typeof options[number] | undefined, UploadProps["state"]>>();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        "stateRelatedMessage": {
            "description": `This message is only displayed when \`state\` is \`success\` or \`error\`.  
                If state is \`success\` or \`error\` this message is mandatory.`
        },
        "nativeInputProps": {
            "description": `An object that is forwarded as props to te underlying native \`<input />\` element.  
                This is where you pass the \`name\` prop or \`onChange\` for example.`,
            "control": { "type": null }
        },
        "multiple": {
            "description": "Multiple files",
            "control": { "type": "boolean" }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "hint": "Texte de description",
    "state": "default",
    "stateRelatedMessage": "Text de validation / d'explication de l'erreur",
    "multiple": false
});

export const Basic = getStory({});

export const WithErrorMessage = getStory({
    "state": "error",
    "stateRelatedMessage": "Texte d’erreur obligatoire"
});

export const WithSuccessMessage = getStory({
    "state": "success",
    "stateRelatedMessage": "Texte de validation"
});

export const Disabled = getStory({
    "disabled": true
});

export const WithHint = getStory({
    "hint": "Texte de description additionnel"
});

export const Multiple = getStory({
    "multiple": true
});
