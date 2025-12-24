import React from "react";
import { Stories as BaseStories } from "@storybook/addon-docs/blocks";
import { type PropsOf } from "@emotion/react";

export const Stories = (props: PropsOf<typeof BaseStories>) => {
    return <BaseStories {...props} />;
};
