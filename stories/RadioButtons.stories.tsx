import { RadioButtons, type RadioButtonsProps } from "../dist/RadioButtons";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { RadioButtons },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-radio)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/RadioButtons.tsx)  
  
## Controlled

\`\`\`tsx
import { useState } from "react";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";

function MyComponent(){

    const [ value, setValue ] = useState<"one" | "two" | "three" | undefined>(undefined);

    return (
        <RadioButtons 
            legend="Label" 
            options={[
                {
                    label: "Label radio",
                    nativeInputProps: {
                        checked: value === "one"
                        onChange: ()=> setValue("one")
                    }
                },
                {
                    label: "Label radio 2",
                    nativeInputProps: {
                        checked: value === "two"
                        onChange: ()=> setValue("two")
                    }
                },
                {
                    label: "Label radio 3",
                    nativeInputProps: {
                        checked: value === "three"
                        onChange: ()=> setValue("three")
                    }
                }
            ]}
        />
    );

}
\`\`\`  
  
## Uncontrolled  

\`\`\`tsx
import { useState } from "react";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";

function MyComponent(){

    return (
        <form>
            <RadioButtons
                legend="Label"
                name="my-radio"
                options={[
                    {
                        label: "Label radio",
                        nativeInputProps: {
                            value: "one"
                        }
                    },
                    {
                        label: "Label radio 2",
                        nativeInputProps: {
                            value: "two"
                        }
                    },
                    {
                        label: "Label radio 3",
                        nativeInputProps: {
                            value: "three"
                        }
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
            this is where you define the value for each option`,
            "control": { "type": "null" }
        },
        "orientation": {
            "description": "Default: 'vertical'",
            "options": (() => {
                const options = ["horizontal", "vertical"] as const;

                assert<
                    Equals<typeof options[number] | undefined, RadioButtonsProps["orientation"]>
                >();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        "state": {
            "description": "Default: 'default'",
            "options": (() => {
                const options = ["success", "error", "default"] as const;

                assert<Equals<typeof options[number] | undefined, RadioButtonsProps["state"]>>();

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
            }
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            }
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            }
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
            }
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            }
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            }
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
            }
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            }
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            }
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
            }
        },
        {
            "label": "Label radio 2",
            "hintText": "Texte de description additionnel",
            "nativeInputProps": {
                "value": "value2"
            }
        },
        {
            "label": "Label radio 3",
            "hintText": "Texte de description additionnel",
            "nativeInputProps": {
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
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            }
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            }
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
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
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            }
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            }
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
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
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            }
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            }
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
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
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            }
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            }
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
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
            "label": "Label radio",
            "nativeInputProps": {
                "value": "value1"
            }
        },
        {
            "label": "Label radio 2",
            "nativeInputProps": {
                "value": "value2"
            }
        },
        {
            "label": "Label radio 3",
            "nativeInputProps": {
                "value": "value3"
            }
        }
    ]
});
