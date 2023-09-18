import { ToggleSwitchGroup, type ToggleSwitchGroupProps } from "../dist/ToggleSwitchGroup";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { ToggleSwitchGroup },
    "description": `
- [See DSFR documentation](//www.systeme-de-design.gouv.fr/elements-d-interface/composants/interrupteur)
- [See DSFR demo](https://main--ds-gouv.netlify.app/example/component/toggle/)
- [See source code](//github.com/codegouvfr/react-dsfr/blob/main/src/ToggleSwitchGroup.tsx)`,
    "disabledProps": ["lang"],
    "argTypes": {
        "labelPosition": {
            "control": {
                "type": "radio",
                "options": (() => {
                    const options = ["right", "left"] as const;

                    assert<
                        Equals<
                            (typeof options)[number] | undefined,
                            ToggleSwitchGroupProps["labelPosition"]
                        >
                    >();

                    return options;
                })()
            },
            "description": 'Default: "right"'
        },
        "toggles": {
            "description": `An array of ToggleSwitchProps`,
            "control": { "type": null }
        }
    },
    "defaultContainerWidth": 800
});

export default meta;

export const Default = getStory({
    "toggles": [
        {
            "label": "Toggle 1",
            "helperText": "Text toggle 1",
            "defaultChecked": true,
            "inputTitle": "title-1"
        },
        {
            "label": "Toggle 2",
            "helperText": "Text toggle 2",
            "defaultChecked": true,
            "inputTitle": "title-2"
        },
        {
            "label": "Toggle 3",
            "helperText": "Text toggle 3",
            "disabled": true,
            "inputTitle": "title-3"
        },
        {
            "label": "Toggle 4",
            "helperText": "Text toggle 4",
            "inputTitle": "title-4"
        },
        {
            "label": "Toggle 5",
            "helperText": "Text toggle 5",
            "inputTitle": "title-5"
        }
    ]
});
