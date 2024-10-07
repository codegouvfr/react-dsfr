import React from "react";
import { Tooltip, type TooltipProps } from "../dist/Tooltip";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert, Equals } from "tsafe/assert";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Tooltip },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/infobulle)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Tooltip.tsx)`,
    "argTypes": {
        "id": {
            "control": { "type": "text" },
            "description":
                "Optional: tootlip Id, which is also use as aria-describedby for hovered/clicked element"
        },
        "className": {
            "control": { "type": "text" },
            "description": "Optional"
        },
        "kind": {
            "control": { "type": "select" },
            "options": (() => {
                const options = ["hover", "click"] as const;

                assert<Equals<typeof options[number] | undefined, TooltipProps["kind"]>>();

                return options;
            })(),
            "description": "Optional."
        },
        "title": {
            "control": { "type": "text" }
        },
        "children": {
            "control": { "type": "text" }
        }
    }
});

export default meta;

const defaultOnHoverProps: TooltipProps.WithHoverAction = {
    "title": "lorem ipsum",
    "children": "Hover example"
};

export const Default = getStory(defaultOnHoverProps);

export const TooltipOnHover = getStory(defaultOnHoverProps);

export const TooltipOnHoverLink = getStory({
    ...defaultOnHoverProps,
    children: <a href="#">Some link</a>
});

export const TooltipOnClick = getStory({
    "kind": "click",
    "title": "lorem ipsum"
});
