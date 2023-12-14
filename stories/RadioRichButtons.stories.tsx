import React from "react";
import { RadioRichButtons, type RadioRichButtonsProps } from "../dist/RadioRichButtons";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { RadioRichButtons },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-radio-riche)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/RadioRichButtons.tsx)  
  
## Controlled

\`\`\`tsx
import { useState } from "react";
import { RadioRichButtons } from "@codegouvfr/react-dsfr/RadioRichButtons";

function MyComponent(){

    const [ value, setValue ] = useState<"one" | "two" | "three" | undefined>(undefined);

    return (
        <RadioRichButtons 
            legend="Label" 
            options={[
                {
                    label: "Label radio",
                    nativeInputProps: {
                        checked: value === "one"
                        onChange: ()=> setValue("one")
                    },
                    illustration: <img src="https://placehold.it/100x100" alt="illustration" />
                },
                {
                    label: "Label radio 2",
                    nativeInputProps: {
                        checked: value === "two"
                        onChange: ()=> setValue("two")
                    },
                    illustration: <img src="https://placehold.it/100x100" alt="illustration" />
                },
                {
                    label: "Label radio 3",
                    nativeInputProps: {
                        checked: value === "three"
                        onChange: ()=> setValue("three")
                    },
                    illustration: <img src="https://placehold.it/100x100" alt="illustration" />
                }
            ]}
        />
    );

}
\`\`\`  
  
## Uncontrolled  

\`\`\`tsx
import { useState } from "react";
import { RadioRichButtons } from "@codegouvfr/react-dsfr/RadioRichButtons";

function MyComponent(){

    return (
        <form>
            <RadioRichButtons
                legend="Label"
                name="my-radio"
                options={[
                    {
                        label: "Label radio",
                        nativeInputProps: {
                            value: "one"
                        },
                        illustration: <img src="https://placehold.it/100x100" alt="illustration" />
                    },
                    {
                        label: "Label radio 2",
                        nativeInputProps: {
                            value: "two"
                        },
                        illustration: <img src="https://placehold.it/100x100" alt="illustration" />
                    },
                    {
                        label: "Label radio 3",
                        nativeInputProps: {
                            value: "three"
                        },
                        illustration: <img src="https://placehold.it/100x100" alt="illustration" />
                    }
                ]}
            />
        </form>
    );

}
\`\`\`


`,
    "argTypes": {
        "name": {
            "description":
                "The name that will be applied to all the underlying `<input type='radio' />`",
            "control": { "type": "text" }
        },
        "options": {
            "description": `An array describing the radio options. 
            \`nativeInputProps\` is an object that you would pass as prop to \`<input type='radio' />\`, 
            this is where you define the value for each option.
            \`illustration\` is an mandatory React element that will be displayed on the right of the label.
            `,
            "control": { "type": "null" }
        },
        "orientation": {
            "description": "Default: 'vertical'",
            "options": (() => {
                const options = ["horizontal", "vertical"] as const;

                assert<
                    Equals<typeof options[number] | undefined, RadioRichButtonsProps["orientation"]>
                >();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        "state": {
            "description": "Default: 'default'",
            "options": (() => {
                const options = ["success", "error", "default"] as const;

                assert<
                    Equals<typeof options[number] | undefined, RadioRichButtonsProps["state"]>
                >();

                return options;
            })(),
            "control": { "type": "radio" }
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
    "legend": "Légende pour l’ensemble de champs",
    "name": "radio",
    "options": [
        {
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        }
    ],
    "state": "default",
    "stateRelatedMessage": "State description"
});

export const Horizontal = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "name": "radio",
    "orientation": "horizontal",
    "options": [
        {
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        }
    ]
});

export const WithHintText = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "name": "radio",
    "hintText": "Texte de description additionnel",
    "options": [
        {
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        }
    ]
});

export const WithIndividualHints = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "name": "radio",
    "options": [
        {
            "label": "Label radio",
            "hintText": "Texte de description additionnel",
            "nativeInputProps": {
                "value": "value1"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 2",
            "hintText": "Texte de description additionnel",
            "nativeInputProps": {
                "value": "value2"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 3",
            "hintText": "Texte de description additionnel",
            "nativeInputProps": {
                "value": "value3"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        }
    ]
});

export const ErrorState = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "state": "error",
    "stateRelatedMessage": "Texte d’erreur obligatoire",
    "options": [
        {
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
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
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
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
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        }
    ]
});

export const Disabled = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "disabled": true,
    "options": [
        {
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        }
    ]
});

export const Small = getStory({
    "legend": "Légende pour l’ensemble de champs",
    "small": true,
    "options": [
        {
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            },
            "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
        }
    ]
});
