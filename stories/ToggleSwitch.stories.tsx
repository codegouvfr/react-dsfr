import { ToggleSwitch } from "../dist/ToggleSwitch";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { ToggleSwitch },
    "description": `
- [See DSFR documentation](//www.systeme-de-design.gouv.fr/elements-d-interface/composants/interrupteur)
- [See DSFR demo](https://main--ds-gouv.netlify.app/example/component/toggle/)
- [See source code](//github.com/codegouvfr/react-dsfr/blob/main/src/ToggleSwitch.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    label: "Label action interrupteur",
    text: "Texte d’aide pour clarifier l’action",
    disabled: false,
    labelPosition: "right",
    showCheckedHint: true,
    defaultChecked: false
});

export const ToggleSwitchControlled = getStory({
    label: "Label action interrupteur",
    disabled: false,
    labelPosition: "right",
    showCheckedHint: false,
    checked: true,
    onChange: e => alert("checked: " + e.currentTarget.checked)
});

export const ToggleSwitchNoTextNoHint = getStory({
    label: "Label action interrupteur",
    disabled: false,
    labelPosition: "right",
    showCheckedHint: false
});

export const ToggleSwitchDisabled = getStory({
    label: "Label action interrupteur",
    text: "Texte d’aide pour clarifier l’action",
    disabled: true,
    labelPosition: "right"
});

export const ToggleSwitchLabelLeft = getStory({
    label: "Label action interrupteur",
    text: "Texte d’aide pour clarifier l’action",
    labelPosition: "left"
});

export const ToggleSwitchLabelLeftCheckedWithOnChange = getStory({
    label: "Label action interrupteur",
    text: "Texte d’aide pour clarifier l’action",
    labelPosition: "left",
    defaultChecked: true,
    onChange: e => {
        alert("checked: " + e.currentTarget.checked);
    }
});

export const ToggleSwitchLabelLeftCheckedDisabled = getStory({
    label: "Label action interrupteur",
    text: "Texte d’aide pour clarifier l’action",
    labelPosition: "left",
    disabled: true
});
