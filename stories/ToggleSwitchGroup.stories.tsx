import { ToggleSwitchGroup } from "../dist/ToggleSwitch";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { ToggleSwitchGroup },
    "description": `
- [See DSFR documentation](//www.systeme-de-design.gouv.fr/elements-d-interface/composants/interrupteur)
- [See DSFR demo](https://main--ds-gouv.netlify.app/example/component/toggle/)
- [See source code](//github.com/codegouvfr/react-dsfr/blob/main/src/ToggleSwitchGroup.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    showCheckedHint: false,
    labelPosition: "right",
    togglesProps: [
        {
            label: "Toggle 1",
            text: "Text toggle 1",
            defaultChecked: true
        },
        {
            label: "Toggle 2",
            text: "Text toggle 2",
            defaultChecked: true
        },
        {
            label: "Toggle 3",
            text: "Text toggle 3",
            disabled: true
        },
        {
            label: "Toggle 4",
            text: "Text toggle 4"
        },
        {
            label: "Toggle 5",
            text: "Text toggle 5"
        }
    ]
});

export const ToggleSwitchGroupLeftLabelWithHint = getStory({
    showCheckedHint: true,
    labelPosition: "left",
    togglesProps: [
        {
            label: "Toggle 1",
            text: "Text toggle 1",
            defaultChecked: true
        },
        {
            label: "Toggle 2",
            text: "Text toggle 2",
            defaultChecked: true
        },
        {
            label: "Toggle 3",
            text: "Text toggle 3"
        },
        {
            label: "Toggle 4",
            text: "Text toggle 4",
            disabled: true
        },
        {
            label: "Toggle 5",
            text: "Text toggle 5"
        }
    ]
});
