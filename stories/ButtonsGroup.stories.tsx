import React from "react";
import { ButtonsGroup } from "../dist/ButtonsGroup";
import { Button } from "../dist/Button";
import type { ButtonsGroupProps, ButtonsGroupCommonProps } from "../dist/ButtonsGroup";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory<ButtonsGroupProps>({
    sectionName,
    wrappedComponent: { ButtonsGroup },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/badge)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Badge.tsx)`,
    argTypes: {
        size: {
            options: (() => {
                const sizes = ["sm", "lg"] as const;

                assert<Equals<typeof sizes[number], ButtonsGroupCommonProps.Size>>();

                return [null, ...sizes];
            })(),
            control: { type: "select", labels: { null: "no size (md)" } }
        },
        mode: {
            options: (() => {
                const modes = ["inline", "inline-sm", "inline-md", "inline-lg"] as const;

                assert<Equals<typeof modes[number], ButtonsGroupCommonProps.Mode>>();

                return [null, ...modes];
            })(),
            control: { type: "select", labels: { null: "no mode (vertical)" } }
        },
        align: {
            options: (() => {
                const aligns = ["center", "right", "inline-reverse", "equisized"] as const;

                assert<Equals<typeof aligns[number], ButtonsGroupCommonProps.Align>>();

                return [null, ...aligns];
            })(),
            control: { type: "select", labels: { null: "no align (default to left)" } }
        }
    },
    disabledProps: ["lang"]
});

export default meta;

export const Default = getStory({
    children: [
        <Button label="Button 1 label" linkProps={{ href: "#" }} />,
        <Button label="Button 2 label" priority="secondary" linkProps={{ href: "#" }} />
    ]
});

export const ModeHorizontal = getStory({
    children: [
        <Button label="Button 1 label" linkProps={{ href: "#" }} />,
        <Button label="Button 2 label" priority="secondary" linkProps={{ href: "#" }} />
    ],
    mode: "inline"
});

export const DefaultSmall = getStory({
    children: [
        <Button label="Button 1 label" linkProps={{ href: "#" }} />,
        <Button label="Button 2 label" priority="secondary" linkProps={{ href: "#" }} />
    ],
    size: "sm"
});

export const HorizontalOnLargerBreakpoints = getStory({
    children: [
        <Button label="Button 1 label" linkProps={{ href: "#" }} />,
        <Button label="Button 2 label" priority="secondary" linkProps={{ href: "#" }} />
    ],
    mode: "inline-sm"
});

export const HorizontalCentered = getStory({
    children: [
        <Button label="Button 1 label" linkProps={{ href: "#" }} />,
        <Button label="Button 2 label" priority="secondary" linkProps={{ href: "#" }} />
    ],
    align: "center",
    mode: "inline"
});
