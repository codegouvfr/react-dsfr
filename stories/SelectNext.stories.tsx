import { Select, type SelectProps } from "../dist/SelectNext";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory<SelectProps<SelectProps.Option[]>>({
    sectionName,
    "wrappedComponent": { "SelectNex": Select },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information-importante)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Notice.tsx)

> NOTE: This component is still in beta, it may change in the future.

## Controlled

You want to make the user select an option between "foo", "bar" and "baz".

For all examples we assumes those are defined:

\`\`\`tsx
const values = ["foo", "bar", "baz"] as const;

type Value = typeof values[number]; // "foo" | "bar" | "baz";
\`\`\`

### No value is pre selected

\`\`\`tsx
import { useState } from "react";
import { Select } from "@codegouvfr/react-dsfr/Select";

function MyComponent(){

    const [ value, setValue ] = useState<Value | undefined>(undefined);

    return (
        {/* 
          * If the user didn't select anything, 
          * when submitted the value of "my-select" will be "" 
          */}
        <Select
            label="..."
            placeholder="Select an options"
            nativeSelectProps={{
                value,
                onChange: event => setValue(event.target.value)
            }}
            options={values.map(value=> ({
                value,
                "label": \`Option \${value}\`
            }))}
        />
    );

}
\`\`\`

### Value pre-selected

"bar" selected by default.

\`\`\`tsx
import { useState } from "react";
import { Select } from "@codegouvfr/react-dsfr/Select";

function MyComponent(){

    const [ value, setValue ] = useState<Value>("bar");

    return (
        <Select
            label="..."
            nativeSelectProps={{
                value,
                onChange: event => setValue(event.target.value)
            }}
            options={values.map(value=> ({
                value,
                "label": \`Option \${value}\`
            }))}
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
        <form method="POST" action="...">
            {/* 
              * With no value pre selected, if the user didn't select anything, 
              * when submitted the value of "my-select" will be "" 
              */}
            <Select
                label="Label"
                nativeSelectProps={{
                    name: "my-select"
                }}
                options={[
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
                ]}
                placeholder="Select an option"
            />
            {/* With a value pre selected ("bar") */}
            <Select
                label="Label"
                nativeSelectProps={{
                    name: "my-select-2"
                }}
                options={[
                    {
                        value: "foo",
                        label: "Option foo",
                    },
                    {
                        value: "bar",
                        label: "Option bar",
                        selected: true
                    },
                    {
                        value: "baz",
                        label: "Option baz",
                    }
                ]}
            />
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
                const options = ["valid", "error", "info", "default"] as const;

                assert<
                    Equals<
                        typeof options[number],
                        NonNullable<
                            SelectProps<SelectProps.Option<typeof options[number]>[]>["state"]
                        >
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
        "value": "1",
        "label": "Option 1"
    },
    {
        "value": "2",
        "label": "Option 2"
    },
    {
        "value": "3",
        "label": "Option 3"
    }
];

const myFakeValueSet = [
    "dc9d15ee-7794-470e-9dcf-a8d1dd1a6fcf",
    "1bda4f79-a199-40ce-985b-fa217809d568",
    "e91b2cac-48f6-4d60-b86f-ece02f076837",
    "66a9d7ac-9b25-4e52-9de3-4b7238135b39"
] as const;

type MyFakeValue = typeof myFakeValueSet[number];

const optionsWithTypedValues: SelectProps.Option<MyFakeValue>[] = myFakeValueSet.map(fakeValue => ({
    value: fakeValue,
    label: fakeValue
}));

export const Default = getStory({
    "label": "Label pour liste déroulante",
    "options": defaultOptions
});

export const DefaultWithPlaceholder = getStory({
    "label": "Label pour liste déroulante",
    "placeholder": "Sélectionnez une option",
    "options": defaultOptions
});

export const ErrorState = getStory({
    "label": "Label pour liste déroulante",
    "state": "error",
    "stateRelatedMessage": "Texte d’erreur obligatoire",
    "options": defaultOptions
});

export const SuccessState = getStory({
    "label": "Label pour liste déroulante",
    "state": "valid",
    "stateRelatedMessage": "Texte de validation",
    "placeholder": "Sélectionnez une option",
    "options": defaultOptions
});

export const Disabled = getStory({
    "label": "Label pour liste déroulante",
    "disabled": true,
    "placeholder": "Sélectionnez une option",
    "options": defaultOptions
});

export const WithHint = getStory({
    "label": "Label pour liste déroulante",
    "hint": "Texte de description additionnel",
    "placeholder": "Sélectionnez une option",
    "options": defaultOptions
});

export const TypedSelect = getStory({
    "label": "Label pour liste déroulante avec valeurs d'options typesafe",
    "placeholder": "Sélectionnez une option",
    "options": optionsWithTypedValues,
    "nativeSelectProps": {
        "value": "dc9d15ee-7794-470e-9dcf-a8d1dd1a6fcf"
    }
});

export const SelectWithCustomId = getStory({
    "label": "Label pour liste déroulante",
    "nativeSelectProps": {
        id: "my-unique-id"
    },
    "options": defaultOptions
});
