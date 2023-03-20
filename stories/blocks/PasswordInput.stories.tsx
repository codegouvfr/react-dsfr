import PasswordInput from "../../dist/blocks/PasswordInput";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { PasswordInput },
    "description": `- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mot-de-passe)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/blocks/PasswordInput.tsx)  `,
    "argTypes": {
        "disabled": {
            "control": { "type": "boolean" }
        },

        "nativeInputProps": {
            "description": `An object that is forwarded as props to te underlying native \`<input />\` element.  
            This is where you pass the \`name\` prop or \`onChange\` for example.`,
            "control": { "type": null }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "label": "Mot de passe"
});

export const WithHint = getStory({
    "label": "Mot de passe",
    "hintText": "Texte de description additionnel"
});

export const WithMessagesGroup = getStory({
    "label": "Mot de passe",
    "messagesGroup": [
        {
            "message": "12 caractères minimum",
            "state": "default"
        },
        {
            "message": "1 caractère spécial minimum",
            "state": "success"
        },
        {
            "message": "1 chiffre minimum",
            "state": "error"
        }
    ]
});

export const Disabled = getStory({
    "label": "Mot de passe",
    "disabled": true
});
