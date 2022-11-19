import { Alert } from "../../dist/Alert";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Alert },
    "defaultWidth": 500
});

export default meta;

export const Success = getStory({
    "severity": "success",
    "title": "Message sucessfuly sent",
    "description": "Everything went well"
});
