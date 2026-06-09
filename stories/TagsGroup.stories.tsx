import { TagsGroup, TagsGroupProps } from "../dist/TagsGroup";

import { getStoryFactory } from "./getStory";
import { TagProps } from "../dist/Tag";

const { meta, getStory } = getStoryFactory({
    "wrappedComponent": { TagsGroup },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/tag)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/TagsGroup.tsx)`,
    "argTypes": {
        "smallTags": {
            "description": ` 
                Default: false, if true, the tags will be smaller.
            `,
            "control": { "type": "boolean" }
        },
        "tags": {
            "description": `An array of TagProps (at least 1, max recommended: 6).`,
            "control": false
        }
    },
    "disabledProps": ["lang"],
    "defaultContainerWidth": 800
});

export default { ...meta, title: "components/TagsGroup" };

const tagsWithProps = (props?: Omit<TagProps, "children">) =>
    Array.from(
        { "length": 6 },
        (_, i) =>
            ({
                ...props,
                "children": `Libellé tag ${i + 1}`
            } as TagProps)
    ) as TagsGroupProps["tags"];

export const Default = getStory({
    "tags": tagsWithProps()
});

export const SmallTags = getStory({
    "tags": tagsWithProps(),
    "smallTags": true
});

export const TagsAsAnchor = getStory({
    "tags": tagsWithProps({ "linkProps": { "href": "#" } })
});

export const SmallTagsAsAnchor = getStory({
    "tags": tagsWithProps({ "linkProps": { "href": "#" } }),
    "smallTags": true
});

export const TagsPressed = getStory({
    "tags": tagsWithProps({ "pressed": true })
});

export const SmallTagsPressed = getStory({
    "tags": tagsWithProps({ "pressed": true }),
    "smallTags": true
});

export const TagsDismissable = getStory({
    "tags": tagsWithProps({ "dismissible": true })
});

export const SmallTagsDismissable = getStory({
    "tags": tagsWithProps({ "dismissible": true }),
    "smallTags": true
});
