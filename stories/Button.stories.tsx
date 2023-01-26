import { Button, type ButtonProps } from "../dist/Button";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Button },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Button.tsx)`,
    "argTypes": {
        "priority": {
            "options": (() => {
                const options = [
                    "primary",
                    "secondary",
                    "tertiary",
                    "tertiary no outline"
                ] as const;

                assert<Equals<typeof options[number], NonNullable<ButtonProps["priority"]>>>();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        "size": {
            "options": (() => {
                const options = ["small", "medium", "large"] as const;

                assert<Equals<typeof options[number], NonNullable<ButtonProps["size"]>>>();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        "iconId": {
            "options": (() => {
                const options = ["fr-icon-checkbox-circle-line", "ri-ancient-gate-fill"] as const;

                assert<
                    typeof options[number] extends NonNullable<ButtonProps["iconId"]> ? true : false
                >();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        "iconPosition": {
            "options": (() => {
                const options = ["left", "right"] as const;

                assert<Equals<typeof options[number], NonNullable<ButtonProps["iconPosition"]>>>();

                return options;
            })(),
            "control": { "type": "radio" }
        },
        "disabled": {
            "control": { "type": "boolean" }
        },
        "nativeButtonProps": {
            "description": `Can be used to attach extra props to the underlying native button.  
            Example: \`{ "aria-controls": "fr-modal-1", onMouseEnter: event => {...} }\``,
            "control": { "type": null }
        },
        "children": {
            "description": "The label of the button",
            "control": { "type": "string" }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "children": "Label button",
    ...logCallbacks(["onClick"])
});

export const ButtonAsAnchor = getStory({
    "children": "I'm a link",
    "linkProps": {
        "href": "#"
    }
});

export const ButtonSecondary = getStory({
    "priority": "secondary",
    "children": "Label bouton",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiary = getStory({
    "priority": "tertiary",
    "children": "Simple button - tertiary",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryNoOutline = getStory({
    "priority": "tertiary no outline",
    "children": "Simple button - tertiary",
    ...logCallbacks(["onClick"])
});

export const ButtonDisabled = getStory({
    "children": "Bouton primaire désactivé",
    "disabled": true,
    ...logCallbacks(["onClick"])
});

export const ButtonSecondaryDisabled = getStory({
    "children": "Bouton secondaire désactivé",
    "priority": "secondary",
    "disabled": true,
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryDisabled = getStory({
    "children": "Label button",
    "priority": "tertiary",
    "disabled": true,
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryNoOutlineDisabled = getStory({
    "children": "Label button",
    "priority": "tertiary no outline",
    "disabled": true,
    ...logCallbacks(["onClick"])
});

export const ButtonWithIcon = getStory({
    "children": "Label button",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonSecondaryWithIcon = getStory({
    "children": "Label button",
    "priority": "secondary",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryWithIcon = getStory({
    "children": "Label button",
    "priority": "tertiary",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryNoOutlineWithIcon = getStory({
    "children": "Label button",
    "priority": "tertiary no outline",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonWithRightIcon = getStory({
    "children": "Label button",
    "iconId": "fr-icon-checkbox-circle-line",
    "iconPosition": "right",
    ...logCallbacks(["onClick"])
});

export const ButtonSecondaryWithRightIcon = getStory({
    "children": "Label button",
    "priority": "secondary",
    "iconId": "fr-icon-checkbox-circle-line",
    "iconPosition": "right",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryWithRightIcon = getStory({
    "children": "Label button",
    "priority": "tertiary",
    "iconId": "fr-icon-checkbox-circle-line",
    "iconPosition": "right",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryNoOutlineWithRightIcon = getStory({
    "children": "Label button",
    "priority": "tertiary no outline",
    "iconId": "fr-icon-checkbox-circle-line",
    "iconPosition": "right",
    ...logCallbacks(["onClick"])
});

export const ButtonWithIconOnly = getStory({
    "title": "Label button",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonSecondaryWithIconOnly = getStory({
    "title": "Label button",
    "priority": "secondary",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryWithIconOnly = getStory({
    "title": "Label button",
    "priority": "tertiary",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryNoOutlineWithIconOnly = getStory({
    "title": "Label button",
    "priority": "tertiary no outline",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const SmallButton = getStory({
    "children": "Label button",
    "size": "small",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const SmallButtonSecondary = getStory({
    "children": "Label button",
    "priority": "secondary",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const BigButtonTertiary = getStory({
    "children": "Label button",
    "size": "large",
    "priority": "tertiary",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});
