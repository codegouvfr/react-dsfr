import { ButtonsGroup, type ButtonsGroupProps } from "../dist/ButtonsGroup";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { ButtonsGroup },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/groupe-de-boutons)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/ButtonGroup.tsx)`,
    "argTypes": {
        "inlineLayoutWhen": {
            "options": (() => {
                const options = [
                    "never",
                    "always",
                    ...(["sm", "md", "lg"] as const).map(bp => `${bp} and up` as const)
                ] as const;

                assert<
                    Equals<
                        typeof options[number] | undefined,
                        ButtonsGroupProps["inlineLayoutWhen"]
                    >
                >();

                return options;
            })(),
            "description": ` 
                Default "never", "never" means that the button are 
                stacked vertically regardless of the screed width 
            `,
            "control": { "type": "select" /*"labels": { "null": "no size (md)" }*/ }
        },
        "buttonsEquisized": {
            "description": ` 
                Default: false, TODO: Report @gouvfr/dsfr bug: only applies when
                inlineLayout: "never" | "always"
            `,
            "control": { "type": "boolean" }
        },
        "alignment": {
            "options": (() => {
                const options = ["left", "center", "right", "between"] as const;

                assert<
                    Equals<typeof options[number] | undefined, ButtonsGroupProps["alignment"]>
                >();

                return options;
            })(),
            "description": `Default: "left", in vertical layout this has no effect`,
            "control": { "type": "select" }
        },
        "buttonsSize": {
            "options": (() => {
                const options = ["small", "medium", "large"] as const;

                assert<
                    Equals<typeof options[number] | undefined, ButtonsGroupProps["buttonsSize"]>
                >();

                return options;
            })(),
            "description": ` 
                Default: "medium", it overwrite the size that would have been set on the buttons
            `,
            "control": { "type": "select" }
        },
        "buttonsIconPosition": {
            "options": (() => {
                const options = ["left", "right"] as const;

                assert<
                    Equals<
                        typeof options[number] | undefined,
                        ButtonsGroupProps["buttonsIconPosition"]
                    >
                >();

                return options;
            })(),
            "description": ` 
                Default: "left", WARNING: Do not set iconPosition on child buttons
            `,
            "control": { "type": "select" }
        },
        "buttons": {
            "description": `An array of ButtonProps (at least 2, RGAA)`,
            "control": { "type": null }
        }
    },
    "disabledProps": ["lang"],
    "defaultContainerWidth": 800
});

export default meta;

export const Default = getStory({
    "buttons": [
        {
            "linkProps": { "href": "#" },
            "iconId": "fr-icon-git-commit-fill",
            "children": "Button 1 label"
        },
        {
            "priority": "secondary",
            "linkProps": { "href": "#" },
            "iconId": "fr-icon-chat-check-fill",
            "children": "Button 2 label (longer)"
        },
        {
            "linkProps": { "href": "#" },
            "iconId": "fr-icon-bank-card-line",
            "children": "Button 3 label"
        }
    ]
});
