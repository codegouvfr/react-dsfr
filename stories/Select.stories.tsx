import { Select, type SelectProps, type GenericOption } from "../dist/Select";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Select },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information-importante)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Notice.tsx)

## Controlled

\`\`\`tsx
import { useState } from "react";
import { Select } from "@codegouvfr/react-dsfr/Select";

function MyComponent(){

    const [ value, setValue ] = useState("");
    const options = [
        {
            value: "1",
            label: "Option 1",
        },
        {
            value: "2",
            label: "Option 2",
        },
        {
            value: "3",
            label: "Option 3",
        }
    ]
    return (
        <Select
            label="Label"
            nativeSelectProps={{
                onChange: event => setValue(event.target.value),
                value: ""
            }}
            options={options}
            placeholder="Selectionnez une option"
        />
    );

}
\`\`\`

## Uncontrolled

\`\`\`tsx
import { useState } from "react";
import { Select } from "@codegouvfr/react-dsfr/Select";

function MyComponent(){

    return (
        <form>
            <Select
                label="Label"
                nativeSelectProps={{
                    name: "my-select"
                }}
            >
                <option value="" selected disabled hidden>Selectionnez une option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
            </Select>
        </form>
    );

}
\`\`\`

`,
    "argTypes": {
        "nativeSelectProps": {
            "description": "The props that you would pass to a native `<select />`",
            "control": { "type": null }
        },
        "disabled": {
            "control": { "type": "boolean" }
        },
        "placeholder": {
            "description": "Adds a fake placeholder for the select element",
            "control": { "type": "text" }
        },
        "hint": {
            "control": { "type": "text" }
        },
        "state": {
            "options": (() => {
                const options = ["success", "error", "default"] as const;

                assert<
                    Equals<
                        typeof options[number],
                        NonNullable<SelectProps<typeof options[number]>["state"]>
                    >
                >();

                return options;
            })(),
            "control": { "type": "select" }
        },
        "stateRelatedMessage": {
            "description": "Text to provide if the state is defined",
            "control": { "type": "text" }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

const defaultOptions = [
    {
        value: "1",
        label: "Option 1"
    },
    {
        value: "2",
        label: "Option 2"
    },
    {
        value: "3",
        label: "Option 3"
    }
];

const optionsWithTypedValues: GenericOption<number>[] = [
    {
        value: 1,
        label: "Option 1"
    },
    {
        value: 2,
        label: "Option 2"
    },
    {
        value: 3,
        label: "Option 3"
    }
];

export const Default = getStory({
    "label": "Label pour liste déroulante",
    "nativeSelectProps": {},
    "options": defaultOptions
});

export const DefaultWithPlaceholder = getStory({
    "label": "Label pour liste déroulante",
    "nativeSelectProps": {
        "value": ""
    },
    "placeholder": "Sélectionnez une option",
    "options": defaultOptions
});

export const ErrorState = getStory({
    "label": "Label pour liste déroulante",
    "state": "error",
    "stateRelatedMessage": "Texte d’erreur obligatoire",
    "nativeSelectProps": {},
    "options": defaultOptions
});

export const SuccessState = getStory({
    "label": "Label pour liste déroulante",
    "state": "success",
    "stateRelatedMessage": "Texte de validation",
    "nativeSelectProps": {
        "value": "2"
    },
    "placeholder": "Sélectionnez une option",
    "options": defaultOptions
});

export const Disabled = getStory({
    "label": "Label pour liste déroulante",
    "disabled": true,
    "nativeSelectProps": {
        "value": ""
    },
    "placeholder": "Sélectionnez une option",
    "options": defaultOptions
});

export const WithHint = getStory({
    "label": "Label pour liste déroulante",
    "hint": "Texte de description additionnel",
    "nativeSelectProps": {
        "value": ""
    },
    "placeholder": "Sélectionnez une option",
    "options": defaultOptions
});

export const TypedSelect = getStory({
    "label": "Label pour liste déroulante avec valeurs d'options typesafe",
    "placeholder": "Sélectionnez une option",
    "options": optionsWithTypedValues,
    "nativeSelectProps": {
        "value": "2"
    }
});
