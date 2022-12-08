import React from "react";
import { Tabs } from "../dist/Tabs";
import { sectionName } from "./sectionName";
import { getStoryFactory, logCallbacks } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Tabs },
    "description": `- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/onglets)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Tabs.tsx)  

## Uncontrolled

In this mode the \`Tab\` component is in charge for swapping the panel content.  

\`\`\`tsx
<Tabs
    tabs={[
        { "label": "Tab 1", "iconId": "fr-icon-add-line", "content": <p>Content of tab1</p> },
        { "label": "Tab 2", "iconId": "fr-icon-ball-pen-fill", "content": <p>Content of tab2</p> },
        { "label": "Tab 3", "content": <p>Content of tab3</p> }
    ]}
/>
\`\`\`

## Controlled 

In this mode you are in charge of the behavior of the tabs.  
_NOTE: In controlled mode there is no animation transition when switching between tabs._

\`\`\`tsx
function ControlledTabs() {

    const [selectedTabId, setSelectedTabId] = useState("tab1");

    return (
        <Tabs
            selectedTabId={selectedTabId}
            tabs={[
                { "tabId": "tab1", "label": "Tab 1", "iconId": "fr-icon-add-line" },
                { "tabId": "tab2", "label": "Tab 2", "iconId": "fr-icon-ball-pen-fill" },
                { "tabId": "tab3", "label": "Tab 3" },
            ]}
            onTabChange={setSelectedTabId}
        >
            <p>Content of {selectedTabId}</p>
        </Tabs>
    );

}
\`\`\``,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "tabs": [
        { "label": "Tab 1", "iconId": "fr-icon-add-line", "content": <p>Content of tab1</p> },
        { "label": "Tab 2", "iconId": "fr-icon-ball-pen-fill", "content": <p>Content of tab2</p> },
        { "label": "Tab 3", "content": <p>Content of tab3</p> }
    ],
    "label": "Name of the tabs system",
    ...logCallbacks(["onTabChange"])
});
