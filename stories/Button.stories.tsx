import { Button } from "../dist/Button";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Button },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Button.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "label": "Simple button",
    ...logCallbacks(["onClick"])
});

export const ButtonSecondary = getStory({
    "priority": "secondary",
    "label": "Simple button - secondary",
    ...logCallbacks(["onClick"])
});

export const ButtonTertiary = getStory({
    "priority": "tertiary",
    "label": "Simple button - tertiary",
    ...logCallbacks(["onClick"])
});

export const ButtonDisabled = getStory({
    "label": "Simple button - disabled",
    "disabled": true,
    ...logCallbacks(["onClick"])
});

export const ButtonWithIconDefault = getStory({
    "label": "Simple button with icon",
    "icon": {
        iconId: "fr-icon-account-circle-fill"
    },
    ...logCallbacks(["onClick"])
});

export const ButtonWithIconLeft = getStory({
    "label": "Simple button with icon",
    "icon": {
        "iconId": "fr-icon-account-circle-fill",
        "position": "left"
    },
    ...logCallbacks(["onClick"])
});

export const ButtonWithIconRight = getStory({
    "label": "Simple button with icon",
    "icon": {
        "iconId": "fr-icon-account-circle-fill",
        "position": "right"
    },
    ...logCallbacks(["onClick"])
});

export const DefaultAnchorButton = getStory({
    "label": "Simple button - with href (anchor)",
    "linkProps": {
        "href": "https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton",
        "target": "_blank"
    }
});

export const DefaultAnchorButtonWithTargetBlank = getStory({
    "label": "Simple button - with href (anchor) and target _blank",
    "linkProps": {
        "target": "_blank",
        "href": "https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton"
    }
});
