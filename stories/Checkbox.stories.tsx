import { Checkbox, type CheckboxProps } from "../dist/Checkbox";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Checkbox },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/case-a-cocher)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Checkbox.tsx)`,
    "argTypes": {
        "options": {
            "description": `An array describing the checkbox options. 
            \`nativeInputProps\` is an object that you would pass as prop to \`<input type='checkbox' />\`, 
            this is where you define the value for each option`,
            "control": { "type": "null" }
        },
        "orientation": {
            "description": "Default: 'vertical'",
            "options": (() => {
                const options = ["horizontal", "vertical"] as const;

                assert<
                    Equals<(typeof options)[number] | undefined, CheckboxProps["orientation"]>
                >();

                return options;
            })(),
            "control": { "type": "checkbox" }
        },
        "state": {
            "description": "Default: 'default'",
            "options": (() => {
                const options = ["success", "error", "default"] as const;

                assert<Equals<(typeof options)[number] | undefined, CheckboxProps["state"]>>();

                return options;
            })(),
            "control": { "type": "checkbox" }
        },
        "stateRelatedMessage": {
            "description": `The message won't be displayed if state is "default". 
	            If the state is "error" providing a message is mandatory`,
            "control": { "type": "text" }
        },
        "disabled": {
            "control": { "type": "boolean" }
        },
        "small": {
            "control": { "type": "boolean" }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "legend": "Légende pour l’ensemble des champs",
    "options": [
        {
            "label": "Label checkbox",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value1"
            }
        },
        {
            "label": "Label checkbox 2",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value2"
            }
        },
        {
            "label": "Label checkbox 3",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value3"
            }
        }
    ],
    "state": "default",
    "stateRelatedMessage": "State description"
});

export const Single = getStory({
    "options": [
        {
            "label": "Label checkbox",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value1"
            }
        }
    ]
});

export const Horizontal = getStory({
    "legend": "Légende pour l’ensemble des champs",
    "orientation": "horizontal",
    "options": [
        {
            "label": "Label checkbox",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value1"
            }
        },
        {
            "label": "Label checkbox 2",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value2"
            }
        },
        {
            "label": "Label checkbox 3",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value3"
            }
        }
    ]
});

export const WthHintText = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "hintText": "Texte de description additionnel",
    "options": [
        {
            "label": "Label checkbox",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value1"
            }
        },
        {
            "label": "Label checkbox 2",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value2"
            }
        },
        {
            "label": "Label checkbox 3",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value3"
            }
        }
    ]
});

export const WithIndividualHints = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "options": [
        {
            "label": "Label checkbox",
            "hintText": "Texte de description additionnel",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value1"
            }
        },
        {
            "label": "Label checkbox 2",
            "hintText": "Texte de description additionnel",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value2"
            }
        },
        {
            "label": "Label checkbox 3",
            "hintText": "Texte de description additionnel",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value3"
            }
        }
    ]
});

export const ErrorState = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "state": "error",
    "stateRelatedMessage": "Texte d’erreur obligatoire",
    "options": [
        {
            "label": "Label checkbox",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value1"
            }
        },
        {
            "label": "Label checkbox 2",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value2"
            }
        },
        {
            "label": "Label checkbox 3",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value3"
            }
        }
    ]
});

export const HorizontalErrorState = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "state": "error",
    "orientation": "horizontal",
    "stateRelatedMessage": "Texte d’erreur obligatoire",
    "options": [
        {
            "label": "Label checkbox",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value1"
            }
        },
        {
            "label": "Label checkbox 2",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value2"
            }
        },
        {
            "label": "Label checkbox 3",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value3"
            }
        }
    ]
});

export const SuccessState = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "state": "success",
    "orientation": "horizontal",
    "stateRelatedMessage": "Texte de validation",
    "options": [
        {
            "label": "Label checkbox",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value1"
            }
        },
        {
            "label": "Label checkbox 2",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value2"
            }
        },
        {
            "label": "Label checkbox 3",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value3"
            }
        }
    ]
});

export const Small = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "small": true,
    "options": [
        {
            "label": "Label checkbox",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value1"
            }
        },
        {
            "label": "Label checkbox 2",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value2"
            }
        },
        {
            "label": "Label checkbox 3",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value3"
            }
        }
    ]
});

export const Disabled = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "disabled": true,
    "options": [
        {
            "label": "Label checkbox",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value1"
            }
        },
        {
            "label": "Label checkbox 2",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value2"
            }
        },
        {
            "label": "Label checkbox 3",
            "nativeInputProps": {
                "name": "checkboxes-1",
                "value": "value3"
            }
        }
    ]
});
