import { ToggleSwitch, type ToggleSwitchProps } from "../dist/ToggleSwitch";
import { getStoryFactory, logCallbacks } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    "wrappedComponent": { ToggleSwitch },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/interrupteur)
- [See DSFR demo](https://main--ds-gouv.netlify.app/example/component/toggle/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/ToggleSwitch.tsx)

## Uncontrolled

In this mode the \`ToggleSwitch\` component is in charge for managing it's internal state.  

\`\`\`tsx
<form action="/api/submit">
    {/* ... */}
    <ToggleSwitch
        label="Accept therme and conditions"
        inputTitle="terms"
        defaultChecked={false}
    />
</form> 
\`\`\`

## Controlled 

In this mode you are in charge to update the toggle state.  

\`\`\`tsx
function ControlledToggleSwitch() {

    const [areThermAccepted, setAreThermAccepted] = useState(false);

    return (
        <ToggleSwitch
            label="Accept therme and conditions"
            checked={areThermAccepted}
            onChange={checked => setAreThermAccepted(checked)}
        />
    );

}
\`\`\`

`,

    "argTypes": {
        "label": {
            "description": "The label of the toggle switch",
            "control": { "type": "text" }
        },
        "inputTitle": {
            "description": "The title attribute of the underlying input",
            "control": { "type": "text" }
        },
        "helperText": {
            "description": "The helper text displayed below the toggle switch",
            "control": { "type": "text" }
        },
        "disabled": {
            "description": "Whether the toggle switch is disabled or not",
            "control": { "type": "boolean" }
        },
        "labelPosition": {
            "control": {
                "type": "radio",
                "options": (() => {
                    const options = ["right", "left"] as const;

                    assert<
                        Equals<
                            typeof options[number] | undefined,
                            ToggleSwitchProps["labelPosition"]
                        >
                    >();

                    return options;
                })()
            },
            "description": 'Default: "right"'
        },
        "defaultChecked": {
            "description": "Only in uncontrolled mode. Default: false"
        }
    },
    "disabledProps": ["lang"]
});

export default { ...meta, title: "components/ToggleSwitch" };

export const Default = getStory({
    "label": "Label action interrupteur",
    "helperText": "Texte d’aide pour clarifier l’action",
    "disabled": false,
    "labelPosition": "right",
    "showCheckedHint": true,
    "defaultChecked": false,
    "inputTitle": "the-title"
});

export const ToggleSwitchNoTextNoHint = getStory({
    "label": "Label action interrupteur",
    "disabled": false,
    "labelPosition": "right",
    "showCheckedHint": false,
    "inputTitle": "the-title"
});

export const ToggleSwitchDisabled = getStory({
    "label": "Label action interrupteur",
    "helperText": "Texte d’aide pour clarifier l’action",
    "disabled": true,
    "labelPosition": "right",
    "inputTitle": "the-title"
});

export const ToggleSwitchLabelLeft = getStory({
    "label": "Label action interrupteur",
    "helperText": "Texte d’aide pour clarifier l’action",
    "labelPosition": "left",
    "inputTitle": "the-title"
});

export const ToggleSwitchLabelLeftCheckedWithOnChange = getStory({
    "label": "Label action interrupteur",
    "helperText": "Texte d’aide pour clarifier l’action",
    "labelPosition": "left",
    "defaultChecked": true,
    "inputTitle": "the-title",
    ...logCallbacks(["onChange"])
});

export const ToggleSwitchLabelLeftCheckedDisabled = getStory({
    "label": "Label action interrupteur",
    "helperText": "Texte d’aide pour clarifier l’action",
    "labelPosition": "left",
    "disabled": true,
    "inputTitle": "the-title"
});
