import React from "react";
import { Select, type SelectProps } from "../dist/Select";
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
import { Select } from "../../dist/Select";

function MyComponent(){

    const [ value, setValue ] = useState("");

    return (
        <Select
            label="Label"
            nativeSelectProps={{
                onChange: event => setValue(event.target.value),
                value
            }}
        >
            <option value="" disabled hidden>Selectionnez une option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </Select>
    );

}
\`\`\`

## Uncontrolled

\`\`\`tsx
import { useState } from "react";
import { Select } from "../../dist/Select";

function MyComponent(){

    const [ value, setValue ] = useState("");

    return (
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
    );

}
\`\`\`

`,
    "argTypes": {
        "nativeSelectProps": {
            "description": "The props that you would pass to a native `<select />`",
            "control": { "type": null }
        },
        "children": {
            "description": "The `children` that you would give a native `<select />`",
            "control": { "type": null }
        },
        "disabled": {
            "control": { "type": "boolean" }
        },
        "hint": {
            "control": { "type": "text" }
        },
        "state": {
            "options": (() => {
                const options = ["success", "error", "default"] as const;

                assert<Equals<typeof options[number], NonNullable<SelectProps["state"]>>>();

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

export const Default = getStory({
    "label": "Label pour liste déroulante",
    "nativeSelectProps": {},
    "children": (
        <>
            <option value="" selected disabled hidden>
                Selectionnez une option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </>
    )
});

export const ErrorState = getStory({
    "label": "Label pour liste déroulante",
    "state": "error",
    "stateRelatedMessage": "Texte d’erreur obligatoire",
    "nativeSelectProps": {},
    "children": (
        <>
            <option value="" selected disabled hidden>
                Selectionnez une option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </>
    )
});

export const SuccessState = getStory({
    "label": "Label pour liste déroulante",
    "state": "success",
    "stateRelatedMessage": "Texte de validation",
    "nativeSelectProps": {},
    "children": (
        <>
            <option value="" selected disabled hidden>
                Selectionnez une option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </>
    )
});

export const Disabled = getStory({
    "label": "Label pour liste déroulante",
    "disabled": true,
    "nativeSelectProps": {},
    "children": (
        <>
            <option value="" selected disabled hidden>
                Selectionnez une option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </>
    )
});

export const WithHint = getStory({
    "label": "Label pour liste déroulante",
    "hint": "Texte de description additionnel",
    "nativeSelectProps": {},
    "children": (
        <>
            <option value="" selected disabled hidden>
                Selectionnez une option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </>
    )
});
