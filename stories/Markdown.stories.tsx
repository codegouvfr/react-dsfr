import { Markdown } from "../docs/Markdown";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Markdown }
});

export default meta;

export const Default = getStory({
    "children": `
\`\`\`diff
+ A line added
- A line removed
A line that hasn't moved
\`\`\`
`
});
