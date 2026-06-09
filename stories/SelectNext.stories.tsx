import { Select, type SelectProps } from "../dist/SelectNext";

import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory<SelectProps<SelectProps.Option[]>>({
    "wrappedComponent": { "SelectNext": Select },
    "doHideImportInstruction": true,
    "description": `
\`\`\`tsx

import { Select } from "@codegouvfr/react-dsfr/SelectNext";

\`\`\`
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/liste-deroulante)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/SelectNext.tsx)


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

> NOTE: In this implementation, once the use has selected a value it can't be unselected.  
> If you need you want your users to be able to unselect please provide an option with an empty string as value
> and use the next example as reference.  

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
              * when submitted the value of "my-select" will be "".  
              * Here as well, the value once selected can't be unselected.
              * Use an explicit option with an empty string as value and set selected to true to allow unselecting.  
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
        "label": {
            "control": { "type": "text" }
        },
        "options": {
            "description": "The options to display in the select",
            "control": false
        },
        "nativeSelectProps": {
            "description": "The props that you would pass to a native `<select />`",
            "control": false
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

export default { ...meta, title: "components/SelectNext" };

const options = [
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

export const Default = getStory({
    "label": "Label pour liste déroulante",
    options
});

export const DefaultWithSelectedOption = getStory({
    "label": "Label pour liste déroulante",
    options: [
        ...options,
        {
            "value": "4",
            "label": "Option 4",
            "selected": true
        }
    ]
});

export const DefaultWithDefaultValue = getStory({
    "label": "Label pour liste déroulante",
    options,
    "nativeSelectProps": {
        "defaultValue": "2"
    }
});

export const DefaultWithPlaceholder = getStory({
    "label": "Label pour liste déroulante",
    "placeholder": "Sélectionnez une option",
    options
});

export const ErrorState = getStory({
    "label": "Label pour liste déroulante",
    "state": "error",
    "stateRelatedMessage": "Texte d’erreur obligatoire",
    options
});

export const SuccessState = getStory({
    "label": "Label pour liste déroulante",
    "state": "valid",
    "stateRelatedMessage": "Texte de validation",
    "placeholder": "Sélectionnez une option",
    options
});

export const Disabled = getStory({
    "label": "Label pour liste déroulante",
    "disabled": true,
    "placeholder": "Sélectionnez une option",
    options
});

export const WithHint = getStory({
    "label": "Label pour liste déroulante",
    "hint": "Texte de description additionnel",
    "placeholder": "Sélectionnez une option",
    options
});

export const SelectWithCustomId = getStory({
    "label": "Label pour liste déroulante",
    "nativeSelectProps": {
        id: "my-unique-id"
    },
    options
});
