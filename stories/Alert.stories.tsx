import { Alert, type AlertProps } from "../dist/Alert";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Alert },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/alerte)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Alert.tsx)

## Uncontrolled mode  

\`\`\`tsx
import { Alert } from "@codegouvfr/react-dsfr/Alert";

<Alert
    severity="success"
    title="Message successfully sent"
    description="Everything went well"
    closable
    onClose={()=> alert("The user clicked the close button on the modal")}
/>
\`\`\`

## Controlled mode

\`\`\`tsx
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { useState } from "react";

const [ isClosed, setIsClosed ] = useState(false);

<Alert
    severity="success"
    title="Message successfully sent"
    description="Everything went well"
    isClosed={isClosed}
    // If the use should be able to close the modal manually
    closable
    // This is called only when the user clicks the close button
    onClose={()=> setIsClosed(true)}
/>
<button onClick={()=> setIsClosed(false)}>Open alert</button>
<button onClick={()=> setIsClosed(true)}>Close alert</button>
\`\`\`

`,
    "argTypes": {
        "severity": {
            "options": (() => {
                const severities = ["success", "warning", "info", "error"] as const;

                assert<Equals<typeof severities[number], AlertProps["severity"]>>();

                return severities;
            })(),
            "control": { "type": "radio" }
        },
        "title": {
            "description": `Required when the \`<Alert isSmall={false} />\` 
            (which is the default if \`isSmall\` isn't specified).`
        },
        "description": {
            "description": "Required when the `<Alert isSmall />`"
        },
        "closable": {
            "description": "If the modal should have a close button"
        },
        "onClose": {
            "description": "Called when the user clicks the close button"
        },
        "isClosed": {
            "description": `If specified the \`<Alert />\` is in 
                [controlled mode](https://reactjs.org/docs/forms.html#controlled-components)
                this means that when the close button is clicked
                the \`onClose()\` callback will be called but you are responsible
                for setting \`isClosed\` to \`false\`, the \`<Alert />\` wont close itself.`,
            "control": { "type": null }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "severity": "success",
    "small": false,
    "title": "Message successfully sent",
    "description": "Everything went well",
    "closable": true,
    "isClosed": undefined,
    ...logCallbacks(["onClose"])
});

export const SmallDescriptionOnlyInfo = getStory(
    {
        "severity": "info",
        "small": true,
        "description": "This is the description"
    },
    {
        "description": "Small info `Alert` with only a description"
    }
);

export const TitleOnlyWarning = getStory(
    {
        "severity": "warning",
        "title": "This is the title"
    },
    {
        "description": "Warning `Alert` with only a title"
    }
);

export const ClosableError = getStory({
    "severity": "error",
    "title": "This is the title",
    "description": "This is the description",
    "closable": true
});
