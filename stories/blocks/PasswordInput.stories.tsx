import PasswordInput from "../../dist/blocks/PasswordInput";
import { getStoryFactory } from "../getStory";

const { meta, getStory } = getStoryFactory({
    "wrappedComponent": { PasswordInput },
    "description": `\`import { PasswordInput } from "@codegouvfr/react-dsfr/blocks/PasswordInput"\`

- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mot-de-passe/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/blocks/PasswordInput.tsx)  `,
    "argTypes": {
        "label": {
            "description": `The label associated to the password input.`,
            "control": { "type": "text" }
        },
        "disabled": {
            "control": { "type": "boolean" }
        },
        "nativeInputProps": {
            "description": `An object that is forwarded as props to te underlying native \`<input />\` element.  
            This is where you pass the \`name\` prop or \`onChange\` for example.`,
            "control": false
        },
        "messagesHint": {
            "description": `The text that is displayed before the list of messages. 
            Default to "Your password must contain:" (internationalized).
            If you pass an empty string, the hint block wont be displayed.`
        }
    },
    "doHideImportInstruction": true
});

export default { ...meta, title: "blocks/PasswordInput" };

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
