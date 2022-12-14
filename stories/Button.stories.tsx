import { Button } from "../dist/Button";
import type { ButtonProps } from "../dist/Button";
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
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "label": "Label button",
    ...logCallbacks(["onClick"])
});

export const ButtonAsAnchor = getStory({
    "label": "I'm a link",
    "linkProps": {
        "href": "#"
    }
});

export const ButtonSecondary = getStory({
    "priority": "secondary",
    "label": "Label bouton",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiary = getStory({
    "priority": "tertiary",
    "label": "Simple button - tertiary",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryNoOutline = getStory({
    "priority": "tertiary no outline",
    "label": "Simple button - tertiary",
    ...logCallbacks(["onClick"])
});

export const ButtonDisabled = getStory({
    "label": "Bouton primaire désactivé",
    "disabled": true,
    ...logCallbacks(["onClick"])
});

export const ButtonSecondaryDisabled = getStory({
    "label": "Bouton secondaire désactivé",
    "priority": "secondary",
    "disabled": true,
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryDisabled = getStory({
    "label": "Label button",
    "priority": "tertiary",
    "disabled": true,
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryNoOutlineDisabled = getStory({
    "label": "Label button",
    "priority": "tertiary no outline",
    "disabled": true,
    ...logCallbacks(["onClick"])
});

export const ButtonWithIcon = getStory({
    "label": "Label button",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonSecondaryWithIcon = getStory({
    "label": "Label button",
    "priority": "secondary",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryWithIcon = getStory({
    "label": "Label button",
    "priority": "tertiary",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryNoOutlineWithIcon = getStory({
    "label": "Label button",
    "priority": "tertiary no outline",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const ButtonWithRightIcon = getStory({
    "label": "Label button",
    "iconId": "fr-icon-checkbox-circle-line",
    "iconPosition": "right",
    ...logCallbacks(["onClick"])
});

export const ButtonSecondaryWithRightIcon = getStory({
    "label": "Label button",
    "priority": "secondary",
    "iconId": "fr-icon-checkbox-circle-line",
    "iconPosition": "right",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryWithRightIcon = getStory({
    "label": "Label button",
    "priority": "tertiary",
    "iconId": "fr-icon-checkbox-circle-line",
    "iconPosition": "right",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiaryNoOutlineWithRightIcon = getStory({
    "label": "Label button",
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
    "label": "Label button",
    "size": "small",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const SmallButtonSecondary = getStory({
    "label": "Label button",
    "priority": "secondary",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});

export const BigButtonTertiary = getStory({
    "label": "Label button",
    "size": "large",
    "priority": "tertiary",
    "iconId": "fr-icon-checkbox-circle-line",
    ...logCallbacks(["onClick"])
});
