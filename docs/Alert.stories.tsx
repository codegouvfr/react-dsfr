import { Alert } from "../dist/Alert";
import type { AlertProps } from "../dist/Alert";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Alert },
    "argTypes": {
        "severity": {
            "options": (() => {
                const severities = ["success", "warning", "info", "error"] as const;

                assert<Equals<typeof severities[number], AlertProps["severity"]>>();

                return severities;
            })(),
            "control": { "type": "radio" }
        },
        "isClosable": {
            "description": "If the modal should have a close button"
        },
        "onClose": {
            "description": "Called when the user clicks the close button"
        },
        "isClosed": {
            "description": [
                "If specified the `<Alert />` is in [controlled mode](https://reactjs.org/docs/forms.html#controlled-components)",
                "this means that when the close button is clicked",
                "the `onClose()` callback will be called but you are responsible",
                "for setting `isClosed` to `false`, the `<Alert />` wont close itself."
            ].join(" "),
            "control": { "type": null }
        }
    }
});

export default meta;

export const Default = getStory({
    "severity": "success",
    "title": "Message successfully sent",
    "description": "Everything went well",
    "isClosable": true,
    "isClosed": undefined,
    ...logCallbacks(["onClose"])
});

export const Small = getStory({
    "severity": "info",
    "isSmall": true,
    "title": "Info: this is a small alert",
    "description": "This is the description"
});
