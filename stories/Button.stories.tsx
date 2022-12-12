import { Button } from "../dist/Button";
import type { ButtonProps } from "../dist/Button";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory<ButtonProps>({
    sectionName,
    wrappedComponent: { Button },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/button)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Button.tsx)`,
    "argTypes": {
        "priority": {
            "options": (() => {
                const priorities = ["secondary", "tertiary"] as const;

                assert<Equals<typeof priorities[number] | undefined, ButtonProps["priority"]>>();

                return priorities;
            })(),
            "control": { "type": "radio" }
        },
        "label": {
            "description": `Required when the \`<Alert isSmall={false} />\` 
      (which is the default if \`isSmall\` isn't specified).`
        },
        "href": {
            "description": "Required when the `<Alert isSmall />`"
        },
        "onClick": {
            "description": "If the modal should have a close button"
        },
        "disabled": {
            "description": "Called when the user clicks the close button"
        },
        "target": {
            "description": `If specified the \`<Alert />\` is in 
          [controlled mode](https://reactjs.org/docs/forms.html#controlled-components)
          this means that when the close button is clicked
          the \`onClose()\` callback will be called but you are responsible
          for setting \`isClosed\` to \`false\`, the \`<Alert />\` wont close itself.`,
            "control": { "type": null }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    label: "Label bouton"
});

export const ButtonSecondary = getStory({
    priority: "secondary",
    label: "Label bouton secondaire"
});

export const ButtonTertiary = getStory({
    priority: "tertiary",
    label: "Label bouton tertiaire"
});

export const DefaultAnchorButton = getStory({
    label: "Label bouton avec lien",
    href: "https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton"
});

export const DefaultAnchorButtonWithTargetBlank = getStory({
    label: "Label bouton avec lien",
    href: "https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton"
});
