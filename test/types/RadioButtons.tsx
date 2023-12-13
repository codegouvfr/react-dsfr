import React from "react";
import { RadioButtons } from "../../src/RadioButtons";
import { RadioRichButtons } from "../../src/RadioRichButtons";

{
    <RadioButtons
        legend="Label"
        name="name"
        options={[
            {
                "label": "Label 1",
                "hintText": "Hint text",
                "nativeInputProps": {
                    "value": 1
                }
            },
            {
                "label": "Label 2",
                "hintText": "Hint text",
                "nativeInputProps": {
                    "value": 2
                }
            }
        ]}
    />;
}

{
    <RadioRichButtons
        legend="Label"
        name="name"
        options={[
            {
                "label": "Label 1",
                "hintText": "Hint text",
                "nativeInputProps": {
                    "value": 1
                },
                "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
            },
            {
                "label": "Label 2",
                "hintText": "Hint text",
                "nativeInputProps": {
                    "value": 2
                },
                "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
            }
        ]}
    />;
}

{
    <RadioButtons
        legend="Label"
        name="name"
        options={[
            {
                "label": "Label 1",
                "hintText": "Hint text",
                "nativeInputProps": {
                    "value": 1
                },
                // @ts-expect-error
                "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
            },
            {
                "label": "Label 2",
                "hintText": "Hint text",
                "nativeInputProps": {
                    "value": 2
                }
            }
        ]}
    />;
}

{
    <RadioRichButtons
        legend="Label"
        name="name"
        options={[
            {
                "label": "Label 1",
                "hintText": "Hint text",
                "nativeInputProps": {
                    "value": 1
                },
                "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
            },
            // @ts-expect-error
            {
                "label": "Label 2",
                "hintText": "Hint text",
                "nativeInputProps": {
                    "value": 2
                }
            }
        ]}
    />;
}
