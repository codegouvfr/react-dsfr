import React from "react";
import { AccordionGroup } from "../dist/AccordionGroup";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";

//TODO -> Do only one story for Accordion and AccordionGroup ?

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { AccordionGroup },
    "description": `- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/accordeon)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Accordion.tsx)  

## Controlled 

In this mode you are in charge of the behavior of the Accordion.  
_NOTE: In controlled mode there is no animation transition when expanding or colapsing the accordion._

\`\`\`tsx
function ControlledAccordionGroup() {

    return (
        <AccordionGroup  accordions={[
            {
                label: "Name of the Accordion 1",
                content: "Content of the Accordion 1"
            },
            {
                label: "Name of the Accordion 2",
                content: "Content of the Accordion 2"
            }
        ]}
        />
    );

}
\`\`\``,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    accordions: [
        {
            label: "Name of the Accordion 1",
            content: "Content of the Accordion 1"
        },
        {
            label: "Name of the Accordion 2",
            content: "Content of the Accordion 2"
        }
    ]
});
