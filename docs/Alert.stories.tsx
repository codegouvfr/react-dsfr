import { Alert } from "../dist/Alert";
import type { AlertProps } from "../dist/Alert";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const severities = ["success", "warning", "info", "error"] as const;

assert<Equals<typeof severities[number], AlertProps["severity"]>>();

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Alert },
    "argTypes": {
        "severity": {
            "options": severities,
            "control": { "type": "radio" }
        }
    }
});

export default meta;

export const Success = getStory({
    "severity": "success",
    "title": "Message successfully sent",
    "description": "Everything went well"
});
