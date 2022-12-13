import { Button } from "../dist/Button";
import type { ButtonProps } from "../dist/Button";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory<ButtonProps>({
    sectionName,
    wrappedComponent: { Button },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/button)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Button.tsx)`,
    "argTypes": {
        "priority": {
            "options": ((): ButtonProps["priority"][] => ["secondary", "tertiary"])(),
            "control": { "type": "radio" }
        },
        "label": {
            "description": `Required`
        },
        "href": {
            "description":
                "If set, Button component will render a <a> tag, otherwise, it will render a <button>"
        },
        "type": {
            "options": ((): ButtonProps["type"][] => ["button", "submit", "reset"])(),
            "control": { "type": "radio" },
            "description":
                "Type can only be set on <button> element. If the Button component has no href, it will render a <button> element. If type prop is not set, it will render a type='submit' attribute (default value for a <button> element"
        },
        "onClick": {
            "description":
                "onClick callback, can only be set if Button has no href prop set (to prevent onClick='window.open()' type behavior)"
        },
        "disabled": {
            "description":
                "Can only be set if Button has no href prop set (disabled can't be set on <a> element)"
        },
        "target": {
            "description": `Can only be set with a href attribute`,
            "options": ((): ButtonProps["target"][] => ["_self", "_blank", "_parent", "_top"])()
        },
        "size": {
            "description": `Can only be set with a href attribute`,
            "options": ((): ButtonProps["size"][] => ["sm", "lg"])()
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    label: "Simple button"
});

export const ButtonSecondary = getStory({
    priority: "secondary",
    label: "Simple button - secondary"
});

export const ButtonTertiary = getStory({
    priority: "tertiary",
    label: "Simple button - tertiary"
});

export const ButtonDisabled = getStory({
    label: "Simple button - disabled",
    disabled: true
});

export const ButtonWithIconDefault = getStory({
    label: "Simple button with icon",
    icon: {
        name: "fr-icon-account-circle-fill"
    }
});

export const ButtonWithIconLeft = getStory({
    label: "Simple button with icon",
    icon: {
        name: "fr-icon-account-circle-fill",
        position: "left"
    }
});

export const ButtonWithIconRight = getStory({
    label: "Simple button with icon",
    icon: {
        name: "fr-icon-account-circle-fill",
        position: "right"
    }
});

export const DefaultAnchorButton = getStory({
    label: "Simple button - with href (anchor)",
    href: "https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton"
});

export const DefaultAnchorButtonWithTargetBlank = getStory({
    label: "Simple button - with href (anchor) and target _blank",
    target: "_blank",
    href: "https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton"
});
