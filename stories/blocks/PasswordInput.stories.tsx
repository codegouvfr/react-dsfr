import PasswordInput from "../../dist/blocks/PasswordInput";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { PasswordInput },
    "description": `\`import { PasswordInput } from "@codegouvfr/react-dsfr/blocks/PasswordInput"\`

- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mot-de-passe)
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
    "doHideImportInstruction": true
});

export default meta;

export const Default = getStory({
    "label": "Mot de passe"
});

export const WithHint = getStory({
    "label": "Mot de passe",
    /* spell-checker: disable */
    "hintText": "Texte de description additionnel"
    /* spell-checker: english */
});

export const WithMessagesGroup = getStory({
    "label": "Mot de passe",
    "messages": [
        /* spell-checker: disable */
        {
            "message": "12 caractères minimum",
            "severity": "info"
        },
        {
            "message": "1 caractère spécial minimum",
            "severity": "valid"
        },
        {
            "message": "1 chiffre minimum",
            "severity": "error"
        }
        /* spell-checker: enabled */
    ]
});

export const Disabled = getStory({
    "label": "Mot de passe",
    "disabled": true
});
