import React from "react";
import { Checkbox } from "../../src/Checkbox";

{
    <Checkbox
        legend="Label"
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
    <Checkbox
        orientation="horizontal"
        className={"fr-mt-1w"}
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
                },
                // @ts-expect-error
                "illustration": <img src="https://placehold.it/100x100" alt="illustration" />
            }
        ]}
    />;
}
